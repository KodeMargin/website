"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, X, ArrowRight, Zap, Star, MessageSquare, Globe, Calendar, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { mainPackages, socialPlans, compareRows, DISCOUNT_ACTIVE, DISCOUNT_SPOTS_LEFT } from "@/data/packages"
import { motionEase, staggerTransition, viewportConfig } from "@/lib/motion"

// ─── Tier accent colours ────────────────────────────────────────────────────
const tierStyles: Record<string, { badge: string; ring: string; glow: string; bg: string }> = {
    platinum: {
        badge: "bg-indigo-600 text-white",
        ring: "ring-2 ring-indigo-500/80 shadow-lg shadow-indigo-500/10",
        glow: "hover:shadow-indigo-500/15",
        bg: "from-indigo-900/10 via-primary/5 to-transparent",
    },
    gold: {
        badge: "bg-amber-500 text-white",
        ring: "ring-2 ring-amber-500/80 shadow-lg shadow-amber-500/10",
        glow: "hover:shadow-amber-500/15",
        bg: "from-amber-500/10 via-primary/5 to-transparent",
    },
    silver: {
        badge: "bg-slate-700 text-white",
        ring: "border-border/80",
        glow: "hover:shadow-slate-500/10",
        bg: "from-slate-500/10 via-primary/5 to-transparent",
    },
    bronze: {
        badge: "bg-orange-600 text-white",
        ring: "border-border/80",
        glow: "hover:shadow-orange-500/10",
        bg: "from-orange-500/10 via-primary/5 to-transparent",
    },
}

// ─── Comparison table helpers ────────────────────────────────────────────────
function CellContent({ value }: { value: string | boolean }) {
    if (value === true) return <CheckCircle2 className="mx-auto h-5 w-5 text-accent" />
    if (value === false) return <X className="mx-auto h-5 w-5 text-text-muted/30" />
    return <span className="text-sm font-bold text-primary">{value}</span>
}

export default function PackagesPage() {
    const [activeTab, setActiveTab] = useState<"main" | "social">("main")

    return (
        <div className="flex flex-col gap-20 pb-24 pt-8 md:pt-12">

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: motionEase }}
                    className="max-w-4xl"
                >
                    <div className="flex flex-col items-start gap-4 mb-6">
                        <Badge variant="surface" className="px-4 py-1.5 text-sm">
                            Our Packages
                        </Badge>
                        {DISCOUNT_ACTIVE && (
                            <div className="inline-flex items-center gap-2.5 rounded-full bg-accent/10 px-4 py-2 text-xs sm:text-sm font-semibold text-accent border border-accent/20">
                                <Zap className="h-4 w-4 fill-current shrink-0" />
                                <span>Startup Launch — Up to 20% OFF for the first {DISCOUNT_SPOTS_LEFT} clients</span>
                            </div>
                        )}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary font-display leading-[0.95] md:text-7xl">
                        Transparent{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-700">
                            pricing.
                        </span>
                        <br />No surprises.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-text-muted md:text-xl leading-relaxed">
                        Every package is built from scratch — <span className="font-bold text-primary">100% custom, zero templates</span>.
                        Choose the tier that fits your goals, or mix and match services to create your perfect plan.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Button
                            href="/contact"
                            size="lg"
                            className="h-14 rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:scale-105"
                        >
                            Get a Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                            href="/contact"
                            size="lg"
                            variant="outline"
                            className="h-14 rounded-full px-8 text-base text-primary border-border hover:bg-surface"
                        >
                            Book a Free Call
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* ── Tab Switch & Packages Grid ────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <motion.div
                    className="flex flex-wrap sm:flex-nowrap max-w-full items-center gap-1.5 rounded-full border border-border/80 bg-surface/80 p-1.5 w-fit shadow-inner mb-12 mx-auto sm:mx-0"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, delay: 0.04, ease: motionEase }}
                >
                    {(["main", "social"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 flex-1 sm:flex-none text-center ${activeTab === tab
                                ? "bg-primary text-white shadow-sm"
                                : "text-text-muted hover:text-primary"
                                }`}
                        >
                            {tab === "main" ? "Full Packages" : "Social Media Plans"}
                        </button>
                    ))}
                </motion.div>

                {/* ── Main Packages Grid ──────────────────────────────── */}
                {activeTab === "main" && (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {mainPackages.map((pkg, idx) => {
                            const styles = tierStyles[pkg.tier] || tierStyles.silver
                            return (
                                <motion.div
                                    key={pkg.tier}
                                    className="flex"
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={viewportConfig}
                                    transition={staggerTransition(idx)}
                                >
                                    <Card
                                        className={`relative flex flex-col w-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border-border/60 ${styles.ring} ${styles.glow}`}
                                    >
                                        {pkg.recommended && (
                                            <div className="absolute top-0 inset-x-0 flex justify-center z-10">
                                                <span className="inline-flex items-center gap-1.5 rounded-b-xl bg-gradient-to-r from-accent to-red-600 px-4 py-1 text-xs font-bold text-white shadow-md">
                                                    <Star className="h-3.5 w-3.5 fill-current" /> Most Popular
                                                </span>
                                            </div>
                                        )}

                                        <CardHeader className={`pt-${pkg.recommended ? "9" : "7"} bg-gradient-to-b ${styles.bg}`}>
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold shadow-xs ${styles.badge}`}>
                                                    <span>{pkg.emoji}</span> {pkg.name}
                                                </span>
                                            </div>

                                            <CardTitle className="text-xl font-display text-primary leading-snug">
                                                {pkg.tagline}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="flex flex-col flex-1 pt-4">
                                            <div className="flex flex-wrap gap-1.5 mb-6">
                                                <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-primary border border-border/40">
                                                    <Globe className="h-3 w-3 text-accent" /> {pkg.websitePages} Pages
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-primary border border-border/40">
                                                    <Calendar className="h-3 w-3 text-accent" /> {pkg.socialDays} Days Social
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-primary border border-border/40">
                                                    <MessageSquare className="h-3 w-3 text-accent" /> {pkg.posts} Posts + {pkg.reels} Reels
                                                </span>
                                            </div>

                                            <ul className="space-y-2.5 flex-1 mb-8">
                                                {pkg.features.map((f) => (
                                                    <li key={f} className="flex items-start gap-2.5 text-sm font-medium text-text-dark/90">
                                                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                                        <span>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <Button
                                                href={`/contact?package=${pkg.tier}`}
                                                className={`w-full rounded-xl h-11 ${pkg.recommended
                                                    ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
                                                    : "bg-surface text-primary border border-border/80 hover:bg-primary hover:text-white"
                                                    } transition-all font-bold`}
                                            >
                                                Get the {pkg.name} Plan
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>
                )}

                {/* ── Social Media Plans Grid ─────────────────────────── */}
                {activeTab === "social" && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {socialPlans.map((plan, idx) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={staggerTransition(idx)}
                            >
                                <Card className={`relative flex flex-col h-full border-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${plan.isFree ? "border-accent/40 bg-accent/5 ring-2 ring-accent/20" : ""}`}>
                                    {plan.isFree && (
                                        <div className="absolute -top-3.5 left-6">
                                            <Badge className="bg-accent text-white shadow-md font-bold px-3 py-1">FREE Bonus</Badge>
                                        </div>
                                    )}
                                    <CardHeader className="pt-7">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <CardTitle className="text-xl font-display text-primary">{plan.name}</CardTitle>
                                            {plan.isFree && (
                                                <span className="text-2xl font-bold text-accent font-display">FREE</span>
                                            )}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex flex-col flex-1 gap-5">
                                        <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface p-3 text-center border border-border/40">
                                            <div>
                                                <p className="text-xl font-bold text-primary font-display">{plan.days}</p>
                                                <p className="text-xs font-semibold text-text-muted">Days</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-primary font-display">{plan.posts}</p>
                                                <p className="text-xs font-semibold text-text-muted">Posts</p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-primary font-display">{plan.reels ?? "—"}</p>
                                                <p className="text-xs font-semibold text-text-muted">Reels</p>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 flex-1">
                                            {[
                                                "Custom-designed posts",
                                                "Platform-optimised (IG / FB / TikTok)",
                                                "Caption copywriting",
                                                "Scheduled publishing",
                                                "Performance overview report",
                                            ].map((f) => (
                                                <li key={f} className="flex items-center gap-2 text-sm font-medium text-text-dark/90">
                                                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="rounded-xl border border-accent/20 bg-accent/5 px-3.5 py-2.5 text-xs font-bold text-accent flex items-center gap-2">
                                            <span>🎁</span> <span>{plan.freeBonus}</span>
                                        </div>

                                        {plan.note && (
                                            <p className="text-xs text-text-muted italic">{plan.note}</p>
                                        )}

                                        <Button
                                            href={plan.isFree ? "/contact?package=Custom%20%2F%20Other" : `/contact?package=${plan.days}-day`}
                                            className={`w-full rounded-xl h-11 font-bold ${plan.isFree ? "bg-accent text-white hover:bg-accent/90" : "bg-primary text-white hover:bg-primary/90"} transition-all`}
                                        >
                                            {plan.isFree ? "Claim Free Kickstart" : "Get This Plan"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ── Custom Development Card (main tab only) ─────────── */}
                {activeTab === "main" && (
                    <motion.div
                        className="mt-10"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.4, delay: 0.08, ease: motionEase }}
                    >
                        <Card className="relative overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-accent/5 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="pointer-events-none absolute inset-0 opacity-5">
                                <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary blur-3xl" />
                                <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent blur-3xl" />
                            </div>
                            <CardContent className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 py-10 px-8">
                                <div className="shrink-0 h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 text-white">
                                    <Code2 className="h-8 w-8" />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-2xl font-bold font-display text-primary">Custom Web Application & System Development</h2>
                                        <Badge variant="surface" className="text-xs px-3 py-1">Bespoke</Badge>
                                    </div>
                                    <p className="text-text-muted leading-relaxed max-w-2xl">
                                        Need something beyond a standard website? We build fully custom web applications, internal business systems, dashboards, booking platforms, e-commerce solutions, and more — engineered from scratch to fit your exact workflow and requirements.
                                    </p>
                                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                                        {[
                                            "Web Applications",
                                            "Business Management Systems",
                                            "E-Commerce Platforms",
                                            "Booking & Reservation Systems",
                                            "Custom Dashboards & Portals",
                                            "API Integrations",
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-1.5 text-sm font-semibold text-text-dark">
                                                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="shrink-0 w-full md:w-auto">
                                    <Button
                                        href="/contact?package=Custom%20Development"
                                        size="lg"
                                        className="w-full md:w-auto rounded-full bg-primary text-white hover:bg-primary/90 h-13 px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 font-bold"
                                    >
                                        Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </section>

            {/* ── What's included ──────────────────────────────────── */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-surface" />
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `radial-gradient(circle, #c7cade 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative container-padding max-w-7xl mx-auto">
                    <SectionHeader
                        title="Everything You Get"
                        accentLabel="Standard Features"
                        subtitle="Every single package and website comes packed with these essentials — no hidden costs, no upsells."
                        align="center"
                        className="mb-14"
                    />
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={staggerTransition(idx)}
                            >
                                <Card className="h-full border-border/50 bg-white hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6 flex gap-4">
                                        <div className="shrink-0 h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-primary mb-1 text-base font-display">{item.title}</h3>
                                            <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Comparison Table ─────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <SectionHeader
                    title="Compare Packages"
                    accentLabel="Side By Side"
                    subtitle="Side-by-side breakdown of everything each tier includes."
                    align="center"
                    className="mb-12"
                />
                <div className="overflow-x-auto rounded-3xl border border-border/80 shadow-md">
                    <table className="w-full min-w-160 text-sm">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="py-5 px-6 text-left font-bold text-white/80 w-44">Feature</th>
                                {mainPackages.map((pkg) => (
                                    <th key={pkg.tier} className="py-5 px-4 text-center font-bold font-display">
                                        <span className="block text-base">{pkg.emoji} {pkg.name}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {compareRows.map((row, i) => (
                                <tr
                                    key={row.feature}
                                    className={`border-t border-border/60 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-surface/50"
                                        } hover:bg-primary/5`}
                                >
                                    <td className="py-4 px-6 font-semibold text-text-dark">{row.feature}</td>
                                    <td className="py-4 px-4 text-center"><CellContent value={row.platinum} /></td>
                                    <td className="py-4 px-4 text-center"><CellContent value={row.gold} /></td>
                                    <td className="py-4 px-4 text-center"><CellContent value={row.silver} /></td>
                                    <td className="py-4 px-4 text-center"><CellContent value={row.bronze} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-text-muted text-center font-medium">
                    * Need more than 5 pages? Additional pages and custom requirements are available — <a href="/contact" className="text-accent underline underline-offset-2 font-bold">contact us</a> for a tailored quote.
                </p>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-20">
                    <div className="pointer-events-none absolute inset-0 opacity-10">
                        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
                        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        {DISCOUNT_ACTIVE && (
                            <Badge className="bg-accent/20 text-accent border border-accent/30 text-xs sm:text-sm px-4 py-1.5 shrink-0 font-bold">
                                🚀 Startup Launch — {DISCOUNT_SPOTS_LEFT} Spots Left
                            </Badge>
                        )}
                        <h2 className="text-4xl font-bold font-display text-white md:text-5xl leading-tight">
                            Ready to launch your digital presence?
                        </h2>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed">
                            Not sure which package is right for you? Let&apos;s have a quick call and we&apos;ll recommend the best fit.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <Button
                                href="/contact"
                                size="lg"
                                className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 h-14 px-8 text-base font-bold shadow-lg"
                            >
                                Book a Free Consultation
                            </Button>
                            <Button
                                href="mailto:kodemargin@gmail.com"
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
