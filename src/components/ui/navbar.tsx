"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Profile", href: "/profile" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                    <span className="text-lg font-bold tracking-tight text-white">
                        Better<span className="text-indigo-400">Next</span>
                    </span>
                </Link>
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                                    isActive ? "text-white" : "text-zinc-400"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 -z-10 rounded-full bg-white/10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-4">
                    {/* Placeholder for auth/theme toggle if needed */}
                    <div className="h-8 w-8 rounded-full bg-zinc-800/50" />
                </div>
            </div>
        </header>
    );
}
