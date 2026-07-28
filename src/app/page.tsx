"use client"

import Image from "next/image"
import Link from "next/link"
import { MotionConfig, motion } from "framer-motion"
import {
    ArrowRight,
    CheckCircle2,
    Gauge,
    Layers3,
    LifeBuoy,
    Rocket,
    TrendingUp,
    UsersRound,
    Workflow,
} from "lucide-react"
import { processSteps } from "@/data/home"
import { services } from "@/data/services"

const clientNeeds = [
    {
        icon: Rocket,
        title: "New products",
        description: "Validate and launch with confidence",
    },
    {
        icon: Workflow,
        title: "Business systems",
        description: "Replace slow manual workflows",
    },
    {
        icon: TrendingUp,
        title: "Growth platforms",
        description: "Scale without rebuilding",
    },
    {
        icon: UsersRound,
        title: "Product teams",
        description: "Extend your delivery capacity",
    },
]

const companyStrengths = [
    {
        icon: Layers3,
        title: "Business-first thinking",
        description:
            "We understand the outcome before choosing the technology, so every feature serves a clear purpose.",
    },
    {
        icon: Gauge,
        title: "Reliable engineering",
        description:
            "We build maintainable products with strong foundations for performance, security, and growth.",
    },
    {
        icon: LifeBuoy,
        title: "A partner beyond launch",
        description:
            "We stay involved after release to support, improve, and scale the product as your business evolves.",
    },
]

export default function Home() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="bg-transparent">
                <section className="relative overflow-hidden border-b border-border bg-white/75">
                    <div
                        aria-hidden="true"
                        className="absolute -left-52 top-20 h-96 w-96 rounded-full bg-surface blur-3xl"
                    />
                    <div className="container-padding relative mx-auto grid max-w-7xl items-center gap-14 py-14 sm:py-18 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-3xl"
                        >
                            <div className="mb-7 flex items-center gap-3">
                                <span className="h-px w-9 bg-accent" aria-hidden="true" />
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                    KodeMargin · Software development company
                                </p>
                            </div>

                            <h1 className="font-display text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-primary sm:text-6xl lg:text-[4.5rem]">
                                Built for Today. {" "}
                                <span className="text-accent">Ready for Tomorrow.</span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-text-muted">
                                KodeMargin partners with startups and growing businesses to
                                plan, design, build, and scale dependable web, mobile, and SaaS
                                products.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm font-medium text-text-muted">
                                {[
                                    "Business-focused delivery",
                                    "Clear project ownership",
                                    "Long-term support",
                                ].map((item) => (
                                    <span key={item} className="flex items-center gap-2">
                                        <CheckCircle2
                                            className="h-4 w-4 text-accent"
                                            aria-hidden="true"
                                        />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.aside
                            initial={{ opacity: 0, x: 22 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.44,
                                delay: 0.06,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative min-h-[520px] overflow-hidden rounded-2xl bg-primary p-7 text-white shadow-[0_40px_80px_rgba(5,8,70,0.18)] sm:p-10"
                            aria-label="KodeMargin company capabilities"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute -right-12 -top-20 font-display text-[14rem] font-bold leading-none tracking-[-0.08em] text-white/[0.035]"
                            >
                                KM
                            </div>
                            <div
                                aria-hidden="true"
                                className="absolute inset-y-0 right-0 w-1 bg-accent"
                            />

                            <div className="relative flex min-h-[440px] flex-col">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
                                        <Image
                                            src="/KodeMargin.png"
                                            alt=""
                                            width={64}
                                            height={64}
                                            priority
                                            className="h-full w-full rounded-lg object-contain"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-display text-xl font-bold">
                                            Kode<span className="text-red-400">Margin</span>
                                        </p>
                                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                                            Software development company
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <p className="max-w-md font-display text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">
                                        One team, from product strategy to launch.
                                    </p>
                                    <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                                        Strategy, experience design, engineering, and ongoing
                                        support working together around one business goal.
                                    </p>
                                </div>

                                <div className="mt-10 grid grid-cols-2 gap-x-5 border-t border-white/15">
                                    {[
                                        "Product strategy",
                                        "UI/UX design",
                                        "Web & mobile",
                                        "Cloud & support",
                                    ].map((item, index) => (
                                        <div
                                            key={item}
                                            className="border-b border-white/15 py-4"
                                        >
                                            <span className="font-mono text-[10px] text-red-300">
                                                0{index + 1}
                                            </span>
                                            <p className="mt-1 text-sm font-semibold text-white/85">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-8 text-xs font-medium text-white/45">
                                    <span>Based in Sri Lanka</span>
                                    <span>Partnering globally</span>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </section>

                <section
                    aria-label="How KodeMargin supports different business needs"
                    className="border-b border-border bg-surface"
                >
                    <div className="container-padding mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
                        {clientNeeds.map((need, index) => {
                            const Icon = need.icon

                            return (
                                <div
                                    key={need.title}
                                    className={`flex items-start gap-3 py-6 sm:px-6 ${
                                        index % 2 === 1
                                            ? "sm:border-l sm:border-border"
                                            : ""
                                    } ${
                                        index > 0
                                            ? "lg:border-l lg:border-border"
                                            : "lg:border-l-0"
                                    }`}
                                >
                                    <Icon
                                        className="h-5 w-5 shrink-0 text-accent"
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <p className="font-display text-sm font-bold text-primary">
                                            {need.title}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-text-muted">
                                            {need.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="container-padding mx-auto max-w-7xl py-20 lg:py-28">
                    <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                What we do
                            </p>
                            <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.035em] text-primary sm:text-5xl">
                                End-to-end digital product development.
                            </h2>
                            <p className="mt-5 max-w-lg text-base leading-7 text-text-muted">
                                We bring product thinking, design, and engineering into one
                                accountable team—reducing handoffs and keeping delivery focused.
                            </p>
                            <Link
                                href="/services"
                                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                            >
                                Explore all services
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>

                        <div className="grid border-t border-border md:grid-cols-2">
                            {services.slice(0, 4).map((service, index) => {
                                const Icon = service.icon

                                return (
                                    <article
                                        key={service.title}
                                        className={`border-b border-border py-8 md:px-8 ${
                                            index % 2 === 1
                                                ? "md:border-l md:border-border"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <Icon
                                                className="h-6 w-6 text-primary"
                                                aria-hidden="true"
                                            />
                                            <span className="font-mono text-xs font-semibold text-accent">
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-8 font-display text-xl font-bold text-primary">
                                            {service.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-6 text-text-muted">
                                            {service.description}
                                        </p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="border-y border-border bg-surface">
                    <div className="container-padding mx-auto grid max-w-7xl gap-14 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24 lg:py-24">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                Why KodeMargin
                            </p>
                            <h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-[-0.035em] text-primary sm:text-5xl">
                                A software partner invested in the outcome.
                            </h2>
                            <p className="mt-5 max-w-xl text-base leading-7 text-text-muted">
                                Good software is not only well coded. It solves the right
                                problem, supports the people using it, and keeps delivering
                                value as the business grows.
                            </p>
                        </div>

                        <div className="border-t border-border">
                            {companyStrengths.map((strength) => {
                                const Icon = strength.icon

                                return (
                                    <article
                                        key={strength.title}
                                        className="grid grid-cols-[auto_1fr] gap-5 border-b border-border py-7"
                                    >
                                        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white">
                                            <Icon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <div>
                                            <h3 className="font-display text-lg font-bold text-primary">
                                                {strength.title}
                                            </h3>
                                            <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">
                                                {strength.description}
                                            </p>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="bg-primary text-white">
                    <div className="container-padding mx-auto max-w-7xl py-20 lg:py-24">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                                How we work
                            </p>
                            <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
                                A clear path from idea to launch.
                            </h2>
                            <p className="mt-5 text-base leading-7 text-white/65">
                                A transparent delivery process keeps priorities, decisions, and
                                progress visible from the start.
                            </p>
                        </div>

                        <div className="mt-14 grid border-y border-white/15 md:grid-cols-2 lg:grid-cols-4">
                            {processSteps.map((step, index) => {
                                const Icon = step.icon

                                return (
                                    <article
                                        key={step.title}
                                        className={`py-8 md:px-7 ${
                                            index % 2 === 1
                                                ? "md:border-l md:border-white/15"
                                                : ""
                                        } ${
                                            index > 0
                                                ? "lg:border-l lg:border-white/15"
                                                : "lg:border-l-0"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <Icon
                                                className="h-5 w-5 text-red-300"
                                                aria-hidden="true"
                                            />
                                            <span className="font-mono text-xs text-white/35">
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-8 font-display text-lg font-bold">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-white/55">
                                            {step.desc}
                                        </p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="container-padding mx-auto max-w-7xl py-20 lg:py-24">
                    <div className="grid gap-8 border-l-4 border-accent bg-surface px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                Start a conversation
                            </p>
                            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-primary sm:text-4xl">
                                Have a software project in mind?
                            </h2>
                            <p className="mt-3 text-base leading-7 text-text-muted">
                                Tell us what you want to achieve. We will help you define the
                                right next step.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Discuss your project
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </div>
        </MotionConfig>
    )
}
