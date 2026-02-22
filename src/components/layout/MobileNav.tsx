"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Layers, Briefcase, Mail, Tag, User } from "lucide-react"

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Services", href: "/services", icon: Layers },
    { name: "Packages", href: "/packages", icon: Tag },
    { name: "Work", href: "/portfolio", icon: Briefcase },
    { name: "Contact", href: "/contact", icon: Mail },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 lg:hidden">
            <nav className="flex items-center gap-1 rounded-full border border-white/20 bg-primary/90 p-2 shadow-xl shadow-primary/20 backdrop-blur-lg">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex h-12 w-12 items-center justify-center rounded-full transition-all",
                                isActive
                                    ? "bg-accent text-white shadow-lg shadow-accent/25"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="sr-only">{item.name}</span>
                        </Link>
                    )
                })}


            </nav>
        </div>
    )
}
