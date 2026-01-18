"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Using raw GitHub URLs for screenshots as requested
const screenshots = [
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/1.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/2.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/3.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/4.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/5.jpg",
]

export function Screenshots() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [dragging, setDragging] = useState(false)

    // Auto-play
    useEffect(() => {
        if (dragging) return
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % screenshots.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [dragging])

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setDragging(false)
        if (info.offset.x > 50) {
            setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
        } else if (info.offset.x < -50) {
            setActiveIndex((prev) => (prev + 1) % screenshots.length)
        }
    }

    const getImageStyle = (index: number) => {
        const diff = (index - activeIndex + screenshots.length) % screenshots.length
        // Handle wrap-around logic for "nearest neighbor" calculation
        const distance = diff > screenshots.length / 2 ? diff - screenshots.length : diff

        let x = 0
        let scale = 1
        let blur = 0
        let opacity = 1
        let zIndex = 10
        let rotateY = 0

        if (distance === 0) {
            // Center
            x = 0
            scale = 1
            blur = 0
            opacity = 1
            zIndex = 50
            rotateY = 0
        } else if (Math.abs(distance) === 1) {
            // Immediate neighbors
            x = distance * 180 // desktop spacing
            scale = 0.85
            blur = 2
            opacity = 0.7
            zIndex = 40
            rotateY = distance * -15
        } else if (Math.abs(distance) === 2) {
            // Farther out
            x = distance * 150
            scale = 0.7
            blur = 4
            opacity = 0.4
            zIndex = 30
            rotateY = distance * -25
        } else {
            // Hidden
            x = distance * 100
            scale = 0.5
            blur = 8
            opacity = 0
            zIndex = 10
        }

        return { x, scale, blur, opacity, zIndex, rotateY }
    }

    return (
        <section id="screenshots" className="py-24 bg-background overflow-hidden relative">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6 text-foreground">
                        Stunning Interface
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A visual masterpiece, crafted for immersion.
                    </p>
                </div>

                <div className="relative h-[600px] w-full flex items-center justify-center perspective-[1000px]">
                    <div className="relative w-full max-w-[300px] md:max-w-[340px] aspect-[9/19]">
                        <AnimatePresence>
                            {screenshots.map((src, index) => {
                                // We calculate style for ALL images, but only the current active window (e.g. -2 to +2) is really visible/relevant.
                                // However, for correct wrap-around animations, we need to map them properly.
                                // Simplification: Just render them all with calculated styles.

                                const style = getImageStyle(index)

                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute top-0 left-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-white/10"
                                        initial={false}
                                        animate={{
                                            x: style.x,
                                            scale: style.scale,
                                            opacity: style.opacity,
                                            zIndex: style.zIndex,
                                            rotateY: style.rotateY,
                                            filter: `blur(${style.blur}px)`,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 25
                                        }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragStart={() => setDragging(true)}
                                        onDragEnd={onDragEnd}
                                        style={{
                                            cursor: "grab",
                                            // Mobile optimization for spacing - safe check
                                            x: typeof window !== 'undefined' && window.outerWidth < 768 && Math.abs(style.x) > 0 ? style.x * 0.6 : style.x
                                        }}
                                    >
                                        <img
                                            src={src}
                                            alt={`Screenshot ${index + 1}`}
                                            className="w-full h-full object-cover pointer-events-none"
                                        />
                                        {/* Reflection effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 flex gap-3 z-50">
                        {screenshots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex
                                    ? "bg-primary w-8"
                                    : "bg-muted-foreground/30 hover:bg-primary/50"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Background glow for ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </section>
    )
}
