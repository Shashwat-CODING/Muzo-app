import { useState, useEffect } from "react";
import {
  Download, Github, Star, GitFork, AlertCircle, Copy, Check,
  Terminal, Users, Heart
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchRepoStats, fetchContributors, fetchReleases } from "@/lib/github";
import type { RepoStats, Contributor, Release } from "@/lib/github";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { MorphingText } from "@/components/ui/liquid-text";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";
import { marked } from "marked";
import TechStackTable from "@/components/TechStackTable";
import { Features } from "@/components/ui/features-8";
import { cn } from "@/lib/utils";

export default function App() {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<"run" | "build">("run");
  const [loading, setLoading] = useState(true);
  const [expandedRelease, setExpandedRelease] = useState<string | null>(null);
  const [showOlder, setShowOlder] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [repoData, contribData, releasesData] = await Promise.all([
          fetchRepoStats(),
          fetchContributors(),
          fetchReleases()
        ]);
        // Override version to 4.0.0 as requested by the updated README
        if (repoData) {
          repoData.version = "v4.0.0";
        }
        setStats(repoData);
        setContributors(contribData.slice(0, 8)); // Top 8 contributors
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

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Shashwat-CODING/Muzo' },
  ];

  const morphingTexts = [
    "AD-FREE STREAMING",
    "OFFLINE PLAYBACK",
    "WORD KARAOKE LYRICS",
    "GESTURE CONTROL",
    "SPOTIFY PLAYLIST IMPORT",
    "SLEEP TIMER SETTINGS",
    "PRIVACY FIRST"
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-transparent text-zinc-200 relative overflow-hidden font-sans pb-16 selection:bg-neutral-800 selection:text-white">

        {/* MINIMAL HERO SECTION */}
        <MinimalistHero
          logoText="MUZO"
          navLinks={navLinks}
          mainText="A powerful, privacy-focused YouTube Music client built with Flutter. Ad-free, offline cache, word-by-word karaoke lyrics, Spotify playlist imports, and a sleek gesture-driven UI."
          readMoreLink="#features"
          imageSrc="/hero1.png"
          imageAlt="A portrait of a person in a black turtleneck, in profile."
          overlayText={{
            part1: 'less is',
            part2: 'more.',
          }}
          socialLinks={socialLinks}
          locationText={`VERSION ${stats?.version || 'v4.0.0'}`}
        />

        {/* LIQUID TEXT MORPHER */}
        <section className="py-12 border-y border-white/10 bg-white/5 backdrop-blur-md/40">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-[10px] text-zinc-500 font-medium tracking-tight block mb-4">Core Experience</span>
            <MorphingText texts={morphingTexts} className="text-white" />
          </div>
        </section>

        {/* LIVE STATS METRICS (Premium Glassmorphism) */}
        {stats && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="absolute inset-0 bg-orange-500/5 rounded-3xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 p-6 rounded-3xl text-center hover:bg-white/[0.04] transition-all duration-300 shadow-2xl">
                <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block">Repository Stars</span>
                <div className="text-2xl font-bold mt-2 flex items-center justify-center gap-1.5 text-white">
                  <Star className="w-5 h-5 text-orange-400 fill-indigo-400/20" /> {stats.stars}
                </div>
              </Card>
              <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 p-6 rounded-3xl text-center hover:bg-white/[0.04] transition-all duration-300 shadow-2xl">
                <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block">Repository Forks</span>
                <div className="text-2xl font-bold mt-2 flex items-center justify-center gap-1.5 text-white">
                  <GitFork className="w-5 h-5 text-orange-400" /> {stats.forks}
                </div>
              </Card>
              <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 p-6 rounded-3xl text-center hover:bg-white/[0.04] transition-all duration-300 shadow-2xl">
                <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block">Latest Build</span>
                <div className="mt-2.5 flex items-center justify-center">
                  <Badge className="bg-orange-500/10 border-orange-500/20 text-orange-400 font-bold text-[10px] px-3 py-1 tracking-wide rounded-full shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                    {stats.version}
                  </Badge>
                </div>
              </Card>
              <Card className="bg-white/[0.02] backdrop-blur-xl border-white/10 p-6 rounded-3xl text-center hover:bg-white/[0.04] transition-all duration-300 shadow-2xl flex flex-col justify-center">
                <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block mb-2">Release APK</span>
                <a
                  href={stats.downloadUrl}
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full tracking-tight hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </Card>
            </div>
          </section>
        )}

        {/* DOWNLOADS & RELEASES */}
        <section id="downloads" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-16 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent -z-10" />

          <div className="text-center space-y-3 mb-12">
            <span className="text-[10px] text-orange-400 font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">GitHub Releases</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Downloads & Changelog
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">
              Download the latest stable APK and explore the newest features, bug fixes, and performance improvements.
            </p>
          </div>

          <div className="space-y-6 text-left relative z-10">
            {releases.length > 0 && (() => {
              const latest = releases[0];
              return (
                <Card key={latest.tagName} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 p-8">
                    {/* Left Side: Release Tag, Title, Date and Download Button */}
                    <div className="space-y-6 lg:max-w-sm w-full">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold text-[10px] px-2.5 py-1 tracking-wide rounded-full uppercase shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                            {latest.tagName} (LATEST)
                          </Badge>
                          <span className="text-sm text-zinc-500 font-medium">
                            {new Date(latest.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-white tracking-tight">{latest.name}</h3>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block">Available Assets</span>
                        {latest.assets.map((asset) => (
                          <div key={asset.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.03] border border-white/5 p-3 rounded-2xl hover:bg-white/[0.05] transition-colors">
                            <div className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-zinc-200 truncate" title={asset.name}>
                                {asset.name}
                              </span>
                              <span className="text-[10px] text-zinc-500 font-medium">
                                {asset.download_count.toLocaleString()} downloads • {asset.size ? `${(asset.size / 1024 / 1024).toFixed(1)} MB` : 'Size unknown'}
                              </span>
                            </div>
                            <a
                              href={asset.browser_download_url}
                              className="inline-flex items-center justify-center gap-2 bg-white text-black text-xs font-bold px-4 py-2 rounded-full tracking-tight hover:bg-zinc-200 transition-all shrink-0 active:scale-95"
                            >
                              <Download className="w-4 h-4" /> Download
                            </a>
                          </div>
                        ))}

                        <div className="pt-3">
                          <a
                            href={latest.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white font-medium transition-colors"
                          >
                            <Github className="w-4 h-4" /> View Release on GitHub
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Changelog Details (Rendered Markdown) */}
                    <div className="flex-1 min-w-0 bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-left">
                      <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block mb-4">Changelog Highlights</span>
                      <div
                        className="prose prose-sm prose-invert max-w-none text-sm text-zinc-400 leading-relaxed font-sans space-y-3
                        [&_h1]:text-white [&_h1]:font-semibold [&_h1]:text-lg [&_h1]:tracking-tight [&_h1]:mt-6 [&_h1]:mb-3
                        [&_h2]:text-white [&_h2]:font-semibold [&_h2]:text-base [&_h2]:tracking-tight [&_h2]:mt-5 [&_h2]:mb-2
                        [&_h3]:text-white [&_h3]:font-medium [&_h3]:text-sm [&_h3]:tracking-tight [&_h3]:mt-4 [&_h3]:mb-2
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-3
                        [&_li]:text-zinc-400 [&_li]:text-sm
                        [&_strong]:text-zinc-200 [&_strong]:font-semibold
                        [&_a]:text-orange-400 [&_a]:no-underline hover:[&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: marked.parse(latest.body) }}
                      />
                    </div>
                  </div>
                </Card>
              );
            })()}

            {/* 2. Show older versions in a collapsible list */}
            {releases.slice(1).length > 0 && (
              <div className="mt-10 text-center w-full">
                <button
                  onClick={() => setShowOlder(!showOlder)}
                  className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.06] px-6 py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer"
                >
                  <span>{showOlder ? "Hide Previous Releases" : `Show Previous Releases (${releases.slice(1).length})`}</span>
                  <span className="text-[10px]">{showOlder ? "▲" : "▼"}</span>
                </button>

                {showOlder && (
                  <div className="space-y-4 mt-6 animate-fade-in text-left">
                    {releases.slice(1).map((release) => {
                      const isExpanded = expandedRelease === release.tagName;
                      return (
                        <div key={release.tagName} className="border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all duration-300">
                          <button
                            onClick={() => setExpandedRelease(isExpanded ? null : release.tagName)}
                            className="w-full flex items-center justify-between p-5 text-left font-sans cursor-pointer hover:bg-white/[0.02] transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <Badge className="bg-zinc-800/50 border border-zinc-700 text-zinc-300 font-semibold text-[10px] px-2.5 py-1 tracking-wide rounded-full uppercase">
                                {release.tagName}
                              </Badge>
                              <span className="text-base font-semibold text-zinc-200 tracking-tight">{release.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-zinc-500 font-medium hidden sm:inline">
                                {new Date(release.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                              <span className="text-xs font-medium tracking-tight text-orange-400 hover:text-indigo-300 transition">
                                {isExpanded ? "Hide Details" : "View Details"}
                              </span>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="p-6 border-t border-white/5 bg-black/20 flex flex-col lg:flex-row lg:items-start justify-between gap-8 animate-fade-in">
                              {/* Left Side: Download and details */}
                              <div className="space-y-4 lg:max-w-sm w-full text-left">
                                <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block">Available Assets</span>
                                {release.assets.map((asset) => (
                                  <div key={asset.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.03] border border-white/5 p-3 rounded-xl">
                                    <div className="min-w-0 flex-1">
                                      <span className="block text-sm font-semibold text-zinc-300 truncate" title={asset.name}>
                                        {asset.name}
                                      </span>
                                      <span className="text-[10px] text-zinc-500 font-medium">
                                        {asset.download_count.toLocaleString()} downloads • {asset.size ? `${(asset.size / 1024 / 1024).toFixed(1)} MB` : 'Size unknown'}
                                      </span>
                                    </div>
                                    <a
                                      href={asset.browser_download_url}
                                      className="inline-flex items-center justify-center gap-1.5 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full tracking-tight hover:bg-zinc-200 transition-all shrink-0 active:scale-95"
                                    >
                                      <Download className="w-3.5 h-3.5" /> Download
                                    </a>
                                  </div>
                                ))}

                                <div className="pt-2">
                                  <a
                                    href={release.htmlUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white font-medium transition-colors"
                                  >
                                    <Github className="w-4 h-4" /> View Release on GitHub
                                  </a>
                                </div>
                              </div>

                              {/* Right Side: Changelog Details */}
                              <div className="flex-1 min-w-0 bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-left">
                                <span className="text-[10px] text-zinc-500 font-semibold tracking-tight uppercase block mb-4">Changelog Highlights</span>
                                <div
                                  className="prose prose-sm prose-invert max-w-none text-sm text-zinc-400 leading-relaxed font-sans space-y-3
                                  [&_h1]:text-white [&_h1]:font-semibold [&_h1]:text-lg [&_h1]:tracking-tight [&_h1]:mt-6 [&_h1]:mb-3
                                  [&_h2]:text-white [&_h2]:font-semibold [&_h2]:text-base [&_h2]:tracking-tight [&_h2]:mt-5 [&_h2]:mb-2
                                  [&_h3]:text-white [&_h3]:font-medium [&_h3]:text-sm [&_h3]:tracking-tight [&_h3]:mt-4 [&_h3]:mb-2
                                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-3
                                  [&_li]:text-zinc-400 [&_li]:text-sm
                                  [&_strong]:text-zinc-200 [&_strong]:font-semibold
                                  [&_a]:text-orange-400 [&_a]:no-underline hover:[&_a]:underline"
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

        {/* CORE FEATURES GRID */}
        <section id="features" className="scroll-mt-16 border-b border-white/10">
          <Features />
        </section>

        {/* APP SCREENSHOTS GALLERY */}
        <section id="screenshots" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16 border-b border-white/10">
          <LandingAccordionItem />
        </section>

        {/* TECH STACK SECTION */}
        <section id="techstack" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16 border-b border-white/10">
          <div className="text-center space-y-2.5 mb-10">
            <span className="text-[10px] text-zinc-500 font-medium tracking-tight block">Framework Architecture</span>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Technology Stack
            </h2>
            <p className="text-neutral-405 text-xs max-w-xl mx-auto">
              Muzo utilizes lightweight libraries, low-latency audio players, and responsive local databases.
            </p>
          </div>
          <TechStackTable />
        </section>

        {/* SETUP & INSTALLATION SECTION */}
        <section id="setup" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-16 relative">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Col: Setup detail */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wide">
                <Terminal className="w-4 h-4" /> Developer Guide
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                Compile from Source
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Prefer to build the client yourself? Follow these simple steps. Make sure you have the Flutter SDK, Dart SDK, and Java JDK 17 installed on your machine.
              </p>

              <div className="flex gap-2 p-1.5 bg-white/[0.03] backdrop-blur-xl rounded-full border border-white/5 w-fit shadow-xl">
                <button
                  onClick={() => setInstallTab("run")}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer",
                    installTab === "run" ? "bg-white text-black shadow-md shadow-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  Clone & Run
                </button>
                <button
                  onClick={() => setInstallTab("build")}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer",
                    installTab === "build" ? "bg-white text-black shadow-md shadow-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  Build Release APK
                </button>
              </div>
            </div>

            {/* Right Col: Code Copy block (macOS style terminal) */}
            <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative text-left">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] text-zinc-500 font-mono font-bold tracking-wide">
                  bash — muzo-setup
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              <div className="p-6 font-mono text-[13px] leading-relaxed">
                {installTab === "run" ? (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <div className="flex justify-between items-center text-zinc-500 mb-2 text-xs font-semibold">
                        <span># 1. Clone the project</span>
                        <button
                          onClick={() => handleCopy("git clone https://github.com/Shashwat-CODING/Muzo.git && cd Muzo", "clone")}
                          className="hover:text-white transition flex items-center gap-1.5 cursor-pointer bg-white/5 px-2 py-1 rounded"
                        >
                          {copiedCmd === "clone" ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">Copy</span>
                        </button>
                      </div>
                      <pre className="text-zinc-300">
                        <code className="text-orange-400">git clone</code> https://github.com/Shashwat-CODING/Muzo.git{"\\n"}<code className="text-orange-400">cd</code> Muzo
                      </pre>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-zinc-500 mb-2 text-xs font-semibold">
                        <span># 2. Install packages</span>
                        <button
                          onClick={() => handleCopy("flutter pub get", "pub")}
                          className="hover:text-white transition flex items-center gap-1.5 cursor-pointer bg-white/5 px-2 py-1 rounded"
                        >
                          {copiedCmd === "pub" ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">Copy</span>
                        </button>
                      </div>
                      <pre className="text-zinc-300">
                        <code className="text-orange-400">flutter</code> pub get
                      </pre>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-zinc-500 mb-2 text-xs font-semibold">
                        <span># 3. Boot up client</span>
                        <button
                          onClick={() => handleCopy("flutter run", "run")}
                          className="hover:text-white transition flex items-center gap-1.5 cursor-pointer bg-white/5 px-2 py-1 rounded"
                        >
                          {copiedCmd === "run" ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">Copy</span>
                        </button>
                      </div>
                      <pre className="text-zinc-300">
                        <code className="text-orange-400">flutter</code> run
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <div className="flex justify-between items-center text-zinc-500 mb-2 text-xs font-semibold">
                        <span># Compile Release APK</span>
                        <button
                          onClick={() => handleCopy("flutter build apk --split-per-abi", "build")}
                          className="hover:text-white transition flex items-center gap-1.5 cursor-pointer bg-white/5 px-2 py-1 rounded"
                        >
                          {copiedCmd === "build" ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">Copy</span>
                        </button>
                      </div>
                      <pre className="text-zinc-300">
                        <code className="text-orange-400">flutter</code> build apk <span className="text-orange-400">--split-per-abi</span>
                      </pre>
                    </div>
                    <div className="text-xs text-zinc-400 bg-white/5 border border-white/10 p-4 rounded-xl leading-relaxed flex items-start gap-3 mt-4">
                      <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
                      <span>Using <code className="bg-white/10 px-1.5 py-0.5 rounded text-white text-[11px] font-bold mx-0.5">--split-per-abi</code> compiles separate APK targets for each system architecture (arm64, v7, x86_64) resulting in significantly smaller file sizes on the user's phone.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTRIBUTORS & ACKNOWLEDGEMENTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="absolute inset-0 bg-white/[0.02] -z-10 rounded-t-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left relative z-10">

            {/* Contributors list */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="text-xl font-semibold text-white flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <Users className="w-5 h-5 text-orange-400" />
                </div>
                Contributors
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Muzo is a community-driven open source project. Huge thank you to the developers contributing fixes, features, and optimizations.
              </p>

              {loading ? (
                <div className="flex gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/10 animate-pulse border border-white/5" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 pt-2">
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
                        className="w-10 h-10 rounded-full border-2 border-white/10 group-hover:border-indigo-400 transition-colors shadow-lg"
                      />
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 text-[10px] font-semibold text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-xl">
                        {c.login} ({c.contributions})
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Acknowledgements details */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xl font-semibold text-white flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <Heart className="w-5 h-5 text-orange-400 fill-orange-400/20" />
                </div>
                Acknowledgements
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Muzo stands on the shoulders of these incredible developers and open-source libraries:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:bg-white/[0.04] transition-colors shadow-lg">
                  <span className="font-semibold text-white block tracking-tight">Hexer10 & anandnet</span>
                  <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide mt-1 block">youtube_explode_dart</span>
                  <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                    The core engine handling media link extractions and YouTube Music details parsing perfectly.
                  </p>
                </div>
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:bg-white/[0.04] transition-colors shadow-lg">
                  <span className="font-semibold text-white block tracking-tight">Animesh (n-ce)</span>
                  <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide mt-1 block">fast-saavn & ytify</span>
                  <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                    Creator of the blazing-fast JioSaavn metadata API, and creator of the ytify web player, a major design inspiration.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-white/10/60 text-center text-xs text-zinc-500 space-y-3">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <span>Distributed under the <strong>MIT License</strong>.</span>
            <span>•</span>
            <a href="https://github.com/Shashwat-CODING/Muzo/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-neutral-350 hover:text-white font-bold transition underline">View License</a>
          </div>
          <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-400">
            <span>Built with</span>
            <span className="font-semibold text-white hover:underline transition cursor-help" title="Gemini & Antigravity">AI Agent</span>
            <span>By</span>
            <a href="https://github.com/Shashwat-CODING" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-extrabold">Shashwat</a>
          </div>
        </footer>

      </div>
    </TooltipProvider>
  );
}
