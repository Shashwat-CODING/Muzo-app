"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center pt-32 pb-16 text-center overflow-hidden">
            {/* Clean Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container px-4 flex flex-col items-center max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-8 p-6 rounded-[2rem] bg-black border border-white/10 shadow-2xl shadow-primary/5 relative group cursor-default"
                >
                    <img
                        src="https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/assets/logo.png"
                        alt="Muzo Logo"
                        className="h-24 w-24 sm:h-32 sm:w-32 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground mb-6 leading-[0.9]">
                    Music <br className="sm:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/40">Redefined.</span>
                </h1>

                <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-medium">
                    The powerful, privacy-focused YouTube Music client. <br className="hidden sm:block" />
                    <span className="text-foreground">Ad-free. Background Playback. Native macOS Support.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-4 sm:px-0">
                    <Button size="lg" className="h-14 px-10 rounded-full text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300" asChild>
                        <Link href="#download">
                            <Download className="mr-2 h-5 w-5" />
                            Get Muzo
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-lg border-2 hover:bg-secondary/50 transition-all duration-300" asChild>
                        <Link href="https://deepwiki.com/Shashwat-CODING/Muzo/" target="_blank">
                            DeepWiki Docs
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </section>
    )
}
