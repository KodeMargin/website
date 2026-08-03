"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { EmailDetail, SentEmail } from "@/lib/brevo"
import { AlertCircle, Loader2, Mail, Paperclip } from "lucide-react"

const STATUS_LABEL: Record<string, string> = {
    requests: "Sent",
    deferred: "Deferred",
    delivered: "Delivered",
    opened: "Opened",
    clicks: "Clicked",
    hardBounces: "Hard bounce",
    softBounces: "Soft bounce",
    blocked: "Blocked",
    spam: "Marked spam",
    invalid: "Invalid address",
    error: "Error",
    unsubscribed: "Unsubscribed",
}

// The detail endpoint names its events differently from the statistics one.
const EVENT_LABEL: Record<string, string> = {
    sent: "Sent",
    delivered: "Delivered",
    open: "Opened",
    click: "Clicked",
    softBounce: "Soft bounce",
    hardBounce: "Hard bounce",
    blocked: "Blocked",
    spam: "Marked spam",
    deferred: "Deferred",
}

function statusClass(mail: SentEmail) {
    if (mail.failed) return "bg-red-500/10 text-red-600"
    if (mail.status === "opened" || mail.status === "clicks")
        return "bg-green-500/10 text-green-600"
    if (mail.status === "delivered") return "bg-blue-500/10 text-blue-600"
    return "bg-amber-500/10 text-amber-600"
}

const fmt = (d: string) =>
    new Date(d).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    })

export default function SentList({ emails }: { emails: SentEmail[] }) {
    const [selected, setSelected] = useState<string | null>(null)
    const [detail, setDetail] = useState<EmailDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const open = async (messageId: string) => {
        setSelected(messageId)
        setDetail(null)
        setError("")
        setLoading(true)

        try {
            const res = await fetch(
                `/api/admin/email?messageId=${encodeURIComponent(messageId)}`
            )
            const data = await res.json()
            if (!res.ok) setError(data.error || "Could not load this email.")
            else setDetail(data)
        } catch {
            setError("Could not load this email.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
            {/* ─── List ─────────────────────────────────────────────── */}
            <Card>
                <CardContent className="p-2">
                    {emails.map((mail) => (
                        <button
                            key={mail.messageId}
                            type="button"
                            onClick={() => open(mail.messageId)}
                            aria-current={selected === mail.messageId}
                            className={`w-full rounded-xl px-3 py-3 text-left transition-colors ${
                                selected === mail.messageId
                                    ? "bg-primary/10"
                                    : "hover:bg-primary/5"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <span className="text-sm font-semibold">{mail.subject}</span>
                                <span
                                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(mail)}`}
                                >
                                    {STATUS_LABEL[mail.status] ?? mail.status}
                                </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between gap-3 text-xs text-text-muted">
                                <span className="truncate">{mail.email}</span>
                                <span className="shrink-0">{fmt(mail.sentAt)}</span>
                            </div>
                        </button>
                    ))}
                </CardContent>
            </Card>

            {/* ─── Detail ───────────────────────────────────────────── */}
            <Card className="lg:sticky lg:top-24">
                <CardContent className="pt-6">
                    {!selected && (
                        <div className="py-16 text-center text-sm text-text-muted">
                            <Mail className="mx-auto mb-3 h-8 w-8 opacity-40" />
                            Select an email to read it.
                        </div>
                    )}

                    {loading && (
                        <div className="py-16 text-center text-sm text-text-muted">
                            <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin" />
                            Loading…
                        </div>
                    )}

                    {error && (
                        <div className="flex items-start gap-2 rounded-xl bg-red-500/10 p-4 text-sm text-red-600">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {detail && !loading && (
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-lg font-bold">{detail.subject}</h2>
                                <p className="mt-1 text-sm text-text-muted">
                                    To {detail.email} · {fmt(detail.date)}
                                </p>
                                {detail.attachmentCount > 0 && (
                                    <p className="mt-2 flex items-start gap-1.5 text-xs text-text-muted">
                                        <Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                        <span>
                                            {detail.attachmentCount} attachment
                                            {detail.attachmentCount === 1 ? "" : "s"} — Brevo
                                            does not keep the file, so open the email in{" "}
                                            {detail.email} to download it.
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {detail.events.map((e, i) => (
                                    <span
                                        key={`${e.name}-${i}`}
                                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                                    >
                                        {EVENT_LABEL[e.name] ?? e.name} · {fmt(e.time)}
                                    </span>
                                ))}
                            </div>

                            {/* Sandboxed: contact-form emails embed unescaped visitor
                                input, so this HTML is not trusted. No allow-* flags
                                means no scripts, no forms, no navigation. */}
                            <iframe
                                title="Email content"
                                sandbox=""
                                srcDoc={detail.body}
                                className="h-[420px] w-full rounded-xl border border-border/60 bg-white"
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
