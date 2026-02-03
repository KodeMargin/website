"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { contactInfo, socialLinks } from "@/data/contact"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

type FormStatus = "idle" | "loading" | "success" | "error"

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [status, setStatus] = useState<FormStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setErrorMessage("")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", subject: "", message: "" })
                // Reset success message after 5 seconds
                setTimeout(() => setStatus("idle"), 5000)
            } else {
                setStatus("error")
                setErrorMessage(data.error || "Something went wrong. Please try again.")
            }
        } catch {
            setStatus("error")
            setErrorMessage("Failed to send message. Please try again later.")
        }
    }

    return (
        <div className="flex flex-col gap-24 pb-20 pt-8 md:pt-12 lg:pt-16">
            {/* Hero Section */}
            <section className="container-padding flex flex-col items-start gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">
                        Contact Us
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display">
                        Let's build something <br />
                        <span className="text-transparent bg-clip-text bg-red-500">
                            amazing.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        Have a project in mind or just want to say hi? We'd love to hear from you.
                    </p>
                </motion.div>
            </section>

            {/* Contact Content */}
            <section className="container-padding">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">

                    {/* Contact Form */}
                    <Card className="border-none shadow-xl bg-white p-2">
                        <CardContent className="p-6 md:p-8 space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                                        <input
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
                                    <input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Project Inquiry"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                {/* Status Messages */}
                                {status === "success" && (
                                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>Message sent successfully! We'll get back to you soon.</span>
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                                        <AlertCircle className="h-5 w-5" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-primary hover:bg-primary/90 text-white"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-10">
                        <div>
                            <h3 className="text-2xl font-bold font-display text-primary mb-6">Contact Details</h3>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <a key={index} href={item.href} className="flex items-start gap-4 group">
                                        <div className="h-12 w-12 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-red-500 group-hover:text-white transition-colors">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-text-muted text-sm">{item.label}</p>
                                            <p className="text-lg font-semibold text-primary">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold font-display text-primary mb-6">Connect with Us</h3>
                            <div className="flex gap-4">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all"
                                        aria-label={link.name}
                                    >
                                        <link.icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
