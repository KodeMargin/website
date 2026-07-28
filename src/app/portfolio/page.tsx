"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowUpRight, FolderGit2, Sparkles, ArrowRight } from "lucide-react"
import { projects } from "@/data/portfolio"
import { motionEase, staggerContainer, viewportConfig } from "@/lib/motion"

export default function PortfolioPage() {
    // Filter out projects with empty titles
    const validProjects = projects.filter(project => project.title && project.title.trim() !== "")

    return (
        <div className="flex flex-col gap-24 pb-20 pt-8 md:pt-12 lg:pt-16">
            {/* ── Hero Section ─────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto flex flex-col items-start gap-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: motionEase }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">
                        Our Portfolio
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.92]">
                        Selected work <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-700">
                            & case studies.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        A diverse collection of projects where we delivered exceptional digital experiences and tangible business results.
                    </p>
                </motion.div>
            </section>

            {/* ── Projects Grid / Empty State ───────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                {validProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportConfig}
                        transition={{ duration: 0.42, ease: motionEase }}
                        className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-primary/5 via-surface/60 to-accent/5 p-12 md:p-20 text-center max-w-3xl mx-auto shadow-lg"
                    >
                        {/* Background dot grid */}
                        <div
                            className="absolute inset-0 opacity-[0.3]"
                            style={{
                                backgroundImage: `radial-gradient(circle, #c7cade 1px, transparent 1px)`,
                                backgroundSize: "24px 24px",
                            }}
                        />

                        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl scale-125" />
                                <div className="relative h-20 w-20 rounded-2xl bg-white border border-border/60 shadow-md flex items-center justify-center text-primary">
                                    <FolderGit2 className="h-10 w-10 text-primary" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                                    <Sparkles className="h-3.5 w-3.5" /> In Active Development
                                </div>
                                <h3 className="text-2xl font-bold text-primary font-display">
                                    Exciting case studies coming soon
                                </h3>
                                <p className="text-text-muted text-base leading-relaxed">
                                    We are currently finalizing case studies for our recent client launches in e-commerce, mobile apps, and custom SaaS platforms.
                                </p>
                            </div>

                            <Button href="/contact" size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-md">
                                Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {validProjects.map((project, index) => (
                            <Card key={index} className="group overflow-hidden border-border/60 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl bg-white flex flex-col h-full">
                                {/* Image / Cover */}
                                <div className={`h-64 w-full ${project.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                                </div>

                                <CardHeader className="flex-1">
                                    <div className="mb-3 flex items-center justify-between">
                                        <Badge variant="surface" className="rounded-md px-2.5 py-1 font-semibold">{project.category}</Badge>
                                    </div>
                                    <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-colors duration-300">{project.title}</CardTitle>
                                    <p className="text-text-muted text-sm leading-relaxed">{project.description}</p>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="text-xs font-semibold text-text-dark bg-surface border border-border/40 px-2.5 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-0 pb-6">
                                    <Button variant="link" className="p-0 h-auto font-bold text-primary group-hover:text-accent transition-colors">
                                        View Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </motion.div>
                )}
            </section>

            {/* ── CTA Section ──────────────────────────────────────── */}
            <section className="container-padding max-w-7xl mx-auto w-full">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-24">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-8 bg-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-accent">Get Started</span>
                            <div className="h-px w-8 bg-accent" />
                        </div>
                        <h2 className="text-3xl font-bold font-display text-white md:text-5xl leading-tight">
                            Ready to start your project?
                        </h2>
                        <p className="text-white/75 text-lg md:text-xl leading-relaxed">
                            Let&apos;s build something amazing together.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <Button href="/contact" size="lg" className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 h-14 px-10 text-base font-bold shadow-lg">
                                Get a Proposal
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
