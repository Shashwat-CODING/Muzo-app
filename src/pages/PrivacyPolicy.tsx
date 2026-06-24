import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200 font-sans selection:bg-orange-500/30 selection:text-white pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-500/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-12 group"
        >
          <div className="p-2 rounded-full bg-white/[0.03] border border-white/10 group-hover:bg-white/[0.08] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>

        <div className="space-y-4 mb-16">
          <span className="text-[10px] text-orange-400 font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] inline-block">
            Legal & Privacy
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-400 text-lg">Effective Date: June 2026</p>
        </div>

        <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
          
          <div className="prose prose-invert prose-orange max-w-none relative z-10 
            [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-zinc-200 [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-zinc-400 [&_p]:leading-relaxed [&_p]:text-sm md:[&_p]:text-base
            [&_ul]:text-zinc-400 [&_ul]:space-y-2 [&_li::marker]:text-orange-500
            [&_strong]:text-zinc-200 [&_a]:text-orange-400 [&_a]:no-underline hover:[&_a]:underline">
            
            <p>
              Welcome to Muzo. Your privacy is of paramount importance to us. This Privacy Policy explains how we handle your data, ensuring you understand exactly what happens when you use our application.
            </p>

            <h2>1. Zero Telemetry & No Tracking</h2>
            <p>
              Muzo operates on a strict zero-telemetry policy. We do not collect, store, transmit, or sell any personal data, usage metrics, or behavioral analytics. What you listen to is your business, and yours alone.
            </p>

            <h2>2. Local Data Storage</h2>
            <p>
              All of your personal application data is stored securely and entirely locally on your device. This includes:
            </p>
            <ul>
              <li><strong>Listening History:</strong> Tracks your recently played songs.</li>
              <li><strong>Custom Playlists:</strong> Playlists you create within the app.</li>
              <li><strong>Cached Audio:</strong> Music cached or downloaded for offline playback.</li>
              <li><strong>App Preferences:</strong> Your UI and playback settings.</li>
            </ul>
            <p>
              Because this data is stored locally (via Hive database), we have no access to it. If you uninstall the app or clear its data, this information is permanently deleted from your device.
            </p>

            <h2>3. Third-Party Services & APIs</h2>
            <p>
              While Muzo does not track you, the app acts as a client that connects directly to third-party APIs to stream music and fetch metadata. By using Muzo, your device will communicate directly with:
            </p>
            <ul>
              <li><strong>YouTube & YouTube Music:</strong> For fetching audio streams and video metadata. (Powered by `youtube_explode_dart`).</li>
              <li><strong>JioSaavn API:</strong> For fetching high-quality metadata, lyrics, and regional catalog data.</li>
            </ul>
            <p>
              When your device requests data from these services, standard network information (such as your IP address) is exposed to them, as is inherent in any web request. We encourage you to review the privacy policies of YouTube and JioSaavn regarding their data practices.
            </p>

            <h2>4. Permissions Required</h2>
            <p>
              Muzo requests specific device permissions purely for functional purposes:
            </p>
            <ul>
              <li><strong>Storage:</strong> To cache and save downloaded music tracks for offline listening.</li>
              <li><strong>Network Access:</strong> To stream music from external APIs.</li>
            </ul>

            <h2>5. Open Source Transparency</h2>
            <p>
              Muzo is fully open source. Our code is available for public review on GitHub, ensuring total transparency regarding our data handling and security practices. You are free to inspect the source code to verify our zero-tracking claims.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy occasionally to reflect changes in our practices or relevant laws. We encourage you to review this page periodically for the latest information.
            </p>

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-zinc-500 text-sm">© {new Date().getFullYear()} Muzo Open Source</span>
              <a href="https://github.com/Shashwat-CODING/Muzo" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-medium text-sm hover:text-white transition-colors">
                View Source on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
