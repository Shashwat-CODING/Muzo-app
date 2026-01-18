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
            <div className="w-full max-w-4xl bg-secondary/70 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-full shadow-2xl shadow-black/5 supports-[backdrop-filter]:bg-secondary/50 transition-all duration-300 hover:bg-secondary/80">
                <div className="flex h-14 items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Muzo
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full opacity-50"></span>
                            </Link>
                        ))}
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-foreground/5 transition-colors" asChild>
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
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full h-auto rounded-b-[2rem] border-b border-border/50 pt-16 pb-12 bg-background/95 backdrop-blur-3xl">
                                <div className="flex flex-col items-center gap-6">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-2xl font-medium tracking-tight hover:text-primary transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <div className="h-px w-24 bg-border/50 my-2" />
                                    <Link
                                        href="https://github.com/Shashwat-CODING/Muzo"
                                        target="_blank"
                                        className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
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
