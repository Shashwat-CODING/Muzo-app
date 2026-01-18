import { getLatestRelease, getReleases } from "@/lib/github"
import { Button } from "@/components/ui/button"
import { Download, Github, Package, History, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ReleaseCard } from "./ReleaseCard"

export async function DownloadSection() {
    const latestRelease = await getLatestRelease()
    const allReleases = await getReleases()

    return (
        <section id="download" className="py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Ready to Listen?
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
                            Join thousands of users enjoying ad-free music today.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                        {latestRelease ? (
                            <>
                                {latestRelease.assets.map(asset => (
                                    <Button key={asset.name} size="lg" className="rounded-full h-14 px-8 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold" asChild>
                                        <Link href={asset.browser_download_url}>
                                            <Download className="mr-3 h-5 w-5" />
                                            Download APK
                                            <span className="ml-2 text-sm opacity-60 font-normal">
                                                v{latestRelease.tag_name}
                                            </span>
                                        </Link>
                                    </Button>
                                ))}
                            </>
                        ) : (
                            <Button size="lg" className="rounded-full h-14 px-8 text-lg" disabled>
                                Loading...
                            </Button>
                        )}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-2 hover:bg-secondary/50">
                                    <History className="mr-3 h-5 w-5" />
                                    Versions
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-md">
                                <SheetHeader className="mb-6 text-left">
                                    <SheetTitle className="text-2xl">Version History</SheetTitle>
                                    <SheetDescription>
                                        Manage your Muzo installation with previous releases.
                                    </SheetDescription>
                                </SheetHeader>
                                <ScrollArea className="h-[calc(100vh-120px)] pr-4">
                                    <div className="space-y-3">
                                        {allReleases.map((release) => (
                                            <div key={release.tag_name} className="group p-4 rounded-xl border border-border/50 bg-secondary/10 hover:bg-secondary/30 transition-all">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <h4 className="font-semibold text-lg">{release.tag_name}</h4>
                                                        <p className="text-xs text-muted-foreground">{new Date(release.published_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    {release.assets.map(asset => (
                                                        <Button key={asset.name} variant="secondary" size="sm" className="w-full justify-between h-10 bg-background/50 hover:bg-background group-hover:shadow-sm" asChild>
                                                            <Link href={asset.browser_download_url}>
                                                                <span className="flex items-center">
                                                                    <Download className="mr-2 h-3.5 w-3.5" />
                                                                    Download
                                                                </span>
                                                                <span className="text-xs text-muted-foreground">
                                                                    {(asset.size / 1024 / 1024).toFixed(1)} MB
                                                                </span>
                                                            </Link>
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="pt-8">
                        <Button variant="link" className="text-muted-foreground hover:text-foreground transition-colors" asChild>
                            <Link href="https://github.com/Shashwat-CODING/Muzo" target="_blank">
                                <Github className="mr-2 h-4 w-4" />
                                View Source on GitHub
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        </section>
    )
}
