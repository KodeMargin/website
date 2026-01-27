"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/data/portfolio"

export default function PortfolioPage() {
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
        <div className="flex flex-col gap-24 pb-20 pt-10 md:pt-20 lg:pt-32">
            {/* Hero Section */}
            <section className="container-padding flex flex-col items-start gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 max-w-4xl"
                >
                    <Badge variant="surface" className="px-4 py-1.5 text-sm">
                        Our Portfolio
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl font-display">
                        Selected work <br />
                        <span className="text-transparent bg-clip-text bg-red-500">
                            & case studies.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-xl text-text-muted leading-relaxed">
                        A diverse collection of projects where we delivered exceptional digital experiences and tangible business results.
                    </p>
                </motion.div>
            </section>

            {/* Projects Grid */}
            <section className="container-padding">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project, index) => (
                        <Card key={index} className="group overflow-hidden border-none shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl bg-white flex flex-col h-full">
                            {/* Image Placeholder */}
                            <div className={`h-64 w-full ${project.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                            </div>

                            <CardHeader className="flex-1">
                                <div className="mb-4 flex items-center justify-between">
                                    <Badge variant="secondary" className="rounded-md px-2 py-1 font-medium bg-surface text-text-muted">{project.category}</Badge>
                                </div>
                                <CardTitle className="text-2xl mb-2 group-hover:text-red-500 transition-colors">{project.title}</CardTitle>
                                <p className="text-text-muted">{project.description}</p>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="text-xs font-semibold text-text-muted/80 bg-surface px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0 pb-6">
                                <Button variant="link" className="p-0 h-auto font-semibold text-primary group-hover:text-red-500">
                                    View Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container-padding">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-24">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl font-bold font-display text-white md:text-5xl">
                            Ready to start your project?
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl">
                            Let's build something amazing together.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 h-14 px-8 text-base font-bold">
                                Get a Proposal
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
