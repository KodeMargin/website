"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const minDisplayTime = 4000; // Minimum 3 seconds to let the GIF play
        const startTime = Date.now();

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            // Fallback timeout in case 'load' never fires or takes too long
            const fallbackTimeout = setTimeout(handleLoad, 6000);

            return () => {
                window.removeEventListener("load", handleLoad);
                clearTimeout(fallbackTimeout);
            };
        }
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-surface"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/loading.gif"
                        alt="Loading KodeMargin..."
                        className="max-w-[100px] md:max-w-[120px] h-auto object-contain opacity-90"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
