import { Card, CardContent } from '@/components/ui/card'
import { WifiOff, CircleUser, Server, ShieldCheck, Music2, RefreshCcw } from 'lucide-react'

export function Features() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background glowing gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-500/5 blur-3xl -z-10 rounded-full" />
            
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-xs font-semibold tracking-tight text-orange-400 uppercase">Premium Capabilities</span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Everything you need to listen.</h2>
                    <p className="text-zinc-400 max-w-xl mx-auto">Experience music the way it was meant to be. No interruptions, perfect synchronization, and total privacy.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {/* Top Full Width Card */}
                    <Card className="col-span-1 md:col-span-6 bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-300 shadow-2xl shadow-black/40 rounded-3xl">
                        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 text-orange-400 mb-2 border border-orange-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                    <ShieldCheck className="size-6" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">100% Ad-Free Experience</h2>
                                <p className="text-zinc-400 text-sm leading-relaxed">Say goodbye to disruptive audio ads, intrusive banners, and popups. Muzo strips all advertisements natively, providing a clean, uninterrupted listening session from start to finish.</p>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="relative w-64 h-40 bg-zinc-900 rounded-2xl border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                    <div className="text-6xl font-bold text-zinc-300">
                                        0 Ads
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Middle Left Card */}
                    <Card className="col-span-1 md:col-span-3 bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-300 shadow-2xl shadow-black/40 rounded-3xl group">
                        <CardContent className="p-8 flex flex-col h-full">
                            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 text-orange-400 mb-6 border border-orange-500/20 w-fit">
                                <Music2 className="size-6" />
                            </div>
                            <div className="space-y-2 mt-auto">
                                <h2 className="text-xl font-semibold text-white">Background Playback</h2>
                                <p className="text-zinc-400 text-sm leading-relaxed">Enjoy uninterrupted background audio streaming with flawless system media control drawer integration.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Middle Right Card */}
                    <Card className="col-span-1 md:col-span-3 bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-300 shadow-2xl shadow-black/40 rounded-3xl group">
                        <CardContent className="p-8 flex flex-col h-full">
                            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 text-orange-400 mb-6 border border-orange-500/20 w-fit shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                <Server className="size-6" />
                            </div>
                            <div className="space-y-2 mt-auto">
                                <h2 className="text-xl font-semibold text-white">Encrypted Cloud Sync</h2>
                                <p className="text-zinc-400 text-sm leading-relaxed">Log in to securely store your settings, custom playlists, and music history on the server. Never lose your data again.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Left Card */}
                    <Card className="col-span-1 md:col-span-2 bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-300 shadow-2xl shadow-black/40 rounded-3xl">
                        <CardContent className="p-8 flex flex-col items-center text-center h-full">
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-zinc-800 text-zinc-300 mb-6 border border-white/5">
                                <CircleUser className="size-8" strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2 mt-auto">
                                <h2 className="text-lg font-semibold text-white">Guest Mode</h2>
                                <p className="text-zinc-400 text-sm">Stream immediately without requiring any login or registration.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Right Card */}
                    <Card className="col-span-1 md:col-span-4 bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-300 shadow-2xl shadow-black/40 rounded-3xl relative">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-8 h-full relative z-10">
                            <div className="flex-1 space-y-4">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 text-orange-400 mb-2 border border-orange-500/20">
                                    <WifiOff className="size-6" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">Offline Playback</h2>
                                <p className="text-zinc-400 text-sm leading-relaxed">Cache streams and download your favorite songs locally. Enjoy your entire library even when you're completely off the grid or traveling.</p>
                            </div>
                            
                            <div className="flex-1 w-full bg-zinc-950/50 border border-white/5 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-300">Downloads</span>
                                    <RefreshCcw className="size-3 text-zinc-500 animate-spin-slow" />
                                </div>
                                
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <Music2 className="size-4 text-zinc-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-2 w-24 bg-white/20 rounded-full mb-1.5" />
                                            <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                                        </div>
                                        {i === 1 ? (
                                            <div className="size-4 rounded-full border border-orange-500/50 flex items-center justify-center">
                                                <div className="size-2 rounded-full bg-orange-500" />
                                            </div>
                                        ) : (
                                            <div className="size-4 rounded-full border border-white/10" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
