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
        title: "Lofi Mode",
        description: "Instantly transform any track into a Lofi vibe with slowed speed (0.9x), pitch correction, and native reverb effects.",
        icon: Music2,
        color: "text-purple-400",
    },
    {
        title: "Synced Lyrics",
        description: "Sing along with real-time synchronized lyrics that auto-scroll with the music.",
        icon: Mic2,
        color: "text-pink-400",
    },
    {
        title: "Ad-Free Streaming",
        description: "Enjoy music without interruptions or ads. Pure listening bliss.",
        icon: Ban,
        color: "text-red-400",
    },
    {
        title: "Background Playback",
        description: "Keep the music playing while using other apps or when your screen is off.",
        icon: Waves,
        color: "text-blue-400",
    },
    {
        title: "Offline Downloads",
        description: "Download songs and videos for offline listening anywhere, anytime.",
        icon: Download,
        color: "text-green-400",
    },
    {
        title: "Privacy Focused",
        description: "No login required. All your data (favorites, playlists) stored locally on your device.",
        icon: Shield,
        color: "text-emerald-400",
    },
    {
        title: "Dynamic Theming",
        description: "The UI automatically adapts its colors to match the currently playing album art.",
        icon: Palette,
        color: "text-cyan-400",
    },
    {
        title: "Lite Mode",
        description: "Optimize performance on lower-end devices by disabling blur effects and complex animations.",
        icon: Smartphone,
        color: "text-orange-400",
    },
    {
        title: "Smart Library",
        description: "Organize your music with Favorites, History, custom Playlists, and Auto-Queue.",
        icon: Zap,
        color: "text-yellow-400",
    },
    {
        title: "Native Audio Effects",
        description: "Leverages platform-specific audio effects for a rich, high-quality sound experience.",
        icon: Music2,
        color: "text-indigo-400",
    },
    {
        title: "Share to Play",
        description: "Share links directly from YouTube or YouTube Music to Muzo to play them instantly.",
        icon: Share2,
        color: "text-teal-400",
    },
    {
        title: "Smart Search",
        description: "Quickly find songs, artists, albums, and playlists with RapidAPI fallback.",
        icon: Search,
        color: "text-fuchsia-400",
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6 text-foreground">
                        Packed with Features
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Everything you need for the ultimate music experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl border border-border/50 bg-card hover:border-border transition-colors group"
                        >
                            <div className={`mb-4 p-3 rounded-xl bg-secondary w-fit text-foreground group-hover:scale-105 transition-transform`}>
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
