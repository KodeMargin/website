"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { motion } from "framer-motion"
import { aboutData, values, team } from "@/data/about"
import { User } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
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

            {/* Story Section */}
            <section className="container-padding">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                    <div>
                        <SectionHeader title="Our Story" className="mb-6" />
                        <p className="text-lg text-text-muted leading-relaxed mb-6">
                            {aboutData.story}
                        </p>
                        <p className="text-lg text-text-muted leading-relaxed">
                            Today, we are proud to work with visionary founders and established enterprises to build the future of the web.
                        </p>
                    </div>
                    <div className="relative h-80 w-full rounded-2xl bg-gradient-to-tr from-primary to-accent opacity-10 lg:h-full">
                        {/* Placeholder for an office image or illustration */}
                        <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-4xl font-bold">
                            Image Placeholder
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-surface py-20 lg:py-32">
                <div className="container-padding">
                    <SectionHeader
                        title="Our Values"
                        subtitle="The principles that guide every decision we make."
                        align="center"
                        className="mb-16"
                    />
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {values.map((value, index) => (
                            <Card key={index} className="border-none shadow-sm bg-white hover:shadow-md transition-all">
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
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container-padding">
                <SectionHeader title="Meet the Team" subtitle="The talented individuals behind KodeMargin." className="mb-12" />

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <div key={index} className="group flex flex-col items-center">
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
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
