"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_KEY = "km_splash_shown";

export function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only show once per session
        const alreadyShown = sessionStorage.getItem(SPLASH_KEY);
        if (alreadyShown) {
            setIsLoading(false);
            return;
        }

        const minDisplayTime = 2500; // 2.5 seconds
        const startTime = Date.now();

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
                sessionStorage.setItem(SPLASH_KEY, "1");
                setIsLoading(false);
            }, remainingTime);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            const fallbackTimeout = setTimeout(handleLoad, 5000);

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
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
                >
                    {/* Background dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.35]"
                        style={{
                            backgroundImage: `radial-gradient(circle, #c7cade 1px, transparent 1px)`,
                            backgroundSize: "28px 28px",
                        }}
                    />

                    {/* Glow orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[100px]" />

                    {/* Logo lockup */}
                    <div className="relative flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Ring pulse */}
                            <motion.div
                                animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-2xl bg-primary/20"
                            />
                            <div className="relative h-20 w-20 rounded-2xl border border-border/40 bg-white shadow-xl flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/KodeMargin.png"
                                    alt="KodeMargin"
                                    className="h-16 w-16 rounded-xl"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-2xl font-bold tracking-tight font-display text-primary">
                                Kode<span className="text-accent">Margin</span>
                            </span>

                            {/* Progress bar */}
                            <div className="mt-3 w-32 h-0.5 rounded-full bg-border overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.2, ease: "easeInOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
