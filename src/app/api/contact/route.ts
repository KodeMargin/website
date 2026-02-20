import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
    try {
        const { name, email, packageInterest, subject, message } = await request.json()

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        // Create transporter - Configure with your email provider
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Email to you (site owner)
        const mailOptions = {
            from: `"${name} via KodeMargin" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: "kodemargin@gmail.com",
            subject: `New Project Requirement: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #e53935; padding-bottom: 10px;">
                        You have a new project requirement from ${name} 
                    </h2>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${packageInterest ? `<p><strong>Package Interest:</strong> <span style="color:#e53935; font-weight:bold;">${packageInterest}</span></p>` : ""}
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="background: white; padding: 15px; border-radius: 4px; border-left: 3px solid #e53935;">
                            ${message.replace(/\n/g, "<br>")}
                        </p>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        This email was sent from the KodeMargin website contact form.
                    </p>
                </div>
            `,
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        )
    }
}
