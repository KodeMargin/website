"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { motion } from "framer-motion"
import { services, techStack } from "@/data/services"
import {
    itemVariant,
    motionEase,
    staggerContainer,
    viewportConfig,
} from "@/lib/motion"

export default function ServicesPage() {
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
                        Our Services
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.92]">
                        Expertise that drives <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-700">
                            real results.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-base sm:text-xl text-text-muted leading-relaxed">
                        We combine technical excellence with creative innovation to deliver digital products that stand out.
                    </p>
                </motion.div>
            </section>

            {/* ── Services Grid ─────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service, index) => (
                        <motion.div key={index} variants={itemVariant}>
                            <Card className="group h-full border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 overflow-hidden relative">
                                {/* Hover gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                                <CardHeader className="relative">
                                    <div className="mb-6 h-14 w-14 rounded-2xl bg-surface flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-200 shadow-sm">
                                        <service.icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                                    <p className="text-text-muted text-base leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardHeader>
                                <CardContent className="pt-0 relative">
                                    <div className="h-px w-full bg-border/50 mb-5" />
                                    <ul className="space-y-2.5">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-medium text-text-dark/80">
                                                <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── Tech Stack Section ────────────────────────────────── */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-surface" />
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `radial-gradient(circle, #c7cade 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative container-padding max-w-7xl mx-auto text-center">
                    <SectionHeader
                        title="Our Tech Stack"
                        accentLabel="Technology"
                        subtitle="We use the latest and most robust technologies to build scalable and future-proof solutions."
                        align="center"
                        className="mb-16"
                    />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        className="flex flex-wrap justify-center gap-5 md:gap-7"
                    >
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariant}
                                className="group flex flex-col items-center gap-3"
                            >
                                <div className={`h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center text-text-muted transition-all duration-200 cursor-default hover:-translate-y-1 hover:shadow-md hover:border-primary/20 ${tech.color}`}>
                                    <tech.icon className="h-8 w-8 md:h-10 md:w-10" />
                                </div>
                                <span className="text-xs font-semibold text-text-muted group-hover:text-primary transition-colors">{tech.name}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA Section ──────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-24">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-8 bg-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-accent">Start Building</span>
                            <div className="h-px w-8 bg-accent" />
                        </div>
                        <h2 className="text-3xl font-bold font-display text-white md:text-5xl">
                            Have a project in mind?
                        </h2>
                        <p className="text-white/65 text-lg md:text-xl leading-relaxed">
                            Whether you need a new website, a mobile app, or a complete digital transformation, we are here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <Button
                                href="/contact"
                                size="lg"
                                className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 h-14 px-10 text-base font-bold shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:scale-105"
                            >
                                Start a Project
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
