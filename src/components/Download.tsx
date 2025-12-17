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
        <section id="download" className="py-24 relative overflow-hidden bg-secondary/20">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Get Muzo
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Experience the future of music streaming. Download the latest version for Android.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {latestRelease ? (
                        <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">

                            <div className="p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Release Info */}
                                    <div className="flex-1 w-full space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                    <Package className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{latestRelease.name || latestRelease.tag_name}</h3>
                                                    <p className="text-sm text-muted-foreground font-mono">
                                                        {latestRelease.tag_name} • {new Date(latestRelease.published_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="prose prose-sm dark:prose-invert max-w-none max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            <ReleaseCard body={latestRelease.body} />
                                        </div>

                                        {/* Assets / Actions */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border mt-6">
                                            {latestRelease.assets.map(asset => (
                                                <Button key={asset.name} size="lg" className="rounded-full h-12 text-base shadow-sm" asChild>
                                                    <Link href={asset.browser_download_url}>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download APK
                                                        <span className="ml-2 text-xs opacity-80 font-normal">
                                                            ({(asset.size / 1024 / 1024).toFixed(1)} MB)
                                                        </span>
                                                    </Link>
                                                </Button>
                                            ))}

                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="outline" size="lg" className="rounded-full h-12 text-base hover:bg-secondary">
                                                        <History className="mr-2 h-4 w-4" />
                                                        Old Versions
                                                    </Button>
                                                </SheetTrigger>
                                                <SheetContent className="w-full sm:max-w-md">
                                                    <SheetHeader className="mb-6">
                                                        <SheetTitle>Version History</SheetTitle>
                                                        <SheetDescription>
                                                            Previous releases of Muzo.
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <ScrollArea className="h-[calc(100vh-120px)] pr-4">
                                                        <div className="space-y-4">
                                                            {allReleases.map((release) => (
                                                                <div key={release.tag_name} className="p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <h4 className="font-semibold">{release.tag_name}</h4>
                                                                        <span className="text-xs text-muted-foreground">{new Date(release.published_at).toLocaleDateString()}</span>
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        {release.assets.map(asset => (
                                                                            <Button key={asset.name} variant="secondary" size="sm" className="w-full justify-start h-8 text-xs" asChild>
                                                                                <Link href={asset.browser_download_url}>
                                                                                    <Download className="mr-2 h-3 w-3" />
                                                                                    {asset.name}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-card rounded-3xl border border-border">
                            <p className="text-muted-foreground">Unable to fetch release information at this time.</p>
                            <Button variant="link" asChild className="mt-4">
                                <Link href="https://github.com/Shashwat-CODING/Muzo/releases">
                                    Check GitHub Releases
                                </Link>
                            </Button>
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                            <Link href="https://github.com/Shashwat-CODING/Muzo" target="_blank">
                                <Github className="mr-2 h-4 w-4" />
                                View Source Code on GitHub
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
