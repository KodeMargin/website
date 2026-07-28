"use client"

import Link from "next/link"
import { Linkedin, Facebook, Instagram } from "lucide-react"
import { BsWhatsapp } from "react-icons/bs"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Packages", href: "/packages" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
]

const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/kodemargin/" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=61568407317471" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/kodemargin/" },
    { name: "WhatsApp", icon: BsWhatsapp, href: "https://wa.me/94711888358" },
]

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative border-t border-border/60 bg-white overflow-hidden">
            {/* Subtle top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container-padding max-w-7xl mx-auto">
                {/* Main footer content */}
                <div className="py-14 grid gap-12 md:grid-cols-3 lg:grid-cols-4">

                    {/* Brand column */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="h-10 w-10 flex items-center justify-center rounded-xl border border-border/40 shadow-sm group-hover:shadow-md transition-shadow bg-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/KodeMargin.png" alt="KodeMargin Logo" className="h-9 w-9 rounded-lg" />
                            </div>
                            <span className="text-xl font-bold tracking-tight font-display text-primary">
                                Kode<span className="text-accent">Margin</span>
                            </span>
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                            A software development company helping businesses plan, design, build, and scale dependable digital products.
                        </p>
                        {/* Social icons */}
                        <div className="flex items-center gap-3 mt-1">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                >
                                    <link.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted/60">
                            Navigation
                        </h3>
                        <nav className="flex flex-col gap-2.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-text-muted hover:text-primary transition-colors font-medium w-fit"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact column */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted/60">
                            Get in Touch
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:kodemargin@gmail.com"
                                className="text-sm text-text-muted hover:text-primary transition-colors font-medium"
                            >
                                kodemargin@gmail.com
                            </a>
                            <a
                                href="tel:+94711888358"
                                className="text-sm text-text-muted hover:text-primary transition-colors font-medium"
                            >
                                +94 71 188 8358
                            </a>
                            <span className="text-sm text-text-muted">Sri Lanka</span>
                        </div>
                        <Link
                            href="/contact"
                            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primary/90 transition-all w-fit shadow-sm hover:shadow-md"
                        >
                            Start a Project →
                        </Link>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-text-muted/70">
                        © {year} KodeMargin. All rights reserved.
                    </p>
                    <p className="text-xs text-text-muted/50">
                        Crafted with care in Sri Lanka
                    </p>
                </div>
            </div>
        </footer>
    )
}
