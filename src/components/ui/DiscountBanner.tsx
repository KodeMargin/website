"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Zap, ArrowRight } from "lucide-react"
import { DISCOUNT_ACTIVE, DISCOUNT_SPOTS_LEFT } from "@/data/packages"

const STORAGE_KEY = "km_discount_banner_dismissed"

export function DiscountBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!DISCOUNT_ACTIVE) return
        const dismissed = sessionStorage.getItem(STORAGE_KEY)
        if (!dismissed) setVisible(true)
    }, [])

    const dismiss = () => {
        sessionStorage.setItem(STORAGE_KEY, "1")
        setVisible(false)
    }

    if (!DISCOUNT_ACTIVE) return null

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative overflow-hidden z-50"
                >
                    <div className="relative flex items-center justify-between gap-3 bg-primary px-4 py-2.5 text-white sm:px-6 border-b border-white/10">
                        {/* Shimmer overlay */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "250%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
                                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12"
                            />
                        </div>

                        {/* Accent dot */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />

                        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center pl-3">
                            <span className="flex items-center gap-2 text-sm font-bold">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                                    <Zap className="h-3 w-3 fill-current" />
                                </span>
                                Startup Launch Offer
                            </span>
                            <span className="hidden sm:inline text-white/30">·</span>
                            <span className="text-sm text-white/80">
                                <span className="font-bold text-yellow-300">Up to 20% OFF</span>
                                {" "}for the first{" "}
                                <span className="font-bold text-white">{DISCOUNT_SPOTS_LEFT} clients</span>
                                {" "}—{" "}
                                <span className="text-white/60">limited spots available.</span>
                            </span>
                            <Link
                                href="/packages"
                                onClick={dismiss}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm hover:bg-white/20 transition-colors whitespace-nowrap"
                            >
                                View Packages <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>

                        <button
                            onClick={dismiss}
                            aria-label="Dismiss banner"
                            className="ml-2 shrink-0 rounded-full p-1.5 hover:bg-white/15 transition-colors"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
