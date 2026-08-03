"use client"

import { cn } from "@/lib/utils"
// import Link from "next/link" // Using local implementation or standard next/link
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Layers, Briefcase, Mail, Feather, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Feather },
    { name: "Services", href: "/services", icon: Layers },
    //{ name: "Packages", href: "/packages", icon: Tag },
    { name: "Portfolio", href: "/portfolio", icon: Briefcase },
    { name: "Contact", href: "/contact", icon: Mail },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden h-screen w-72 flex-col bg-white lg:flex sticky top-0 left-0 z-40 p-0">
            {/* Logo Section - White background */}
            <div className="bg-white p-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 flex items-center justify-center rounded-lg text-white border shadow-lg">
                        <img src="/KodeMargin.png" alt="Logo" className="h-12 w-12 rounded-lg" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight font-display text-primary">
                        Kode<span className="text-red-500">Margin</span>
                    </span>
                </div>
            </div>

            {/* Navigation & Footer - Dark background with rounded top right corner */}
            <div className="flex flex-1 flex-col justify-between p-4 xl:p-6 overflow-y-auto bg-primary rounded-tr-4xl scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Navigation */}
                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-xl px-4 py-2.5 xl:py-3 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute left-0 h-8 w-1 rounded-full bg-accent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ left: '-12px' }}
                                    />
                                )}
                                <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "text-accent")} />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer / CTA */}
                <div className="space-y-4 xl:space-y-6 mt-4 xl:mt-6 shrink-0">
                    <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                        <p className="mb-2 xl:mb-3 text-xs font-medium text-white/80">
                            Ready to scale your business?
                        </p>
                        <Button href="/contact" variant="accent" className="w-full shadow-lg shadow-red-900/20">
                            Book Consultation
                        </Button>
                    </div>

                    <div className="text-xs text-white/40">
                        © {new Date().getFullYear()} KodeMargin.
                    </div>
                </div>
            </div>
        </aside>
    )
}
