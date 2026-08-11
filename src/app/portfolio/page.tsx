"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase"
import {
    buildSteps,
    demoSolutions,
    founderProjects,
    internalProducts,
} from "@/data/portfolio"
import { motionEase, staggerTransition, viewportConfig } from "@/lib/motion"

function Reveal({
    children,
    index = 0,
    className,
}: {
    children: React.ReactNode
    index?: number
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={staggerTransition(index)}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function PortfolioPage() {
    return (
        <div className="bg-transparent">

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="container-padding relative mx-auto max-w-7xl py-14 sm:py-16 lg:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.42, ease: motionEase }}
                        className="max-w-4xl"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                            Our work
                        </p>

                        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] tracking-[-0.04em] text-primary sm:text-6xl lg:text-8xl">
                            Products, platforms, and ideas built to{" "}
                            <span className="text-accent">solve real problems.</span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-text-muted">
                            KodeMargin is at the beginning of its journey as a company, but our
                            foundation is built on hands-on product development and software
                            engineering experience.
                        </p>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted">
                            Explore the products we are building, selected work completed by our
                            founder, and concept solutions designed to demonstrate how we approach
                            real business challenges.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                Discuss your project
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <a
                                href="#products"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-sm font-bold text-primary transition-colors duration-200 hover:border-primary/30 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                Explore our work
                                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </div>

                        <p className="mt-7 flex items-center gap-2 border-t border-border pt-6 text-sm font-medium text-text-muted">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                            Transparent work. Real capabilities. No invented case studies.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Products We're Building ──────────────────────────── */}
            <section
                id="products"
                className="container-padding mx-auto max-w-7xl scroll-mt-24 py-20 lg:py-24"
            >
                <SectionHeader
                    title="Products We're Building"
                    accentLabel="Internal products"
                    subtitle="Original digital products designed and developed by KodeMargin. These projects demonstrate our capabilities in product strategy, user experience, software engineering, AI integration, and scalable platform development."
                    className="mb-14"
                />

                <div className="flex flex-col gap-16 lg:gap-24">
                    {internalProducts.map((project, index) => (
                        <Reveal key={project.id} index={index}>
                            <ProjectShowcase
                                project={project}
                                layout="featured"
                                reverse={index % 2 === 1}
                            />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── Founder's Selected Work ──────────────────────────── */}
            <section
                className="border-y border-border bg-surface/60"
            >
                <div className="container-padding mx-auto max-w-7xl py-20 lg:py-24">
                    <SectionHeader
                        title="Founder's Selected Work"
                        accentLabel="Founder experience"
                        subtitle="Selected software projects built or contributed to by KodeMargin's founder through previous professional, independent, and product-development experience."
                        className="mb-6"
                    />

                    <p className="max-w-[42rem] text-base leading-7 text-text-muted">
                        These projects are presented to demonstrate technical capability and
                        problem-solving experience. They were not necessarily delivered as
                        KodeMargin client engagements.
                    </p>

                    <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        Founder experience — not KodeMargin client work
                    </p>

                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {founderProjects.map((project, index) => (
                            <Reveal key={project.id} index={index} className="h-full">
                                <ProjectShowcase project={project} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Concepts & Demo Solutions ────────────────────────── */}
            <section
                className="container-padding mx-auto max-w-7xl py-20 lg:py-24"
            >
                <SectionHeader
                    title="Concepts & Demo Solutions"
                    accentLabel="Demonstration work"
                    subtitle="Focused concepts created to explore how digital products can solve common business challenges."
                    className="mb-6"
                />

                <p className="max-w-[42rem] text-base leading-7 text-text-muted">
                    These are demonstration projects rather than commissioned client work. Each
                    concept shows our approach to understanding a business problem, designing the
                    right workflow, and turning the solution into a usable digital product.
                </p>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {demoSolutions.map((project, index) => (
                        <Reveal key={project.id} index={index} className="h-full">
                            <ProjectShowcase project={project} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── How We Build ─────────────────────────────────────── */}
            <section
                className="border-y border-border bg-surface/60"
            >
                <div className="container-padding mx-auto max-w-7xl py-20 lg:py-24">
                    <SectionHeader
                            title="How We Turn Ideas Into Dependable Products"
                        accentLabel="How we build"
                        subtitle="Every project begins with understanding the business problem before selecting the technology or designing the interface."
                        className="mb-14"
                    />

                    <div className="relative">
                        <span
                            aria-hidden="true"
                            className="absolute left-5 top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-5 md:bottom-auto md:h-px md:w-auto"
                        />

                        <ol className="grid gap-8 md:grid-cols-5 md:gap-6">
                        {buildSteps.map((step, index) => (
                            <motion.li
                                key={step.step}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportConfig}
                                transition={staggerTransition(index)}
                                className="relative flex gap-5 md:block md:pr-4"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-white">
                                    {step.step}
                                </span>
                                <div className="md:mt-5">
                                    <h3 className="font-display text-lg font-bold text-primary">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-text-muted">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* ── Client Success Stories ───────────────────────────── */}
            <section
                aria-labelledby="stories-heading"
                className="container-padding mx-auto max-w-7xl py-20 lg:py-24"
            >
                <Reveal>
                    <div className="grid gap-10 rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                Next chapter
                            </p>
                            <h2
                                id="stories-heading"
                                className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-primary sm:text-4xl"
                            >
                                Client Success Stories
                            </h2>
                            <p className="mt-5 text-base leading-7 text-text-muted">
                                We are currently working toward our first set of KodeMargin client
                                partnerships.
                            </p>
                            <p className="mt-4 text-base leading-7 text-text-muted">
                                As projects are completed, this section will feature verified case
                                studies covering the original business challenge, our solution, the
                                delivery process, and measurable outcomes.
                            </p>
                        </div>

                        <div className="flex flex-col justify-center border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                            <h3 className="font-display text-xl font-bold text-primary sm:text-2xl">
                                Have a project we could build together?
                            </h3>
                            <p className="mt-4 text-base leading-7 text-text-muted">
                                Become one of the first businesses to partner with KodeMargin and
                                receive focused founder-level involvement throughout your project.
                            </p>
                            <Link
                                href="/contact"
                                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto sm:self-start"
                            >
                                Discuss your project
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ── Final CTA ────────────────────────────────────────── */}
            <section
                aria-labelledby="final-cta-heading"
                className="container-padding mx-auto max-w-7xl pb-20 lg:pb-24"
            >
                <Reveal>
                    <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
                        <span
                            aria-hidden="true"
                            className="absolute -right-10 -top-16 font-display text-[12rem] font-bold leading-none tracking-[-0.08em] text-white/[0.05]"
                        >
                            KM
                        </span>
                        <span aria-hidden="true" className="absolute inset-y-0 right-0 w-1 bg-accent" />

                        <div className="relative max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                Start a conversation
                            </p>
                            <h2
                                id="final-cta-heading"
                                className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl"
                            >
                                Have a product idea or business problem worth solving?
                            </h2>
                            <p className="mt-5 text-base leading-7 text-white/65">
                                Tell us what you are trying to build, improve, or automate. We will
                                help you identify the right next step.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                                >
                                    Start a conversation
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                                >
                                    Explore our services
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    )
}
