"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { motion } from "framer-motion"
import { aboutData, values, team } from "@/data/about"
import { User } from "lucide-react"
import Image from "next/image"

// ─── Shared animation config ────────────────────────────────────────────────
const viewportConfig = { once: true, margin: "-80px" }
const staggerTransition = (idx: number) => ({
    duration: 0.5,
    delay: idx * 0.08,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
})

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-24 pb-20 pt-8 md:pt-12 lg:pt-16">

            {/* ── Hero ─────────────────────────────────────────────── */}
            {/* Above the fold → animate on mount */}
            <section className="container-padding flex flex-col items-start gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">
                        About Us
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display">
                        We are <span className="text-red-500">builders</span> at heart.
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        {aboutData.mission}
                    </p>
                </motion.div>
            </section>

            {/* ── Story Section ─────────────────────────────────────── */}
            {/* Below the fold → whileInView, sliding in from opposite sides */}
            <section className="container-padding">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                    {/* Text slides in from the left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <SectionHeader title="Our Story" className="mb-6" />
                        <p className="text-lg text-text-muted leading-relaxed mb-6">
                            {aboutData.story}
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed">
                            Today, we are proud to work with visionary founders and established enterprises to build the future of the web.
                        </p>
                    </motion.div>
                    {/* Image slides in from the right */}
                    <motion.div
                        className="relative h-80 w-full rounded-2xl overflow-hidden lg:h-96"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                            alt="Our team collaborating"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Subtle dark overlay so it blends with the site palette */}
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl" />
                    </motion.div>
                </div>
            </section>

            {/* ── Values Section ────────────────────────────────────── */}
            {/* Below the fold → whileInView with stagger on each card individually */}
            <section className="bg-surface py-20 lg:py-32">
                <div className="container-padding">
                    <SectionHeader
                        title="Our Values"
                        subtitle="The principles that guide every decision we make."
                        align="center"
                        className="mb-16"
                    />
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={staggerTransition(index)}
                            >
                                <Card className="border-none shadow-sm bg-white hover:shadow-md transition-all h-full">
                                    <CardHeader>
                                        <div className="mb-4 h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                            <value.icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle>{value.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-text-muted">
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
            {/* Below the fold → whileInView with stagger */}
            <section className="container-padding">
                <SectionHeader title="Meet the Team" subtitle="The talented individuals behind KodeMargin." className="mb-12" />

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            className="group flex flex-col items-center"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewportConfig}
                            transition={staggerTransition(index)}
                        >
                            <div className="mb-4 h-64 w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                                {member.image.startsWith('/') ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <>
                                        <div className={`absolute inset-0 ${member.image}`} />
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                            <User className="h-20 w-20 opacity-20" />
                                        </div>
                                    </>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-primary font-display">{member.name}</h3>
                            <p className="text-text-muted">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    )
}