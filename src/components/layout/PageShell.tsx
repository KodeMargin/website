"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { DiscountBanner } from "@/components/ui/DiscountBanner"

export function PageShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <>
            <DiscountBanner />
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{
                        duration: 0.5,
                        ease: [0, 1, 0, 1]
                    }}
                    className="min-h-full w-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    )
}
