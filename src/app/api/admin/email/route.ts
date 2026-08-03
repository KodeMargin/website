import { NextRequest, NextResponse } from "next/server"
import { fetchEmailDetail } from "@/lib/brevo"

export async function GET(request: NextRequest) {
    const messageId = request.nextUrl.searchParams.get("messageId")

    if (!messageId) {
        return NextResponse.json({ error: "messageId is required" }, { status: 400 })
    }

    try {
        const detail = await fetchEmailDetail(messageId)

        if (!detail) {
            return NextResponse.json(
                { error: "Brevo no longer has the content for this email." },
                { status: 404 }
            )
        }

        return NextResponse.json(detail)
    } catch (err) {
        console.error("Failed to load email detail:", err)
        return NextResponse.json({ error: "Failed to load email" }, { status: 500 })
    }
}
