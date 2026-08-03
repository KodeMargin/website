"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { motion } from "framer-motion"
import { aboutData, values, team } from "@/data/about"
import Image from "next/image"
import Link from "next/link"
import { motionEase, staggerTransition, viewportConfig } from "@/lib/motion"

// ─── Gradient palette for team initials avatars ──────────────────────────────
const avatarGradients = [
    "from-primary to-blue-700",
    "from-accent to-red-700",
    "from-indigo-600 to-purple-700",
    "from-emerald-600 to-teal-700",
]

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-24 pb-20 pt-8 md:pt-12 lg:pt-16">

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto flex flex-col items-start gap-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: motionEase }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">
                        About Us
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.92]">
                        We are{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-700">
                            builders
                        </span>{" "}
                        at heart.
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        {aboutData.intro}
                    </p>
                </motion.div>
            </section>

            {/* ── Story Section ─────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.42, ease: motionEase }}
                    >
                        <SectionHeader
                            title="Our Story"
                            accentLabel="Who We Are"
                            className="mb-6"
                        />
                        <p className="text-lg text-text-muted leading-relaxed mb-6">
                            {aboutData.story}
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed">
                            Today, we are proud to work with visionary founders and established enterprises to build the future of the web.
                        </p>
                    </motion.div>

                    <motion.div
                        className="relative h-80 w-full rounded-3xl overflow-hidden lg:h-[420px] shadow-2xl shadow-primary/10"
                        initial={{ opacity: 0, x: 18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.42, delay: 0.05, ease: motionEase }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                            alt="Our team collaborating"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                        {/* Floating label */}
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/60">
                            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-0.5">Est. 2024</p>
                            <p className="text-sm font-bold text-primary">Building Digital Futures</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Vision & Mission ────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <SectionHeader
                    title="Vision & Mission"
                    accentLabel="Our Direction"
                    subtitle="What we are building toward—and how we turn that ambition into meaningful results."
                    className="mb-12"
                />

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.42, ease: motionEase }}
                    className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-xl shadow-primary/5 lg:grid-cols-[0.85fr_1.15fr]"
                >
                    <article className="relative overflow-hidden bg-primary p-8 text-white sm:p-10 lg:p-12">
                        <span
                            aria-hidden="true"
                            className="absolute -bottom-14 -right-3 font-display text-[13rem] font-bold leading-none text-white/[0.035]"
                        >
                            V
                        </span>
                        <div className="relative">
                            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                                Our Vision
                            </p>
                            <h2 className="mt-7 font-display text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-3xl">
                                A trusted global digital innovation partner.
                            </h2>
                            <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                                {aboutData.vision}
                            </p>
                        </div>
                    </article>

                    <article className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
                        <span
                            aria-hidden="true"
                            className="absolute -bottom-16 -right-5 font-display text-[14rem] font-bold leading-none text-primary/[0.025]"
                        >
                            M
                        </span>
                        <div className="relative">
                            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                                Our Mission
                            </p>
                            <h2 className="mt-7 font-display text-2xl font-bold leading-tight tracking-[-0.025em] text-primary sm:text-3xl">
                                Turning ideas into lasting digital impact.
                            </h2>
                            <p className="mt-5 text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
                                {aboutData.mission}
                            </p>
                        </div>
                    </article>
                </motion.div>
            </section>

            {/* ── Values Section ────────────────────────────────────── */}
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
                        title="Our Values"
                        accentLabel="What Drives Us"
                        subtitle="The principles that guide every decision we make."
                        align="center"
                        className="mb-16"
                    />
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={staggerTransition(index)}
                            >
                                <Card className="border-border/50 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
                                    <CardHeader>
                                        <div className="mb-4 h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                            <value.icon className="h-5 w-5" />
                                        </div>
                                        <CardTitle className="text-lg">{value.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-text-muted leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team Section ──────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <SectionHeader
                    title="Meet the Team"
                    accentLabel="The People"
                    subtitle="The talented individuals behind KodeMargin."
                    className="mb-14"
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            className="group flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportConfig}
                            transition={staggerTransition(index)}
                        >
                            <div className="mb-5 h-52 w-full rounded-3xl overflow-hidden bg-slate-100 relative shadow-md group-hover:shadow-xl transition-shadow duration-300">
                                {member.image.startsWith('/') ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : member.image.startsWith('bg-') ? (
                                    // Placeholder: initials with gradient avatar
                                    <div className={`absolute inset-0 bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} flex items-center justify-center`}>
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-5xl font-bold text-white/90 font-display">
                                                {member.name !== "User 1" && member.name !== "User 2" && member.name !== "User 3" && member.name !== "User 4"
                                                    ? member.name.charAt(0)
                                                    : ["P", "T", "A", "R"][index % 4]}
                                            </span>
                                            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Coming soon</span>
                                        </div>
                                        {/* Decorative pattern */}
                                        <div
                                            className="absolute inset-0 opacity-10"
                                            style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`, backgroundSize: "16px 16px" }}
                                        />
                                    </div>
                                ) : (
                                    <div className={`absolute inset-0 ${member.image}`} />
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-primary font-display group-hover:text-accent transition-colors duration-300">
                                {member.name}
                            </h3>
                            <p className="text-sm text-text-muted mt-1">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.42, ease: motionEase }}
                >
                    <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-20">
                        <div className="pointer-events-none absolute inset-0 opacity-10">
                            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
                            <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
                        </div>
                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-8 bg-accent" />
                                <span className="text-xs font-bold uppercase tracking-widest text-accent">Work With Us</span>
                                <div className="h-px w-8 bg-accent" />
                            </div>
                            <h2 className="text-3xl font-bold font-display text-white md:text-5xl">
                                Let&apos;s build something great together.
                            </h2>
                            <p className="text-white/65 text-lg leading-relaxed">
                                Have a project in mind? We&apos;d love to hear about it.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white text-primary hover:bg-white/90 h-14 px-10 text-base font-bold shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-colors duration-200"
                                >
                                    Start a Project →
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

        </div>
    )
}
