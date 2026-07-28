"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { contactInfo, socialLinks } from "@/data/contact"
import { Loader2, CheckCircle, AlertCircle, ChevronDown, Send } from "lucide-react"
import { motionEase } from "@/lib/motion"

// ─── Package options shown in the dropdown ──────────────────────────────────
const PACKAGE_OPTIONS = [
    { value: "", label: "No specific package (general inquiry)" },
    { value: "🏆 Platinum Package", label: "🏆 Platinum Package" },
    { value: "🥇 Gold Package", label: "🥇 Gold Package" },
    { value: "🥈 Silver Package", label: "🥈 Silver Package" },
    { value: "🥉 Bronze Package", label: "🥉 Bronze Package" },
    { value: "📅 30-Day Social Media Plan", label: "📅 30-Day Social Media Plan" },
    { value: "📅 15-Day Social Media Plan", label: "📅 15-Day Social Media Plan" },
    { value: "📅 10-Day Social Media Plan", label: "📅 10-Day Social Media Plan" },
    { value: "📅 7-Day Social Media Plan", label: "📅 7-Day Social Media Plan" },
    { value: "💬 Custom / Other", label: "💬 Custom / Other (describe below)" },
]

// Map ?package=<value> query params → full option values
const PARAM_MAP: Record<string, string> = {
    platinum: "🏆 Platinum Package",
    gold: "🥇 Gold Package",
    silver: "🥈 Silver Package",
    bronze: "🥉 Bronze Package",
    "30-day": "📅 30-Day Social Media Plan",
    "15-day": "📅 15-Day Social Media Plan",
    "10-day": "📅 10-Day Social Media Plan",
    "7-day": "📅 7-Day Social Media Plan",
}

const INPUT_CLASS =
    "flex h-11 w-full rounded-xl border border-border/80 bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-xs"

interface FormData {
    name: string
    email: string
    phone: string
    packageInterest: string
    subject: string
    message: string
    attachment: File | null
}

type FormStatus = "idle" | "loading" | "success" | "error"

// ─── Inner form component (uses useSearchParams) ────────────────────────────
function ContactForm() {
    const searchParams = useSearchParams()

    const [formData, setFormData] = useState<FormData>(() => ({
        name: "",
        email: "",
        phone: "",
        packageInterest:
            PARAM_MAP[searchParams.get("package")?.toLowerCase() ?? ""] ?? "",
        subject: "",
        message: "",
        attachment: null,
    }))
    const [status, setStatus] = useState<FormStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }))
        } else {
            setFormData((prev) => ({ ...prev, attachment: null }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setErrorMessage("")

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("name", formData.name)
            formDataToSend.append("email", formData.email)
            formDataToSend.append("phone", formData.phone)
            formDataToSend.append("packageInterest", formData.packageInterest)
            formDataToSend.append("subject", formData.subject)
            formDataToSend.append("message", formData.message)
            if (formData.attachment) {
                formDataToSend.append("attachment", formData.attachment)
            }

            const response = await fetch("/api/contact", {
                method: "POST",
                body: formDataToSend,
            })

            const data = await response.json()

            if (response.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", phone: "", packageInterest: "", subject: "", message: "", attachment: null })
                setTimeout(() => window.location.reload(), 2000)
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
            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-primary">Name</label>
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
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-primary">Email</label>
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
                <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-primary">
                    Phone
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={INPUT_CLASS}
                    placeholder="+94 71 188 8358"
                />
            </div>

            {/* Package Interest */}
            <div className="space-y-2">
                <label htmlFor="packageInterest" className="text-xs font-bold uppercase tracking-wider text-primary flex items-center justify-between">
                    <span>Package Interest</span>
                    <span className="text-[10px] font-semibold text-text-muted lowercase rounded-full bg-surface border border-border/60 px-2 py-0.5">
                        optional
                    </span>
                </label>
                <div className="relative">
                    <select
                        id="packageInterest"
                        value={formData.packageInterest}
                        onChange={handleChange}
                        className={`${INPUT_CLASS} appearance-none pr-10 cursor-pointer ${formData.packageInterest
                            ? "border-primary bg-primary/5 text-primary font-semibold"
                            : ""
                            }`}
                    >
                        {PACKAGE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                </div>
                {formData.packageInterest && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: motionEase }}
                        className="text-xs text-accent font-semibold flex items-center gap-1 mt-1"
                    >
                        ✓ We&apos;ll prepare a tailored proposal for this package.
                    </motion.p>
                )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-primary">Subject</label>
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
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-primary">Message</label>
                <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`${INPUT_CLASS} min-h-[130px] resize-none h-auto`}
                    placeholder="Tell us about your business, goals, or any additional requirements..."
                />
            </div>

            {/* Attachment */}
            <div className="space-y-2">
                <label htmlFor="attachment" className="text-xs font-bold uppercase tracking-wider text-primary flex items-center justify-between">
                    <span>Attachment</span>
                    <span className="text-[10px] font-semibold text-text-muted lowercase rounded-full bg-surface border border-border/60 px-2 py-0.5">
                        optional
                    </span>
                </label>
                <input
                    id="attachment"
                    type="file"
                    onChange={handleFileChange}
                    className={`${INPUT_CLASS} file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer`}
                />
            </div>

            {/* Status */}
            {status === "success" && (
                <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>Message sent! We&apos;ll get back to you soon.</span>
                </div>
            )}
            {status === "error" && (
                <div className="flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl text-sm font-medium">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-13 font-bold text-base shadow-lg shadow-primary/20 transition-colors duration-200"
                disabled={status === "loading"}
            >
                {status === "loading" ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending Message...</>
                ) : (
                    <><Send className="mr-2 h-4 w-4" /> Send Message</>
                )}
            </Button>
        </form>
    )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function ContactPage() {
    return (
        <div className="flex flex-col gap-20 pb-20 pt-8 md:pt-12 lg:pt-16">

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto flex flex-col items-start gap-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: motionEase }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">Contact Us</Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.92]">
                        Let&apos;s build something <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-700">
                            amazing.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        Have a project in mind or just want to say hi? We&apos;d love to hear from you.
                    </p>
                </motion.div>
            </section>

            {/* ── Form + Info ───────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05, ease: motionEase }}
                    >
                        <Card className="border border-border/60 shadow-xl bg-white p-2 rounded-3xl">
                            <CardContent className="p-6 md:p-8">
                                <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface" />}>
                                    <ContactForm />
                                </Suspense>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-10 lg:pl-4">

                        {/* Contact Details */}
                        <div>
                            <motion.h3
                                className="text-2xl font-bold font-display text-primary mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.36, delay: 0.1, ease: motionEase }}
                            >
                                Contact Details
                            </motion.h3>
                            <div className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-surface/60 border border-border/50 hover:bg-white hover:border-red-500/20 hover:shadow-md transition-all duration-300 group"
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.36, delay: 0.12 + index * 0.05, ease: motionEase }}
                                    >
                                        <div className="h-12 w-12 rounded-xl bg-white border border-border/60 flex items-center justify-center text-primary group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all duration-300 shadow-xs">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-muted text-xs uppercase tracking-wider">{item.label}</p>
                                            <p className="text-base font-bold text-primary font-display">{item.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <motion.h3
                                className="text-2xl font-bold font-display text-primary mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.36, delay: 0.18, ease: motionEase }}
                            >
                                Connect with Us
                            </motion.h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-12 px-5 rounded-full border border-border/80 bg-white flex items-center gap-2 text-sm font-bold text-primary hover:bg-red-500 hover:text-white hover:border-red-50 transition-all duration-300 shadow-xs hover:shadow-md"
                                        aria-label={link.name}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.36, delay: 0.2 + index * 0.05, ease: motionEase }}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        <span>{link.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
