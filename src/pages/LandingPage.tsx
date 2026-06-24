import { useState, useEffect } from "react";
import {
  Download, Github, Star, GitFork, AlertCircle, Copy, Check,
  Users, Heart, ExternalLink
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fetchRepoStats, fetchContributors, fetchReleases } from "@/lib/github";
import type { RepoStats, Contributor, Release } from "@/lib/github";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { MorphingText } from "@/components/ui/liquid-text";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";
import { marked } from "marked";
import TechStackTable from "@/components/TechStackTable";
import { Features } from "@/components/ui/features-8";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { cn } from "@/lib/utils";

// ─── Reusable Section Header ───────────────────────────────────────────────
function SectionHeader({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="text-center space-y-3 mb-14">
      <span className="section-label">{label}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
      {description && <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">{description}</p>}
    </div>
  );
}

// ─── Stats Card ────────────────────────────────────────────────────────────
function StatCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-6 text-center flex flex-col items-center justify-center gap-2">
      <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">{label}</span>
      <div className="text-2xl font-bold text-white flex items-center gap-1.5">{children}</div>
    </div>
  );
}

export default function LandingPage() {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<"run" | "build">("run");
  const [loading, setLoading] = useState(true);
  const [expandedRelease, setExpandedRelease] = useState<string | null>(null);
  const [showOlder, setShowOlder] = useState(false);
  const [showFullLatestChangelog, setShowFullLatestChangelog] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [repoData, contribData, releasesData] = await Promise.all([
          fetchRepoStats(), fetchContributors(), fetchReleases()
        ]);
        if (repoData) repoData.version = "v4.0.0";
        setStats(repoData);
        setContributors(contribData.slice(0, 8));
        setReleases(releasesData);
      } catch (err) {
        console.error("Failed to load repo data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const navLinks = [
    { label: 'FEATURES', href: '#features' },
    { label: 'DOWNLOADS', href: '#downloads' },
    { label: 'SCREENSHOTS', href: '#screenshots' },
    { label: 'TECH STACK', href: '#techstack' },
    { label: 'INSTALL', href: '#setup' },
  ];
  const socialLinks = [{ icon: Github, href: 'https://github.com/Shashwat-CODING/Muzo' }];
  const morphingTexts = [
    "AD-FREE STREAMING", "OFFLINE PLAYBACK", "WORD KARAOKE LYRICS",
    "GESTURE CONTROL", "SPOTIFY PLAYLIST IMPORT", "SLEEP TIMER SETTINGS", "PRIVACY FIRST"
  ];

  // ── Shared class tokens ──────────────────────────────────────────────────
  const SECTION = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 scroll-mt-16";
  const DIVIDER = "border-b border-white/[0.06]";

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#09090b] text-zinc-200 relative font-sans selection:bg-orange-500/20 selection:text-white">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <MinimalistHero
          logoText="MUZO"
          navLinks={navLinks}
          mainText="A powerful, privacy-focused YouTube Music client built with Flutter. Ad-free, offline cache, word-by-word karaoke lyrics, Spotify playlist imports, and a sleek gesture-driven UI."
          readMoreLink="#features"
          imageSrc="/hero1.png"
          imageAlt="Muzo app screenshot"
          overlayText={{ part1: 'less is', part2: 'more.' }}
          socialLinks={socialLinks}
          locationText={`VERSION ${stats?.version || 'v4.0.0'}`}
        />

        {/* ── MARQUEE TICKER ────────────────────────────────────────────── */}
        <section className={`py-5 border-y border-white/[0.06] bg-white/[0.02] backdrop-blur-md`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <MorphingText texts={morphingTexts} className="text-white" />
          </div>
        </section>

        {/* ── LIVE STATS ────────────────────────────────────────────────── */}
        {stats && (
          <section className={`${SECTION} ${DIVIDER} pb-16 md:pb-20`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatCard label="GitHub Stars">
                <Star className="w-5 h-5 text-orange-400" /> {stats.stars}
              </StatCard>
              <StatCard label="Repository Forks">
                <GitFork className="w-5 h-5 text-orange-400" /> {stats.forks}
              </StatCard>
              <StatCard label="Latest Version">
                <span className="text-orange-400 text-lg font-mono">{stats.version}</span>
              </StatCard>
              <div className="glass-card p-6 text-center flex flex-col items-center justify-center gap-3">
                <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Release APK</span>
                <a href={stats.downloadUrl} className="btn-primary w-full">
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ── DOWNLOADS & RELEASES ──────────────────────────────────────── */}
        <section id="downloads" className={`${SECTION} ${DIVIDER}`}>
          <SectionHeader
            label="GitHub Releases"
            title="Downloads & Changelog"
            description="Download the latest stable APK and explore the newest features, bug fixes, and performance improvements."
          />

          <div className="space-y-4">
            {/* Latest release */}
            {releases.length > 0 && (() => {
              const latest = releases[0];
              return (
                <div className="glass-card overflow-hidden">
                  <div className="flex flex-col lg:flex-row gap-0">
                    {/* Left: meta + assets */}
                    <div className="p-6 md:p-8 space-y-5 lg:w-80 xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="badge-orange">{latest.tagName} — Latest</span>
                          <span className="text-xs text-zinc-500">
                            {new Date(latest.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight mt-2">{latest.name}</h3>
                      </div>

                      <div className="space-y-2.5">
                        <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Assets</p>
                        {latest.assets.map((asset) => (
                          <div key={asset.name} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-zinc-200 truncate">{asset.name}</p>
                              <p className="text-[10px] text-zinc-500 mt-0.5">
                                {asset.download_count.toLocaleString()} downloads
                                {asset.size ? ` · ${(asset.size / 1024 / 1024).toFixed(1)} MB` : ''}
                              </p>
                            </div>
                            <a href={asset.browser_download_url} className="btn-secondary shrink-0 w-full sm:w-auto">
                              <Download className="w-3.5 h-3.5" /> Download
                            </a>
                          </div>
                        ))}
                        <a href={latest.htmlUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mt-1 font-medium">
                          <Github className="w-3.5 h-3.5" /> View on GitHub
                        </a>
                      </div>
                    </div>

                    {/* Right: changelog */}
                    <div className="flex-1 p-6 md:p-8">
                      <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-4">Changelog</p>
                      <div className={`relative ${!showFullLatestChangelog ? 'max-h-72 overflow-hidden' : ''}`}>
                        <div
                          className="prose prose-sm prose-invert max-w-none text-sm text-zinc-400 leading-relaxed
                          [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-base [&_h1]:mt-5 [&_h1]:mb-2
                          [&_h2]:text-white [&_h2]:font-semibold [&_h2]:text-sm [&_h2]:mt-4 [&_h2]:mb-1.5
                          [&_h3]:text-zinc-200 [&_h3]:font-medium [&_h3]:text-sm [&_h3]:mt-3 [&_h3]:mb-1
                          [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_ul]:my-2
                          [&_li]:text-zinc-400 [&_li]:text-sm
                          [&_strong]:text-zinc-200 [&_a]:text-orange-400 [&_a]:no-underline hover:[&_a]:underline"
                          dangerouslySetInnerHTML={{ __html: marked.parse(latest.body) }}
                        />
                        {!showFullLatestChangelog && (
                          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0f] to-transparent pointer-events-none" />
                        )}
                      </div>
                      <button
                        onClick={() => setShowFullLatestChangelog(!showFullLatestChangelog)}
                        className="glass-pill btn-ghost mt-4 px-4 py-2 text-xs font-bold"
                      >
                        {showFullLatestChangelog ? "Show Less ↑" : "Read Full Changelog ↓"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Older releases toggle */}
            {releases.slice(1).length > 0 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowOlder(!showOlder)}
                  className="glass-pill btn-ghost px-6 py-2.5 text-xs font-semibold"
                >
                  {showOlder ? "Hide Previous Releases ↑" : `Show ${releases.slice(1).length} Older Releases ↓`}
                </button>

                {showOlder && (
                  <div className="space-y-3 mt-4 text-left animate-fade-in">
                    {releases.slice(1).map((release) => {
                      const isExpanded = expandedRelease === release.tagName;
                      return (
                        <div key={release.tagName} className="glass-card overflow-hidden">
                          <button
                            onClick={() => setExpandedRelease(isExpanded ? null : release.tagName)}
                            className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="badge-neutral">{release.tagName}</span>
                              <span className="text-sm font-semibold text-zinc-200">{release.name}</span>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              <span className="text-xs text-zinc-500 hidden sm:inline">
                                {new Date(release.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                              <span className="text-[10px] font-bold text-orange-400">
                                {isExpanded ? "Collapse ↑" : "Expand ↓"}
                              </span>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="p-5 border-t border-white/[0.06] grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                              <div className="space-y-3">
                                <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Assets</p>
                                {release.assets.map((asset) => (
                                  <div key={asset.name} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-zinc-200 truncate">{asset.name}</p>
                                      <p className="text-[10px] text-zinc-500 mt-0.5">{asset.download_count.toLocaleString()} downloads{asset.size ? ` · ${(asset.size / 1024 / 1024).toFixed(1)} MB` : ''}</p>
                                    </div>
                                    <a href={asset.browser_download_url} className="btn-secondary shrink-0 w-full sm:w-auto">
                                      <Download className="w-3.5 h-3.5" /> Download
                                    </a>
                                  </div>
                                ))}
                                <a href={release.htmlUrl} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors font-medium">
                                  <Github className="w-3.5 h-3.5" /> View on GitHub
                                </a>
                              </div>
                              <div>
                                <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mb-3">Changelog</p>
                                <div
                                  className="prose prose-sm prose-invert max-w-none text-sm text-zinc-400 leading-relaxed
                                  [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_li]:text-zinc-400 [&_strong]:text-zinc-200 [&_h2]:text-white [&_h2]:font-semibold [&_h2]:text-sm [&_a]:text-orange-400"
                                  dangerouslySetInnerHTML={{ __html: marked.parse(release.body) }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────── */}
        <section id="features" className={`${DIVIDER}`}>
          <Features />
        </section>

        {/* ── SCREENSHOTS ───────────────────────────────────────────────── */}
        <section id="screenshots" className={`${SECTION} ${DIVIDER}`}>
          <SectionHeader
            label="Interface Walkthrough"
            title="See Muzo in action"
            description="Hover over each panel to explore different screens of the Muzo app experience."
          />
          <LandingAccordionItem />
        </section>

        {/* ── TECH STACK ────────────────────────────────────────────────── */}
        <section id="techstack" className={`${SECTION} ${DIVIDER}`}>
          <SectionHeader
            label="Framework Architecture"
            title="Technology Stack"
            description="Muzo uses lightweight libraries, low-latency audio players, and lightning-fast local databases."
          />
          <TechStackTable />
        </section>

        {/* ── SETUP & INSTALL ───────────────────────────────────────────── */}
        <section id="setup" className={`${SECTION} ${DIVIDER}`}>
          <SectionHeader
            label="Developer Guide"
            title="Compile from Source"
            description="Prefer to build yourself? You'll need the Flutter SDK, Dart SDK, and Java JDK 17."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Tab switcher */}
            <div className="space-y-4">
              <div className="pill-filter-bar w-fit">
                {(["run", "build"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setInstallTab(tab)}
                    className={cn("pill-filter", installTab === tab ? "active" : "")}
                  >
                    {tab === "run" ? "Clone & Run" : "Build Release APK"}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {installTab === "run" ? (
                  <>
                    {[
                      { id: "clone", label: "# 1. Clone the project", cmd: "git clone https://github.com/Shashwat-CODING/Muzo.git && cd Muzo", display: <><span className="text-orange-400">git clone</span> https://github.com/Shashwat-CODING/Muzo.git<br /><span className="text-orange-400">cd</span> Muzo</> },
                      { id: "pub", label: "# 2. Install packages", cmd: "flutter pub get", display: <><span className="text-orange-400">flutter</span> pub get</> },
                      { id: "run", label: "# 3. Run", cmd: "flutter run", display: <><span className="text-orange-400">flutter</span> run</> },
                    ].map(({ id, label, cmd, display }) => (
                      <div key={id} className="glass-card p-4 font-mono text-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-zinc-500 font-sans font-bold tracking-widest uppercase">{label}</span>
                          <button onClick={() => handleCopy(cmd, id)} className="copy-btn">
                            {copiedCmd === id ? <Check className="w-3 h-3 text-orange-400" /> : <Copy className="w-3 h-3" />}
                            {copiedCmd === id ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <pre className="text-zinc-300 text-sm leading-relaxed">{display}</pre>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="glass-card p-4 font-mono text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-zinc-500 font-sans font-bold tracking-widest uppercase"># Compile Release APK</span>
                        <button onClick={() => handleCopy("flutter build apk --split-per-abi", "build")} className="copy-btn">
                          {copiedCmd === "build" ? <Check className="w-3 h-3 text-orange-400" /> : <Copy className="w-3 h-3" />}
                          {copiedCmd === "build" ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <pre className="text-zinc-300"><span className="text-orange-400">flutter</span> build apk <span className="text-orange-400">--split-per-abi</span></pre>
                    </div>
                    <div className="glass-card p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Using <code className="text-orange-400 font-mono bg-orange-500/10 px-1.5 py-0.5 rounded text-[11px]">--split-per-abi</code> compiles separate APK targets for each architecture (arm64, v7, x86_64), resulting in significantly smaller file sizes on the user's device.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Terminal preview window */}
            <div className="glass-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-zinc-500 font-mono ml-2">bash — muzo-setup</span>
              </div>
              <div className="p-5 font-mono text-xs text-zinc-400 space-y-2 min-h-[160px]">
                <span className="text-orange-400">$ </span><span className="text-zinc-300">git clone https://github.com/Shashwat-CODING/Muzo.git</span><br />
                <span className="text-zinc-500">Cloning into 'Muzo'...</span><br />
                <span className="text-zinc-500">remote: Enumerating objects: 2500, done.</span><br />
                <span className="text-orange-400">$ </span><span className="text-zinc-300">cd Muzo && flutter pub get</span><br />
                <span className="text-zinc-500">Running "flutter pub get" in Muzo...</span><br />
                <span className="text-green-400/80">✓ Got dependencies!</span><br />
                <span className="text-orange-400">$ </span><span className="text-zinc-300">flutter run</span><br />
                <span className="text-zinc-500">Launching lib/main.dart on device...</span><br />
                <span className="text-green-400/80 animate-pulse">▋</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTRIBUTORS ──────────────────────────────────────────────── */}
        <section className={`${SECTION} ${DIVIDER}`}>
          <SectionHeader
            label="Open Source"
            title="Community & Credits"
            description="Muzo is built on the shoulders of incredible developers and open-source libraries."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contributors */}
            <div className="glass-card p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <Users className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Contributors</h3>
                  <p className="text-xs text-zinc-500">Top GitHub contributors</p>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-wrap gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/10 animate-pulse border border-white/5" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {contributors.map((c) => (
                    <a
                      key={c.login}
                      href={c.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title={`${c.login} (${c.contributions} contributions)`}
                    >
                      <img
                        src={c.avatarUrl}
                        alt={c.login}
                        className="w-10 h-10 rounded-full border-2 border-white/10 group-hover:border-orange-400 transition-colors shadow-lg"
                      />
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 text-[10px] font-semibold text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-xl">
                        {c.login} ({c.contributions})
                      </span>
                    </a>
                  ))}
                </div>
              )}

              <a
                href="https://github.com/Shashwat-CODING/Muzo/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                View all contributors <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Acknowledgements */}
            <div className="glass-card p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <Heart className="w-5 h-5 text-orange-400 fill-orange-400/20" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Acknowledgements</h3>
                  <p className="text-xs text-zinc-500">Standing on the shoulders of giants</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Hexer10 & anandnet", lib: "youtube_explode_dart", desc: "Core engine for media link extractions and YouTube Music details parsing." },
                  { name: "Animesh (n-ce)", lib: "fast-saavn & ytify", desc: "Creator of the blazing-fast JioSaavn API and ytify, a key design inspiration." },
                ].map((ack) => (
                  <div key={ack.name} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                    <p className="font-bold text-white text-sm tracking-tight">{ack.name}</p>
                    <span className="text-[9px] text-orange-400 font-bold uppercase tracking-wider">{ack.lib}</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">{ack.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── CINEMATIC FOOTER ────────────────────────────────────────────── */}
      <CinematicFooter downloadUrl={stats?.downloadUrl} />
    </TooltipProvider>
  );
}
