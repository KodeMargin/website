"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, X, ArrowRight, Zap, Star, MessageSquare, Globe, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { mainPackages, socialPlans, compareRows, DISCOUNT_ACTIVE, DISCOUNT_SPOTS_LEFT } from "@/data/packages"

// ─── Tier accent colours ────────────────────────────────────────────────────
const tierStyles: Record<string, { badge: string; ring: string; glow: string; bg: string }> = {
    platinum: {
        badge: "bg-indigo-600 text-white",
        ring: "ring-indigo-400",
        glow: "shadow-indigo-200",
        bg: "from-indigo-50 to-white",
    },
    gold: {
        badge: "bg-amber-500 text-white",
        ring: "ring-amber-400",
        glow: "shadow-amber-200",
        bg: "from-amber-50 to-white",
    },
    silver: {
        badge: "bg-slate-500 text-white",
        ring: "ring-slate-400",
        glow: "shadow-slate-200",
        bg: "from-slate-50 to-white",
    },
    bronze: {
        badge: "bg-orange-500 text-white",
        ring: "ring-orange-400",
        glow: "shadow-orange-200",
        bg: "from-orange-50 to-white",
    },
}

// ─── Shared animation config (mirrors contact/page.tsx) ─────────────────────
const viewportConfig = { once: true, margin: "-80px" }
const staggerTransition = (idx: number) => ({
    duration: 0.5,
    delay: idx * 0.08,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
})

// ─── Comparison table helpers ────────────────────────────────────────────────
function CellContent({ value }: { value: string | boolean }) {
    if (value === true) return <CheckCircle2 className="mx-auto h-5 w-5 text-accent" />
    if (value === false) return <X className="mx-auto h-5 w-5 text-border" />
    return <span className="text-sm font-semibold text-primary">{value}</span>
}

export default function PackagesPage() {
    const [activeTab, setActiveTab] = useState<"main" | "social">("main")

    return (
        <div className="flex flex-col gap-16 pb-24 pt-8 md:pt-12">

            {/* ── Hero ─────────────────────────────────────────────── */}
            {/* Hero fires on mount (animate), same as contact/page.tsx hero */}
            <section className="container-padding">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <div className="flex flex-col items-start gap-4 mb-6">
                        <Badge variant="surface" className="px-4 py-1.5 text-sm">
                            Our Packages
                        </Badge>
                        {DISCOUNT_ACTIVE && (
                            <div className="inline-flex items-start sm:items-center gap-2 rounded-2xl md:rounded-full bg-accent/10 px-4 py-2 sm:py-1.5 text-sm font-semibold text-accent border border-accent/20">
                                <Zap className="h-4 w-4 sm:h-3.5 sm:w-3.5 fill-current shrink-0 mt-0.5 sm:mt-0" />
                                <span>Startup Launch - Up to 20% OFF are available for first {DISCOUNT_SPOTS_LEFT} clients only</span>
                            </div>
                        )}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary font-display leading-[1.05] md:text-7xl">
                        Transparent{" "}
                        <span className="text-transparent bg-clip-text bg-red-500">
                            pricing.
                        </span>
                        <br />No surprises.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-text-muted md:text-xl leading-relaxed">
                        Every package is built from scratch - <span className="font-bold text-accent">100% custom, zero templates</span>.
                        Choose the tier that fits your goals, or mix and match services to create your perfect plan.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                        <Button
                            href="/contact"
                            size="lg"
                            className="h-14 rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                        >
                            Get a Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                            href="/contact"
                            size="lg"
                            variant="ghost"
                            className="h-14 rounded-full px-8 text-base text-primary hover:bg-surface"
                        >
                            Book a Free Call
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* ── Tab Switch ───────────────────────────────────────── */}
            <section className="container-padding">
                <motion.div
                    className="flex flex-wrap sm:flex-nowrap max-w-full items-center gap-1 rounded-2xl sm:rounded-full border border-border bg-white p-1 w-fit shadow-sm mb-10 mx-auto sm:mx-0"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {(["main", "social"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 flex-1 sm:flex-none text-center ${activeTab === tab
                                ? "bg-primary text-white shadow"
                                : "text-text-muted hover:text-primary"
                                }`}
                        >
                            {tab === "main" ? "Full Packages" : "Social Media Plans"}
                        </button>
                    ))}
                </motion.div>

                {/* ── Main Packages Grid ──────────────────────────────── */}
                {/* Changed: animate → whileInView (scroll-triggered, matching contact/page.tsx) */}
                {activeTab === "main" && (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {mainPackages.map((pkg, idx) => {
                            const styles = tierStyles[pkg.tier]
                            return (
                                <motion.div
                                    key={pkg.tier}
                                    className="flex"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Card
                                        className={`relative flex flex-col w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${styles.glow} ${pkg.recommended
                                            ? `ring-2 ${styles.ring} shadow-lg ${styles.glow}`
                                            : ""
                                            }`}
                                    >
                                        {pkg.recommended && (
                                            <div className="absolute top-0 inset-x-0 flex justify-center">
                                                <span className="inline-flex items-center gap-1 rounded-b-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white shadow">
                                                    <Star className="h-3 w-3 fill-current" /> Most Popular
                                                </span>
                                            </div>
                                        )}

                                        <CardHeader className={`pt-${pkg.recommended ? "8" : "6"} bg-linear-to-b ${styles.bg}`}>
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${styles.badge}`}>
                                                    <span>{pkg.emoji}</span> {pkg.name}
                                                </span>
                                            </div>

                                            <CardTitle className="text-xl font-display text-primary leading-tight">
                                                {pkg.tagline}
                                            </CardTitle>

                                            <div className="mt-4 flex items-end gap-2">
                                                <span className="text-4xl font-bold text-primary font-display">
                                                    ${pkg.discountPrice}
                                                </span>
                                                {DISCOUNT_ACTIVE && (
                                                    <span className="mb-1 text-lg font-medium text-text-muted line-through">
                                                        ${pkg.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                            {DISCOUNT_ACTIVE && (
                                                <p className="mt-1 text-xs font-semibold text-accent">
                                                    Save ${pkg.originalPrice - pkg.discountPrice} - Startup Launch Offer
                                                </p>
                                            )}
                                        </CardHeader>

                                        <CardContent className="flex flex-col flex-1 pt-4">
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-primary">
                                                    <Globe className="h-3 w-3" /> {pkg.websitePages} Pages
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-primary">
                                                    <Calendar className="h-3 w-3" /> {pkg.socialDays} Days Social
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-primary">
                                                    <MessageSquare className="h-3 w-3" /> {pkg.posts} Posts + {pkg.reels} Reels
                                                </span>
                                            </div>

                                            <ul className="space-y-2 flex-1 mb-6">
                                                {pkg.features.map((f) => (
                                                    <li key={f} className="flex items-start gap-2 text-sm text-text-dark">
                                                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>

                                            <Button
                                                href={`/contact?package=${pkg.tier}`}
                                                className={`w-full rounded-full ${pkg.recommended
                                                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                                                    : "bg-surface text-primary border border-border hover:bg-primary hover:text-white"
                                                    } transition-all`}
                                            >
                                                Get Started
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>
                )}

                {/* ── Social Media Plans Grid ─────────────────────────── */}
                {/* Changed: animate → whileInView */}
                {activeTab === "social" && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {socialPlans.map((plan, idx) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={staggerTransition(idx)}
                            >
                                <Card className={`relative flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${plan.isFree ? "border-accent/40 bg-accent/5" : ""}`}>
                                    {plan.isFree && (
                                        <div className="absolute -top-3 left-6">
                                            <Badge className="bg-accent text-white shadow">FREE Bonus</Badge>
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <CardTitle className="text-lg font-display text-primary">{plan.name}</CardTitle>
                                            <div className="text-right">
                                                {plan.isFree ? (
                                                    <span className="text-2xl font-bold text-accent font-display">FREE</span>
                                                ) : (
                                                    <span className="text-2xl font-bold text-primary font-display">${plan.price}</span>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex flex-col flex-1 gap-4">
                                        <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface p-3 text-center">
                                            <div>
                                                <p className="text-xl font-bold text-primary font-display">{plan.days}</p>
                                                <p className="text-xs text-text-muted">Days</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-primary font-display">{plan.posts}</p>
                                                <p className="text-xs text-text-muted">Posts</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-primary font-display">{plan.reels ?? "—"}</p>
                                                <p className="text-xs text-text-muted">Reels</p>
                                            </div>
                                        </div>

                                        <ul className="space-y-1.5 flex-1">
                                            {[
                                                "Custom-designed posts",
                                                "Platform-optimised (IG / FB / TikTok)",
                                                "Caption copywriting",
                                                "Scheduled publishing",
                                                "Performance overview report",
                                            ].map((f) => (
                                                <li key={f} className="flex items-center gap-2 text-sm text-text-dark">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs font-semibold text-accent">
                                            🎁 {plan.freeBonus}
                                        </div>

                                        {plan.note && (
                                            <p className="text-xs text-text-muted italic">{plan.note}</p>
                                        )}

                                        <Button
                                            href={plan.isFree ? "/contact?package=Custom%20%2F%20Other" : `/contact?package=${plan.days}-day`}
                                            className={`w-full rounded-full ${plan.isFree ? "bg-accent text-white hover:bg-accent/90" : "bg-primary text-white hover:bg-primary/90"} transition-all`}
                                        >
                                            {plan.isFree ? "Claim Free Kickstart" : "Get This Plan"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── What's included ──────────────────────────────────── */}
            {/* Already used whileInView — no change needed here */}
            <section className="bg-surface py-16 lg:py-20">
                <div className="container-padding">
                    <SectionHeader
                        title="Everything You Get"
                        subtitle="Every single package and website comes packed with these essentials — no hidden costs, no upsells."
                        align="center"
                        className="mb-12"
                    />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { icon: Globe, title: "100% Custom Design", desc: "Unique to your brand — never a template your competitors could use." },
                            { icon: Zap, title: "Mobile-Responsive & Fast", desc: "Optimised for every screen, blazing fast on all devices." },
                            { icon: CheckCircle2, title: "Basic SEO Setup", desc: "Local search visibility baked in from the start." },
                            { icon: MessageSquare, title: "Contact Form & Maps", desc: "Customers can find and reach you instantly." },
                            { icon: Star, title: "Social Media Integration", desc: "Your feeds and social links woven into the site." },
                            { icon: Calendar, title: "1 Round of Revisions", desc: "We perfect until you are 100% happy." },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={staggerTransition(idx)}
                            >
                                <Card className="h-full border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6 flex gap-4">
                                        <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                                            <p className="text-sm text-text-muted">{item.desc}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Comparison Table ─────────────────────────────────── */}
            <section className="container-padding">
                <SectionHeader
                    title="Compare Packages"
                    subtitle="Side-by-side breakdown of everything each tier includes."
                    align="center"
                    className="mb-10"
                />
                <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
                    <table className="w-full min-w-160 text-sm">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="py-4 px-5 text-left font-semibold text-white/70 w-40">Feature</th>
                                {mainPackages.map((pkg) => (
                                    <th key={pkg.tier} className="py-4 px-4 text-center font-bold">
                                        <span className="block text-base">{pkg.emoji} {pkg.name}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {compareRows.map((row, i) => (
                                <tr
                                    key={row.feature}
                                    className={`border-t border-border transition-colors ${i % 2 === 0 ? "bg-white" : "bg-surface/60"
                                        } hover:bg-primary/5`}
                                >
                                    <td className="py-3.5 px-5 font-medium text-text-dark">{row.feature}</td>
                                    <td className="py-3.5 px-4 text-center"><CellContent value={row.platinum} /></td>
                                    <td className="py-3.5 px-4 text-center"><CellContent value={row.gold} /></td>
                                    <td className="py-3.5 px-4 text-center"><CellContent value={row.silver} /></td>
                                    <td className="py-3.5 px-4 text-center"><CellContent value={row.bronze} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-text-muted text-center">
                    * Need more than 5 pages? Additional pages and custom requirements are available - <a href="/contact" className="text-accent underline underline-offset-2">contact us</a> for a tailored quote.
                </p>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="container-padding">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-20">
                    <div className="pointer-events-none absolute inset-0 opacity-10">
                        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
                        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        {DISCOUNT_ACTIVE && (
                            <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs sm:text-sm px-4 py-1.5 shrink-0 whitespace-normal text-center leading-tight">
                                🚀 Startup Launch - {DISCOUNT_SPOTS_LEFT} Spots Left
                            </Badge>
                        )}
                        <h2 className="text-4xl font-bold font-display text-white md:text-5xl">
                            Ready to launch your digital presence?
                        </h2>
                        <p className="text-white/75 text-lg">
                            Not sure which package is right for you? Let&apos;s have a quick call and we&apos;ll recommend the best fit.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                href="/contact"
                                size="lg"
                                className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 h-14 px-8 text-base font-bold"
                            >
                                Book a Free Consultation
                            </Button>
                            <Button
                                href="mailto:info@kodemargin.com"
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 h-14 px-8 text-base"
                            >
                                Email Us Directly
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}