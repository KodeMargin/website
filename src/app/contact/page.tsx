"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { contactInfo, socialLinks } from "@/data/contact"
import { Loader2, CheckCircle, AlertCircle, ChevronDown } from "lucide-react"

// ─── Package options shown in the dropdown ──────────────────────────────────
const PACKAGE_OPTIONS = [
    { value: "", label: "No specific package (general inquiry)" },
    { value: "🏆 Platinum Package — $699", label: "🏆 Platinum Package — $699" },
    { value: "🥇 Gold Package — $599", label: "🥇 Gold Package — $599" },
    { value: "🥈 Silver Package — $499", label: "🥈 Silver Package — $499" },
    { value: "🥉 Bronze Package — $400", label: "🥉 Bronze Package — $400" },
    { value: "📅 30-Day Social Media Plan — $399", label: "📅 30-Day Social Media Plan — $399" },
    { value: "📅 15-Day Social Media Plan — $199", label: "📅 15-Day Social Media Plan — $199" },
    { value: "📅 10-Day Social Media Plan — $159", label: "📅 10-Day Social Media Plan — $159" },
    { value: "📅 7-Day Social Media Plan — $99", label: "📅 7-Day Social Media Plan — $99" },
    { value: "💬 Custom / Other", label: "💬 Custom / Other (describe below)" },
]

// Map ?package=<value> query params → full option values
const PARAM_MAP: Record<string, string> = {
    platinum: "🏆 Platinum Package — $699",
    gold: "🥇 Gold Package — $599",
    silver: "🥈 Silver Package — $499",
    bronze: "🥉 Bronze Package — $400",
    "30-day": "📅 30-Day Social Media Plan — $399",
    "15-day": "📅 15-Day Social Media Plan — $199",
    "10-day": "📅 10-Day Social Media Plan — $159",
    "7-day": "📅 7-Day Social Media Plan — $99",
}

const INPUT_CLASS =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"

interface FormData {
    name: string
    email: string
    phone: string
    packageInterest: string
    subject: string
    message: string
}

type FormStatus = "idle" | "loading" | "success" | "error"

// ─── Inner form component (uses useSearchParams) ────────────────────────────
function ContactForm() {
    const searchParams = useSearchParams()

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        packageInterest: "",
        subject: "",
        message: "",
    })
    const [status, setStatus] = useState<FormStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")

    // Pre-fill packageInterest from ?package= query param
    useEffect(() => {
        const param = searchParams.get("package")?.toLowerCase() ?? ""
        if (!param) return
        const matched = PARAM_MAP[param] ?? ""
        if (matched) setFormData((prev) => ({ ...prev, packageInterest: matched }))
    }, [searchParams])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", phone: "", packageInterest: "", subject: "", message: "" })
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
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name + Email */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">Name</label>
                    <input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={INPUT_CLASS}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={INPUT_CLASS}
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium leading-none flex items-center gap-2">
                    Phone
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={INPUT_CLASS}
                    placeholder="+1 (555) 000-0000"
                />
            </div>

            {/* Package Interest */}
            <div className="space-y-2">
                <label htmlFor="packageInterest" className="text-sm font-medium leading-none flex items-center gap-2">
                    Package Interest
                    <span className="text-xs font-normal text-text-muted rounded-full border border-border px-2 py-0.5">
                        optional
                    </span>
                </label>
                <div className="relative">
                    <select
                        id="packageInterest"
                        value={formData.packageInterest}
                        onChange={handleChange}
                        className={`${INPUT_CLASS} appearance-none pr-9 cursor-pointer ${formData.packageInterest
                            ? "border-primary/40 bg-primary/5 text-primary font-medium"
                            : ""
                            }`}
                    >
                        {PACKAGE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                </div>
                {formData.packageInterest && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-primary/70 font-medium"
                    >
                        ✓ We'll prepare a tailored proposal for this package.
                    </motion.p>
                )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium leading-none">Subject</label>
                <input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={INPUT_CLASS}
                    placeholder="Project Inquiry"
                />
            </div>

            {/* Message */}
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none">Message</label>
                <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${INPUT_CLASS} min-h-[120px] resize-none h-auto`}
                    placeholder="Tell us about your business, goals, or any additional requirements..."
                />
            </div>

            {/* Status */}
            {status === "success" && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span>Message sent! We'll get back to you soon.</span>
                </div>
            )}
            {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full"
                disabled={status === "loading"}
            >
                {status === "loading" ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                    "Send Message"
                )}
            </Button>
        </form>
    )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function ContactPage() {
    return (
        <div className="flex flex-col gap-24 pb-20 pt-8 md:pt-12 lg:pt-16">
            {/* Hero */}
            <section className="container-padding flex flex-col items-start gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">Contact Us</Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display">
                        Let's build something <br />
                        <span className="text-transparent bg-clip-text bg-red-500">amazing.</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        Have a project in mind or just want to say hi? We'd love to hear from you.
                    </p>
                </motion.div>
            </section>

            {/* Form + Info */}
            <section className="container-padding">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
                    <Card className="border-none shadow-xl bg-white p-2">
                        <CardContent className="p-6 md:p-8">
                            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-surface" />}>
                                <ContactForm />
                            </Suspense>
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
