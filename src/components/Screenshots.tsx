"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

// Using raw GitHub URLs for screenshots as requested
const screenshots = [
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/1.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/2.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/3.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/4.jpg",
    "https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/5.jpg",
]

export function Screenshots() {
    return (
        <section id="screenshots" className="py-24 bg-background overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-6 text-foreground">
                        Stunning Interface
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Clean, modern, and built for immersion.
                    </p>
                </div>

                <div className="flex justify-center px-4 md:px-0">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-5xl"
                    >
                        <CarouselContent className="-ml-4">
                            {screenshots.map((src, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                    <div className="p-1">
                                        <Card className="border-0 bg-transparent shadow-none">
                                            <CardContent className="flex aspect-[9/19] items-center justify-center p-0 overflow-hidden rounded-[2rem] border border-border/50 shadow-xl relative bg-secondary/20">
                                                <img
                                                    src={src}
                                                    alt={`Screenshot ${index + 1}`}
                                                    className="w-full h-full object-cover z-10"
                                                    loading="lazy"
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
