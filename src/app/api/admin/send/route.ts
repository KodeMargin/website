import { NextRequest, NextResponse } from "next/server"
import {
    MAX_ATTACHMENT_BYTES,
    emailShell,
    fileToAttachment,
    sendEmail,
} from "@/lib/brevo"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
    try {
        const form = await request.formData()
        const recipientsRaw = form.get("recipients") as string | null
        const subject = form.get("subject") as string | null
        const message = form.get("message") as string | null
        const attachment = form.get("attachment") as File | null

        if (!recipientsRaw || !subject || !message) {
            return NextResponse.json(
                { error: "Recipients, subject and message are required" },
                { status: 400 }
            )
        }

        const recipients = [...new Set(
            recipientsRaw.split(/[,;\n]/).map((r) => r.trim()).filter(Boolean)
        )]

        const invalid = recipients.filter((r) => !EMAIL_RE.test(r))
        if (invalid.length) {
            return NextResponse.json(
                { error: `Invalid email address: ${invalid.join(", ")}` },
                { status: 400 }
            )
        }

        if (attachment && attachment.size > MAX_ATTACHMENT_BYTES) {
            return NextResponse.json(
                { error: "Attachment must be under 10MB" },
                { status: 400 }
            )
        }

        const attachments = attachment ? [await fileToAttachment(attachment)] : undefined
        const htmlContent = emailShell(message)

        // One send per recipient so clients never see each other's addresses.
        // ponytail: sequential; batch or queue if lists ever get long enough
        // to outrun the request timeout.
        const failed: string[] = []
        for (const email of recipients) {
            try {
                await sendEmail({
                    to: [{ email }],
                    subject,
                    htmlContent,
                    attachment: attachments,
                })
            } catch (err) {
                console.error(`Send failed for ${email}:`, err)
                failed.push(email)
            }
        }

        return NextResponse.json({
            sent: recipients.length - failed.length,
            total: recipients.length,
            failed,
        })
    } catch (error) {
        console.error("Admin send error:", error)
        return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
    }
}
