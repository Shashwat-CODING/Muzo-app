import { useState } from "react";
import { 
  Code2, Disc, Database, Globe, Layers, ExternalLink 
} from "lucide-react";
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

export default function TechStackTable() {
  const [filter, setFilter] = useState<"all" | "core" | "audio" | "data" | "ui">("all");

  const TECH_ITEMS: TechItem[] = [
    {
      name: "Flutter & Dart",
      category: "core",
      version: "3.x",
      author: "Google",
      roleInMuzo: "Main SDK powering the multi-platform UI, compiles natively to iOS, Android, and macOS.",
      url: "https://flutter.dev",
      icon: <Code2 className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "Riverpod",
      category: "core",
      author: "Remi Rousselet",
      roleInMuzo: "Ensures responsive local state management, dependency injection, and instantaneous data feeds.",
      url: "https://riverpod.dev",
      icon: <Layers className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "Just Audio",
      category: "audio",
      author: "Ryan Heise",
      roleInMuzo: "Core player engine powering high-quality background audio streaming and Lockscreen media controls.",
      url: "https://pub.dev/packages/just_audio",
      icon: <Disc className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "youtube_explode_dart",
      category: "audio",
      author: "Hexer10 / anandnet",
      roleInMuzo: "Backbone library that extracts direct audio stream URLs and video details from YouTube.",
      url: "https://github.com/Hexer10/youtube_explode_dart",
      icon: <Globe className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "JioSaavn API",
      category: "data",
      author: "Animesh (n-ce)",
      roleInMuzo: "Blazing-fast API that queries music indexes, retrieves metadata, and processes search results.",
      url: "https://github.com/n-ce/Uma",
      icon: <Globe className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "Hive",
      category: "data",
      author: "Hive Authors",
      roleInMuzo: "NoSQL local key-value storage database holding downloaded offline catalogs, history, and playlists.",
      url: "https://docs.hivedb.dev",
      icon: <Database className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "flutter_lyric",
      category: "ui",
      author: "Lyric Contributors",
      roleInMuzo: "Renders karaoke text line animations, parsing LRC text files with speed-variable matching.",
      url: "https://pub.dev/packages/flutter_lyric",
      icon: <Code2 className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "Dio & Http",
      category: "data",
      author: "cfug",
      roleInMuzo: "Robust networking system configured with automated RapidAPI fallbacks for streaming fail-safes.",
      url: "https://pub.dev/packages/dio",
      icon: <Layers className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "Cached Network Image",
      category: "ui",
      author: "Baseflow",
      roleInMuzo: "Caches image file downloads in device memory, bypassing redundant web calls and network load.",
      url: "https://pub.dev/packages/cached_network_image",
      icon: <Code2 className="w-5 h-5 text-orange-400" />,
    },
  ];

  const filteredItems = filter === "all" ? TECH_ITEMS : TECH_ITEMS.filter(item => item.category === filter);

  return (
    <div className="space-y-8">
      
      {/* Category Filter Pills (Premium) */}
      <div className="flex flex-wrap gap-2 justify-center p-1.5 bg-white/[0.03] backdrop-blur-xl rounded-full border border-white/5 w-fit mx-auto shadow-xl">
        {(["all", "core", "audio", "data", "ui"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer capitalize",
              filter === cat 
                ? "bg-white text-black shadow-md shadow-white/10" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            <div className="space-y-4 relative z-10 text-left">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/[0.05] rounded-2xl border border-white/10 shadow-inner">
                  {item.icon}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[9px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/5 text-zinc-300">
                    {item.category}
                  </span>
                  {item.version && (
                    <span className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[9px] font-mono font-bold px-2.5 py-1 rounded-full">
                      {item.version}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                  {item.name}
                </h5>
                <span className="text-[10px] text-zinc-500 font-medium mt-1 block tracking-wide">
                  Maintained by <span className="text-zinc-300 font-semibold">{item.author}</span>
                </span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {item.roleInMuzo}
              </p>
            </div>

            <div className="pt-5 border-t border-white/5 mt-5 flex justify-between items-center relative z-10">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-orange-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                Documentation <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[9px] text-zinc-600 font-mono font-bold">MIT LICENSE</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
