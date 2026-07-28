export const motionEase = [0.16, 1, 0.3, 1] as const

export const viewportConfig = {
    once: true,
    margin: "-40px 0px",
} as const

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.055,
            delayChildren: 0.03,
        },
    },
}

export const itemVariant = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.38, ease: motionEase },
    },
}

export const staggerTransition = (index: number) => ({
    duration: 0.38,
    delay: Math.min(index * 0.055, 0.22),
    ease: motionEase,
})
