
import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    subtitle?: string
    align?: "left" | "center" | "right"
}

export function SectionHeader({
    title,
    subtitle,
    align = "left",
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col mb-10 gap-2",
                {
                    "items-start text-left": align === "left",
                    "items-center text-center": align === "center",
                    "items-end text-right": align === "right",
                },
                className
            )}
            {...props}
        >
            <h2 className="text-3xl font-bold text-primary font-display md:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className="max-w-[42rem] leading-normal text-text-muted sm:text-xl sm:leading-8">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
