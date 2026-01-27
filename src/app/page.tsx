"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Code2, Smartphone, BarChart3, Palette, Globe, Zap } from "lucide-react"
import { stats, processSteps, testimonials } from "@/data/home"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col gap-24 pb-20 pt-10 md:pt-20 lg:pt-32">
      {/* Hero Section */}
      <section className="container-padding flex flex-col items-start gap-8 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Accepting new projects for Q1 2026
          </div>

          <h1 className="text-6xl font-bold tracking-tight text-primary sm:text-7xl md:text-8xl lg:text-9xl font-display leading-[0.9]">
            We build <br />
            <span className="text-transparent bg-clip-text bg-red-500">
              digital future.
            </span>
          </h1>

          <p className="max-w-2xl text-xl text-text-muted md:text-2xl leading-relaxed">
            KodeMargin works with ambitious companies to design products, build technology, and grow brands in the digital age.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-14 rounded-full px-8 text-base shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-105 active:scale-95">
              Start Your Project
            </Button>
            <Button size="lg" variant="ghost" className="h-14 group rounded-full px-8 text-base text-primary hover:bg-surface">
              View Our Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 w-full border-t border-border pt-12"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:w-full">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-4xl font-bold text-primary font-display">{stat.value}</span>
                <span className="text-sm font-medium text-text-muted uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="container-padding">
        <SectionHeader
          title="Our Expertise"
          subtitle="We are a full-service agency that covers every aspect of your digital presence. From code to content, we handle it all."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <Card className="col-span-1 row-span-2 group border-primary/5 bg-primary/5 hover:bg-primary/10 transition-colors">
            <CardHeader>
              <div className="mb-4 h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle>Web Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-muted mb-6">
                We build blazing fast, SEO-optimized websites using Next.js and React. Our code is clean, maintainable, and scalable.
              </p>
              <ul className="space-y-2 text-sm text-text-dark font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Custom Web Apps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> E-commerce Solutions</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> CMS Integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> API Development</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:-translate-y-1 transition-transform">
            <CardHeader>
              <div className="mb-4 h-10 w-10 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                <Smartphone className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Mobile Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">Native and cross-platform mobile solutions for iOS and Android using React Native.</p>
            </CardContent>
          </Card>

          <Card className="group hover:-translate-y-1 transition-transform">
            <CardHeader>
              <div className="mb-4 h-10 w-10 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                <Palette className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">UI/UX Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">User-centric design that looks beautiful and converts visitors into customers.</p>
            </CardContent>
          </Card>

          <Card className="group hover:-translate-y-1 transition-transform">
            <CardHeader>
              <div className="mb-4 h-10 w-10 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                <BarChart3 className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Digital Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">Data-driven strategies including SEO, PPC, and Social Media Marketing.</p>
            </CardContent>
          </Card>

          <Card className="group hover:-translate-y-1 transition-transform">
            <CardHeader>
              <div className="mb-4 h-10 w-10 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                <Code2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Software SaaS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">Building complex SaaS platforms from MVP to scale.</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="bg-surface py-20 lg:py-32">
        <div className="container-padding">
          <SectionHeader
            title="How We Work"
            subtitle="Our proven process ensures that we deliver high-quality results, on time and within budget."
            align="center"
            className="mb-16"
          />

          <div className="grid gap-8 md:grid-cols-4 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10" />

            {processSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-surface md:bg-transparent">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white hover:bg-red-500 bg-primary text-white shadow-lg mb-6 z-10">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 font-display">{step.title}</h3>
                <p className="text-text-muted text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-padding">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <Badge variant="accent" className="mb-6">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-primary font-display mb-6 leading-tight">
              Trusted by innovative companies worldwide.
            </h2>
            <p className="text-text-muted text-lg mb-8">
              We take pride in our work and the relationships we build with our clients. Here is what they have to say about working with KodeMargin.
            </p>
            <Button size="lg" variant="outline" className="rounded-full">Read all reviews</Button>
          </div>

          <div className="grid gap-6">
            {testimonials.map((review, i) => (
              <Card key={i} className="border-none shadow-lg bg-white">
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Zap key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg font-medium text-text-dark italic mb-6">"{review.quote}"</p>
                  <div>
                    <div className="font-bold text-primary">{review.author}</div>
                    <div className="text-sm text-text-muted">{review.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-padding pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold font-display text-white md:text-5xl">
              Ready to grow your business?
            </h2>
            <p className="text-white/80 text-lg md:text-xl">
              Let's discuss how we can help you achieve your goals with a custom digital solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90 h-14 px-8 text-base font-bold">
                Get a Proposal
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 h-14 px-8 text-base">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
