import { useState } from "react";
import { Code2, Disc, Database, Globe, Layers, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  category: "core" | "audio" | "data" | "ui";
  version?: string;
  author: string;
  roleInMuzo: string;
  url: string;
  icon: React.ReactNode;
}

const TECH_ITEMS: TechItem[] = [
  { name: "Flutter & Dart", category: "core", version: "3.x", author: "Google", roleInMuzo: "Main SDK powering the multi-platform UI, compiles natively to iOS, Android, and macOS.", url: "https://flutter.dev", icon: <Code2 className="w-5 h-5 text-orange-400" /> },
  { name: "Riverpod", category: "core", author: "Remi Rousselet", roleInMuzo: "Ensures responsive local state management, dependency injection, and instantaneous data feeds.", url: "https://riverpod.dev", icon: <Layers className="w-5 h-5 text-orange-400" /> },
  { name: "Just Audio", category: "audio", author: "Ryan Heise", roleInMuzo: "Core player engine powering high-quality background audio streaming and Lockscreen media controls.", url: "https://pub.dev/packages/just_audio", icon: <Disc className="w-5 h-5 text-orange-400" /> },
  { name: "youtube_explode_dart", category: "audio", author: "Hexer10 / anandnet", roleInMuzo: "Backbone library that extracts direct audio stream URLs and video details from YouTube.", url: "https://github.com/Hexer10/youtube_explode_dart", icon: <Globe className="w-5 h-5 text-orange-400" /> },
  { name: "JioSaavn API", category: "data", author: "Animesh (n-ce)", roleInMuzo: "Blazing-fast API that queries music indexes, retrieves metadata, and processes search results.", url: "https://github.com/n-ce/Uma", icon: <Globe className="w-5 h-5 text-orange-400" /> },
  { name: "Hive", category: "data", author: "Hive Authors", roleInMuzo: "NoSQL local key-value storage database holding downloaded offline catalogs, history, and playlists.", url: "https://docs.hivedb.dev", icon: <Database className="w-5 h-5 text-orange-400" /> },
  { name: "flutter_lyric", category: "ui", author: "Lyric Contributors", roleInMuzo: "Renders karaoke text line animations, parsing LRC text files with speed-variable matching.", url: "https://pub.dev/packages/flutter_lyric", icon: <Code2 className="w-5 h-5 text-orange-400" /> },
  { name: "Dio & Http", category: "data", author: "cfug", roleInMuzo: "Robust networking system configured with automated RapidAPI fallbacks for streaming fail-safes.", url: "https://pub.dev/packages/dio", icon: <Layers className="w-5 h-5 text-orange-400" /> },
  { name: "Cached Network Image", category: "ui", author: "Baseflow", roleInMuzo: "Caches image file downloads in device memory, bypassing redundant web calls and network load.", url: "https://pub.dev/packages/cached_network_image", icon: <Code2 className="w-5 h-5 text-orange-400" /> },
];

const CATEGORIES = ["all", "core", "audio", "data", "ui"] as const;

export default function TechStackTable() {
  const [filter, setFilter] = useState<typeof CATEGORIES[number]>("all");
  const filtered = filter === "all" ? TECH_ITEMS : TECH_ITEMS.filter(i => i.category === filter);

  return (
    <div className="space-y-8">
      {/* Filter bar */}
      <div className="flex justify-center">
        <div className="pill-filter-bar flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn("pill-filter capitalize py-3 md:py-2 px-6 md:px-5", filter === cat ? "active" : "")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="glass-card p-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  {item.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="badge-neutral">{item.category}</span>
                  {item.version && <span className="badge-orange">{item.version}</span>}
                </div>
              </div>

              <div>
                <h5 className="text-base font-bold text-white tracking-tight group-hover:text-orange-300 transition-colors">
                  {item.name}
                </h5>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  by <span className="text-zinc-400 font-semibold">{item.author}</span>
                </p>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">{item.roleInMuzo}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
              >
                Documentation <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[9px] text-zinc-600 font-mono font-bold">MIT</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
