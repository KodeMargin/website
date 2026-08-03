import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { fetchSentEmails, type SentEmail } from "@/lib/brevo"
import { AlertCircle, Send } from "lucide-react"
import SentList from "./SentList"

export const dynamic = "force-dynamic"

export default async function SentEmailsPage() {
    let emails: SentEmail[] = []
    let error = ""

    try {
        emails = await fetchSentEmails()
    } catch (err) {
        console.error("Failed to load sent emails:", err)
        error = "Could not load the email log from Brevo."
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Sent Emails</h1>
                <p className="mt-2 text-sm text-text-muted">
                    Live from Brevo — includes contact form enquiries and emails sent from this panel.
                </p>
            </div>

            {error && (
                <div className="mb-6 flex items-start gap-2 rounded-xl bg-red-500/10 p-4 text-sm text-red-600">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {emails.length === 0 && !error ? (
                <Card>
                    <CardContent className="py-12 text-center text-sm text-text-muted">
                        <Send className="mx-auto mb-3 h-8 w-8 opacity-40" />
                        No emails sent yet.
                    </CardContent>
                </Card>
            ) : (
                <SentList emails={emails} />
            )}

            <p className="mt-6 text-center text-xs text-text-muted">
                Showing the most recent activity.{" "}
                <Link href="/admin/sent" className="text-primary hover:underline">
                    Refresh
                </Link>
            </p>
        </>
    )
}
