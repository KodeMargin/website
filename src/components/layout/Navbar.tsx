"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Packages", href: "/packages" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <>
            <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
                <div className="mx-auto flex h-20 max-w-7xl items-center px-3 sm:px-5 md:px-8">
                    <div className="pointer-events-auto flex h-16 w-full items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-4 shadow-[0_8px_32px_rgba(5,8,70,0.08)] backdrop-blur-2xl sm:px-5">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="KodeMargin home"
                    >
                        <Image
                            src="/KodeMargin.png"
                            alt=""
                            width={38}
                            height={38}
                            priority
                            className="h-9 w-9 rounded-lg"
                        />
                        <span className="font-display text-lg font-bold tracking-[-0.035em] text-primary sm:text-xl">
                            Kode<span className="text-accent">Margin</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
                        {navItems.map((item) => {
                            const active =
                                pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href))

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative rounded-md py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                        active
                                            ? "text-primary"
                                            : "text-text-muted hover:text-primary"
                                    )}
                                >
                                    {item.name}
                                    {active && (
                                        <motion.span
                                            layoutId="navbar-active-dot"
                                            className="absolute -right-2 top-1 h-1.5 w-1.5 rounded-full bg-accent"
                                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    <Link
                        href="/contact"
                        className="group hidden min-h-11 items-center gap-3 rounded-xl bg-primary py-2 pl-5 pr-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:inline-flex"
                    >
                        Start a project
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors duration-200 group-hover:bg-accent">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? (
                            <X className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            id="mobile-navigation"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed inset-x-3 top-24 z-50 overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-[0_24px_70px_rgba(5,8,70,0.16)] backdrop-blur-2xl sm:inset-x-5 lg:hidden"
                        >
                            <nav className="grid grid-cols-2 gap-1 p-3" aria-label="Mobile navigation">
                                {navItems.map((item) => {
                                    const active =
                                        pathname === item.href ||
                                        (item.href !== "/" && pathname.startsWith(item.href))

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                "flex min-h-11 items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                                                active
                                                    ? "bg-primary text-white"
                                                    : "text-text-muted hover:bg-surface hover:text-primary"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="col-span-2 mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
                                >
                                    Start a project
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </nav>
                        </motion.div>
                        <motion.button
                            type="button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-primary/20 backdrop-blur-sm lg:hidden"
                            aria-label="Close menu"
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
