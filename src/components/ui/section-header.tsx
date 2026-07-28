
import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    subtitle?: string
    align?: "left" | "center" | "right"
    accentLabel?: string
}

export function SectionHeader({
    title,
    subtitle,
    align = "left",
    accentLabel,
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col mb-10 gap-3",
                {
                    "items-start text-left": align === "left",
                    "items-center text-center": align === "center",
                    "items-end text-right": align === "right",
                },
                className
            )}
            {...props}
        >
            {accentLabel && (
                <div className={cn("flex items-center gap-3", {
                    "justify-start": align === "left",
                    "justify-center": align === "center",
                    "justify-end": align === "right",
                })}>
                    <div className="h-px w-8 bg-accent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                        {accentLabel}
                    </span>
                    {align === "center" && <div className="h-px w-8 bg-accent" />}
                </div>
            )}
            <h2 className="text-3xl font-bold text-primary font-display md:text-5xl leading-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="max-w-[42rem] leading-relaxed text-text-muted sm:text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
