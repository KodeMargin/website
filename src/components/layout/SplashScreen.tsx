"use client"

import Image from "next/image"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { useEffect, useState } from "react"

const DISPLAY_TIME = 5000

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = window.setTimeout(() => setIsVisible(false), DISPLAY_TIME)
        return () => window.clearTimeout(timer)
    }, [])

    return (
        <MotionConfig reducedMotion="user">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        role="status"
                        aria-label="Loading KodeMargin"
                        initial={false}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#fbf8fa]"
                    >
                        <Image
                            src="/loading.gif"
                            alt=""
                            width={1080}
                            height={1920}
                            priority
                            unoptimized
                            className="h-[80%] w-[80%] object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig>
    )
}
