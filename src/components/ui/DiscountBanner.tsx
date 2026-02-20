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
                    <div className="relative flex items-center justify-between gap-3 bg-gradient-to-r from-accent via-red-600 to-accent px-4 py-2.5 text-white sm:px-6">
                        {/* Animated shimmer overlay */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                            />
                        </div>

                        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm font-medium">
                            <span className="flex items-center gap-1.5">
                                <Zap className="h-3.5 w-3.5 fill-current shrink-0" />
                                <span className="font-bold">Startup Launch Offer</span>
                            </span>
                            <span className="hidden sm:inline text-white/70">—</span>
                            <span>
                                <span className="font-bold text-yellow-200">10% OFF</span>{" "}
                                for the first {DISCOUNT_SPOTS_LEFT} clients.{" "}
                                <span className="text-white/80">Limited spots available.</span>
                            </span>
                            <Link
                                href="/packages"
                                onClick={dismiss}
                                className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors whitespace-nowrap"
                            >
                                View Packages <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>

                        <button
                            onClick={dismiss}
                            aria-label="Dismiss banner"
                            className="ml-2 shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
