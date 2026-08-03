// Brevo transactional email — https://developers.brevo.com/reference/sendtransacemail
// Server-side only: BREVO_API_KEY must never reach the browser.

// Brevo rejects attachments over 10MB.
export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024

// User input lands in HTML that goes out to real inboxes — escape it.
export const esc = (s: string) =>
    s.replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
    )

export type BrevoAttachment = { name: string; content: string }

export async function fileToAttachment(file: File): Promise<BrevoAttachment> {
    const bytes = await file.arrayBuffer()
    return { name: file.name, content: Buffer.from(bytes).toString("base64") }
}

export async function sendEmail(payload: {
    to: { email: string; name?: string }[]
    replyTo?: { email: string }
    subject: string
    htmlContent: string
    attachment?: BrevoAttachment[]
}) {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "api-key": process.env.BREVO_API_KEY!,
            "content-type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
            sender: {
                email: process.env.EMAIL_FROM,
                name: process.env.EMAIL_FROM_NAME || "KodeMargin",
            },
            ...payload,
        }),
    })

    if (!res.ok) {
        throw new Error(`Brevo ${res.status}: ${await res.text()}`)
    }
}

// ─── Sent-email log ─────────────────────────────────────────────────────────
// Brevo keeps the full event history, so there is nothing to store our side.

export type BrevoEvent = {
    email: string
    date: string
    messageId: string
    event: string
    subject: string
    from?: string
}

export type SentEmail = {
    messageId: string
    email: string
    subject: string
    sentAt: string
    status: string
    failed: boolean
}

// Ordered worst → best; a later event supersedes an earlier one.
const PROGRESS = ["requests", "deferred", "delivered", "opened", "clicks"]
const FAILURES = new Set([
    "hardBounces", "softBounces", "blocked", "spam", "invalid", "error", "unsubscribed",
])

/**
 * Collapses Brevo's per-event stream into one row per email, keeping the
 * furthest-along status. A failure always wins over progress — a bounce is the
 * outcome that matters even if the message was accepted first.
 */
export function groupEvents(events: BrevoEvent[]): SentEmail[] {
    const byId = new Map<string, SentEmail & { rank: number }>()

    for (const e of events) {
        const existing = byId.get(e.messageId)
        const failed = FAILURES.has(e.event)
        const rank = PROGRESS.indexOf(e.event)

        if (!existing) {
            byId.set(e.messageId, {
                messageId: e.messageId,
                email: e.email,
                subject: e.subject,
                sentAt: e.date,
                status: e.event,
                failed,
                rank,
            })
            continue
        }

        // Earliest event is when it actually went out.
        if (Date.parse(e.date) < Date.parse(existing.sentAt)) existing.sentAt = e.date

        if (failed && !existing.failed) {
            existing.failed = true
            existing.status = e.event
        } else if (!existing.failed && rank > existing.rank) {
            existing.rank = rank
            existing.status = e.event
        }
    }

    return [...byId.values()].sort(
        (a, b) => Date.parse(b.sentAt) - Date.parse(a.sentAt)
    )
}

async function brevoGet(path: string) {
    const res = await fetch(`https://api.brevo.com/v3${path}`, {
        headers: {
            "api-key": process.env.BREVO_API_KEY!,
            accept: "application/json",
        },
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error(`Brevo ${res.status}: ${await res.text()}`)
    }

    return res.json()
}

/**
 * Latest sent emails. Reads the last `limit` *events*, so a message whose
 * events straddle that boundary can show a slightly stale status.
 * ponytail: raise the limit or page through if the log gets busy.
 */
export async function fetchSentEmails(limit = 100): Promise<SentEmail[]> {
    const data = await brevoGet(`/smtp/statistics/events?limit=${limit}&sort=desc`)
    return groupEvents(data.events ?? [])
}

export type EmailDetail = {
    email: string
    subject: string
    date: string
    body: string
    attachmentCount: number
    events: { name: string; time: string }[]
}

/**
 * Full detail for one message, including the HTML body Brevo retained.
 * Two hops: the event log only gives us a messageId, and the content endpoint
 * is keyed by uuid. Returns null once Brevo has aged the content out.
 */
export async function fetchEmailDetail(messageId: string): Promise<EmailDetail | null> {
    const list = await brevoGet(`/smtp/emails?messageId=${encodeURIComponent(messageId)}`)
    const uuid = list.transactionalEmails?.[0]?.uuid
    if (!uuid) return null

    return brevoGet(`/smtp/emails/${uuid}`)
}

/** Wraps a plain-text body in the KodeMargin email shell. */
export function emailShell(bodyText: string) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="border-bottom: 2px solid #e53935; padding-bottom: 10px; margin-bottom: 20px;">
                <h2 style="color: #333; margin: 0;">KodeMargin</h2>
            </div>
            <div style="color: #444; line-height: 1.6;">
                ${esc(bodyText).replace(/\n/g, "<br>")}
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 28px; border-top: 1px solid #eee; padding-top: 12px;">
                KodeMargin — reply to this email to reach us directly.
            </p>
        </div>
    `
}
