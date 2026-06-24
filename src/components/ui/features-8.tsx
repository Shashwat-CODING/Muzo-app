import { WifiOff, CircleUser, Server, ShieldCheck, Music2, RefreshCcw } from 'lucide-react'

// Shared feature icon wrapper
const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
    {children}
  </div>
);

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      {/* Section header */}
      <div className="text-center space-y-3 mb-14">
        <span className="section-label">Premium Capabilities</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Everything you need to listen.</h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Experience music the way it was meant to be. No interruptions, perfect synchronization, and total privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        {/* ── Top Banner: Ad-Free ─────────────────────────────────────── */}
        <div className="col-span-1 md:col-span-6 glass-card overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <IconBox><ShieldCheck className="w-5 h-5" /></IconBox>
              <h3 className="text-2xl font-bold text-white mt-4">100% Ad-Free Experience</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                Say goodbye to disruptive audio ads, intrusive banners, and popups. Muzo strips all advertisements natively, providing a clean, uninterrupted listening session from start to finish.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-36 bg-[#0d0d0f] rounded-2xl border border-white/[0.06] shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-5xl font-black text-white/20 tracking-tight select-none">0 Ads</div>
                <div className="absolute inset-0 bg-orange-500/[0.04]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Background Playback ─────────────────────────────────────── */}
        <div className="col-span-1 md:col-span-3 glass-card p-8 flex flex-col gap-auto">
          <IconBox><Music2 className="w-5 h-5" /></IconBox>
          <div className="mt-auto pt-8 space-y-2">
            <h3 className="text-xl font-bold text-white">Background Playback</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Enjoy uninterrupted background audio streaming with flawless system media control drawer integration.
            </p>
          </div>
        </div>

        {/* ── Encrypted Sync ──────────────────────────────────────────── */}
        <div className="col-span-1 md:col-span-3 glass-card p-8 flex flex-col">
          <IconBox><Server className="w-5 h-5" /></IconBox>
          <div className="mt-auto pt-8 space-y-2">
            <h3 className="text-xl font-bold text-white">Encrypted Cloud Sync</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Log in to securely store your settings, custom playlists, and music history on the server. Never lose your data again.
            </p>
          </div>
        </div>

        {/* ── Guest Mode ──────────────────────────────────────────────── */}
        <div className="col-span-1 md:col-span-2 glass-card p-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
            <CircleUser className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="mt-auto pt-8 space-y-2">
            <h3 className="text-lg font-bold text-white">Guest Mode</h3>
            <p className="text-zinc-400 text-sm">Stream immediately without requiring any login or registration.</p>
          </div>
        </div>

        {/* ── Offline Playback ────────────────────────────────────────── */}
        <div className="col-span-1 md:col-span-4 glass-card p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/[0.06] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="flex-1 space-y-4 relative z-10">
            <IconBox><WifiOff className="w-5 h-5" /></IconBox>
            <h3 className="text-xl font-bold text-white mt-4">Offline Playback</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Cache streams and download your favorite songs locally. Enjoy your entire library even when you're completely off the grid.
            </p>
          </div>

          {/* Mini download widget */}
          <div className="flex-1 w-full bg-[#0d0d0f] border border-white/[0.06] rounded-2xl p-4 space-y-2.5 relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Downloads</span>
              <RefreshCcw className="w-3 h-3 text-zinc-600" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <Music2 className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="flex-1">
                  <div className="h-1.5 w-20 bg-white/15 rounded-full mb-1.5" />
                  <div className="h-1.5 w-14 bg-white/8 rounded-full" />
                </div>
                {i === 1
                  ? <div className="w-3.5 h-3.5 rounded-full border border-orange-500/60 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /></div>
                  : <div className="w-3.5 h-3.5 rounded-full border border-white/10" />
                }
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
