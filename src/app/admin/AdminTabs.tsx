"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const tabs = [
    { href: "/admin/email", label: "Compose" },
    { href: "/admin/sent", label: "Sent Emails" },
]

export function AdminTabs() {
    const pathname = usePathname()

    return (
        <nav aria-label="Email management" className="mb-8 flex gap-1 border-b border-border/60 pb-3">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href

                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative z-0 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                            isActive ? "text-primary" : "text-text-muted hover:text-primary"
                        }`}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="admin-active-tab"
                                className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                                transition={{ type: "spring", stiffness: 450, damping: 38 }}
                            />
                        )}
                        {tab.label}
                    </Link>
                )
            })}
        </nav>
    )
}
