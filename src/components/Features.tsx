"use client"

import { motion } from "framer-motion"
import {
    Music2,
    Mic2,
    Waves,
    Download,
    Shield,
    Zap,
    Layout,
    Search,
    Palette,
    Smartphone,
    Share2,
    Ban
} from "lucide-react"

const features = [
    {
        title: "Immersive Audio",
        description: "Synced lyrics, Lofi Mode, and native platform effects for a rich sound experience.",
        icon: Music2,
        color: "text-purple-400",
    },
    {
        title: "Ad-Free & Privacy",
        description: "No ads, no login required. All data stored locally with zero tracking.",
        icon: Shield,
        color: "text-emerald-400",
    },
    {
        title: "Background Playback",
        description: "Seamless listening while using other apps or when your screen is off.",
        icon: Waves,
        color: "text-blue-400",
    },
    {
        title: "Offline Mode",
        description: "Download songs and videos to listen anywhere, anytime without internet.",
        icon: Download,
        color: "text-green-400",
    },
    {
        title: "Smart Library",
        description: "Auto-Queue, Favorites, History, and custom Playlists organized your way.",
        icon: Zap,
        color: "text-yellow-400",
    },
    {
        title: "Multi-Language",
        description: "Automatically detects and switches between available audio languages.",
        icon: Mic2,
        color: "text-pink-400",
    },
    {
        title: "Channel Subscriptions",
        description: "Subscribe to artists and channels to stay updated with new releases.",
        icon: Share2,
        color: "text-teal-400",
    },
    {
        title: "Dynamic Theming",
        description: "UI adapts colors to match the album art. Includes Unified Dark Theme.",
        icon: Palette,
        color: "text-cyan-400",
    },
    {
        title: "Modern UI/UX",
        description: "Glassmorphism, fluid animations, and a blurred album art background.",
        icon: Layout,
        color: "text-indigo-400",
    },
]

export function Features() {
    return (
        <section id="features" className="py-32 bg-background relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />

            <div className="container px-4 mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
                        Packed with Power
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Every feature you need for the ultimate music experience, refined.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group p-8 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className={`mb-6 p-4 rounded-2xl bg-secondary/50 w-fit text-foreground group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-[15px]">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
