"use client"

import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { usePathname } from "next/navigation"
import { DiscountBanner } from "@/components/ui/DiscountBanner"
import { motionEase } from "@/lib/motion"

export function PageShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <>
            <DiscountBanner />
            <div className="site-canvas relative isolate min-h-screen overflow-hidden">
                <MotionConfig reducedMotion="user">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                y: -3,
                                transition: { duration: 0.16, ease: "easeIn" },
                            }}
                            transition={{ duration: 0.26, ease: motionEase }}
                            className="relative z-10 min-h-full w-full will-change-transform"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </MotionConfig>
            </div>
        </>
    )
}
