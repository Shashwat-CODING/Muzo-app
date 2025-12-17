"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center pt-24 pb-12 text-center overflow-hidden">
            {/* Clean Background - minimal grid or just plain */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container px-4 flex flex-col items-center"
            >
                <div className="mb-8 p-4 rounded-3xl bg-secondary/30 backdrop-blur-sm border border-border/50 shadow-sm">
                    <img
                        src="https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/assets/logo.png"
                        alt="Muzo Logo"
                        className="h-24 w-24 object-contain"
                    />
                </div>

                <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground mb-6">
                    Premium Music Client <br className="hidden sm:block" />
                    <span className="text-muted-foreground">Privacy Focused. Ad-Free.</span>
                </h1>

                <p className="max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
                    Muzo is a powerful YouTube Music client built for speed and privacy.
                    Experience background playback, synchronized lyrics, and offline support without the clutter.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold" asChild>
                        <Link href="#download">
                            <Download className="mr-2 h-5 w-5" />
                            Download app
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base" asChild>
                        <Link href="#features">
                            Learn More
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </section>
    )
}
