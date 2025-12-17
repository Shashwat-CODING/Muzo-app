"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    const navItems = [
        { name: "Features", href: "#features" },
        { name: "Screenshots", href: "#screenshots" },
        { name: "Download", href: "#download" },
    ]

    return (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-4xl bg-secondary/80 backdrop-blur-xl border border-border/50 rounded-full shadow-lg supports-[backdrop-filter]:bg-secondary/60">
                <div className="flex h-14 items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-lg font-bold tracking-tight">
                                Muzo
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="https://github.com/Shashwat-CODING/Muzo" target="_blank">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                    </nav>

                    {/* Mobile Nav */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-4 mt-8">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="https://github.com/Shashwat-CODING/Muzo"
                                        target="_blank"
                                        className="flex items-center gap-2 text-lg font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Github className="h-5 w-5" />
                                        GitHub
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
