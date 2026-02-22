"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { motion } from "framer-motion"
import { services, techStack } from "@/data/services"

export default function ServicesPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemsVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="flex flex-col gap-24 pb-20 pt-8 md:pt-12 lg:pt-16">
            {/* Hero Section */}
            <section className="container-padding flex flex-col items-start gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">
                        Our Services
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display">
                        Expertise that drives <br />
                        <span className="text-transparent bg-clip-text bg-red-500">
                            real results.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        We combine technical excellence with creative innovation to deliver digital products that stand out.
                    </p>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="container-padding">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service, index) => (
                        <Card key={index} className="group overflow-hidden border-border/60 hover:border-red-500/20 hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="mb-6 h-14 w-14 rounded-2xl bg-surface flex items-center justify-center text-primary group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                                    <service.icon className="h-7 w-7" />
                                </div>
                                <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                                <p className="text-text-muted text-base leading-relaxed mb-6">
                                    {service.description}
                                </p>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-text-dark/80">
                                            <div className="mr-3 h-1.5 w-1.5 rounded-full bg-red-500/60" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>
            </section>

            {/* Tech Stack Section */}
            <section className="bg-surface py-20 lg:py-32">
                <div className="container-padding text-center">
                    <SectionHeader
                        title="Our Tech Stack"
                        subtitle="We use the latest and most robust technologies to build scalable and future-proof solutions."
                        align="center"
                        className="mb-16"
                    />

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className={`h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary transition-all cursor-default hover:scale-110 ${tech.color}`}>
                                    <tech.icon className="h-8 w-8 md:h-10 md:w-10" />
                                </div>
                                <span className="text-sm font-semibold text-text-muted">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container-padding">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-24 mb-10">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8 mb-10">
                        <h2 className="text-3xl font-bold font-display text-white md:text-5xl">
                            Have a project in mind?
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl">
                            Whether you need a new website, a mobile app, or a complete digital transformation, we are here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button href="/contact" size="lg" className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 h-14 px-8 text-base font-bold">
                                Start a Project
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
