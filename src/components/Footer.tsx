import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-background/60 backdrop-blur-xl py-8">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {new Date().getFullYear()} Muzo. Built with ❤️ by Shashwat.
                </p>
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/Shashwat-CODING/Muzo"
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
