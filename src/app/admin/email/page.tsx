"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle, Send } from "lucide-react"

const INPUT_CLASS =
    "flex h-11 w-full rounded-xl border border-border/80 bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-xs"

const LABEL_CLASS = "text-xs font-bold uppercase tracking-wider text-primary"

type Status = "idle" | "loading" | "success" | "error"

export default function AdminEmailPage() {
    const [recipients, setRecipients] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [attachment, setAttachment] = useState<File | null>(null)
    const [status, setStatus] = useState<Status>("idle")
    const [result, setResult] = useState("")

    const recipientCount = [
        ...new Set(recipients.split(/[,;\n]/).map((r) => r.trim()).filter(Boolean)),
    ].length

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setResult("")

        try {
            const body = new FormData()
            body.append("recipients", recipients)
            body.append("subject", subject)
            body.append("message", message)
            if (attachment) body.append("attachment", attachment)

            const res = await fetch("/api/admin/send", { method: "POST", body })
            const data = await res.json()

            if (!res.ok) {
                setStatus("error")
                setResult(data.error || "Something went wrong.")
                return
            }

            if (data.failed?.length) {
                setStatus("error")
                setResult(
                    `Sent to ${data.sent} of ${data.total}. Failed: ${data.failed.join(", ")}`
                )
                return
            }

            setStatus("success")
            setResult(`Sent to ${data.sent} recipient${data.sent === 1 ? "" : "s"}.`)
            setRecipients("")
            setSubject("")
            setMessage("")
            setAttachment(null)
        } catch {
            setStatus("error")
            setResult("Failed to send. Please try again.")
        }
    }

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Send Client Email
                </h1>
                <p className="mt-2 text-sm text-text-muted">
                    Each recipient gets their own copy — addresses are never shared between them.
                </p>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="recipients" className={LABEL_CLASS}>
                                Recipients {recipientCount > 0 && `(${recipientCount})`}
                            </label>
                            <textarea
                                id="recipients"
                                required
                                value={recipients}
                                onChange={(e) => setRecipients(e.target.value)}
                                placeholder="client@example.com, another@example.com"
                                className={`${INPUT_CLASS} min-h-[90px] resize-none h-auto`}
                            />
                            <p className="text-xs text-text-muted">
                                Separate with commas, semicolons or new lines.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className={LABEL_CLASS}>Subject</label>
                            <input
                                id="subject"
                                type="text"
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className={INPUT_CLASS}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className={LABEL_CLASS}>Message</label>
                            <textarea
                                id="message"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your message — line breaks are preserved."
                                className={`${INPUT_CLASS} min-h-[200px] resize-none h-auto`}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="attachment" className={LABEL_CLASS}>
                                Attachment (optional, max 10MB)
                            </label>
                            <input
                                id="attachment"
                                type="file"
                                onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
                                className={`${INPUT_CLASS} py-2.5 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-primary`}
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={status === "loading"}
                            className="w-full"
                        >
                            {status === "loading" ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
                            ) : (
                                <><Send className="mr-2 h-4 w-4" /> Send Email</>
                            )}
                        </Button>

                        {result && (
                            <div
                                className={`flex items-start gap-2 rounded-xl p-4 text-sm ${
                                    status === "success"
                                        ? "bg-green-500/10 text-green-600"
                                        : "bg-red-500/10 text-red-600"
                                }`}
                            >
                                {status === "success" ? (
                                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                ) : (
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                )}
                                <span>{result}</span>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
