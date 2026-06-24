"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  --pill-bg-1: rgba(255,255,255,0.04);
  --pill-bg-2: rgba(255,255,255,0.01);
  --pill-shadow: rgba(0,0,0,0.6);
  --pill-highlight: rgba(255,255,255,0.10);
  --pill-inset-shadow: rgba(0,0,0,0.7);
  --pill-border: rgba(255,255,255,0.08);

  --pill-bg-1-hover: rgba(255,255,255,0.08);
  --pill-bg-2-hover: rgba(255,255,255,0.03);
  --pill-border-hover: rgba(255,255,255,0.20);
  --pill-shadow-hover: rgba(0,0,0,0.7);
  --pill-highlight-hover: rgba(255,255,255,0.18);
}

@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%,100% { transform: scale(1);   filter: drop-shadow(0 0 4px rgba(239,68,68,0.5)); }
  15%,45% { transform: scale(1.3); filter: drop-shadow(0 0 10px rgba(239,68,68,0.9)); }
  30%     { transform: scale(1); }
}

.animate-footer-breathe         { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee  { animation: footer-scroll-marquee 35s linear infinite; }
.animate-footer-heartbeat       { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(249,115,22,0.18) 0%,
    rgba(234,88,12,0.08) 45%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: #fff;
}

.footer-giant-bg-text {
  font-size: 28vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.04);
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.45) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(255,255,255,0.12));
}
`;

// ── Magnetic Button ─────────────────────────────────────────────────────────
type MagneticProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  to?: string;
};

const MagneticButton = React.forwardRef<HTMLElement, MagneticProps>(
  ({ className, children, as: Tag = "button", ...props }, fwdRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(el, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.12, rotationY: x * 0.12, scale: 1.05, ease: "power2.out", duration: 0.4 });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
        };
        el.addEventListener("mousemove", onMove as EventListener);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mousemove", onMove as EventListener);
          el.removeEventListener("mouseleave", onLeave);
        };
      }, el);
      return () => ctx.revert();
    }, []);

    return (
      <Tag
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof fwdRef === "function") fwdRef(node);
          else if (fwdRef) (fwdRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// ── Marquee strip ───────────────────────────────────────────────────────────
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6 shrink-0">
    <span>Ad-Free Streaming</span><span className="text-orange-500/60">✦</span>
    <span>Offline Playback</span><span className="text-orange-400/50">✦</span>
    <span>Word-by-Word Karaoke</span><span className="text-orange-500/60">✦</span>
    <span>Gesture Control</span><span className="text-orange-400/50">✦</span>
    <span>Spotify Import</span><span className="text-orange-500/60">✦</span>
    <span>Zero Telemetry</span><span className="text-orange-400/50">✦</span>
    <span>Built with Flutter</span><span className="text-orange-500/60">✦</span>
  </div>
);

// ── Main Export ─────────────────────────────────────────────────────────────
interface CinematicFooterProps {
  downloadUrl?: string;
}

export function CinematicFooter({ downloadUrl = "https://github.com/Shashwat-CODING/Muzo/releases/latest" }: CinematicFooterProps) {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const linksRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "15vh", opacity: 0 },
        { y: "0vh", opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1.5 } }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 50%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#09090b] text-zinc-200 cinematic-footer-wrapper">

          {/* Aurora glow */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          {/* Grid */}
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant BG text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none"
          >
            MUZO
          </div>

          {/* ── Marquee ── */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-white/5 bg-white/[0.02] backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105">
            <div className="flex w-max animate-footer-scroll-marquee text-[11px] font-bold tracking-[0.28em] text-zinc-400 uppercase">
              <MarqueeItem /><MarqueeItem />
            </div>
          </div>

          {/* ── Center Content ── */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-4xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl sm:text-7xl md:text-8xl font-black footer-text-glow tracking-tighter mb-10 text-center"
            >
              Listen without<br />limits.
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              {/* Primary CTA */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as="a"
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-bold text-sm flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-orange-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0222 3.503C15.5902 8.242 13.8533 7.85 12 7.85c-1.8533 0-3.5902.392-5.1369 1.1004L4.841 5.4475a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3436-4.1021-2.6893-7.5743-6.1185-9.4396" />
                  </svg>
                  Download APK
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://github.com/Shashwat-CODING/Muzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-8 py-4 rounded-full text-zinc-300 font-bold text-sm flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </MagneticButton>
              </div>

              {/* Secondary pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-1">
                <MagneticButton
                  as="a"
                  href="/privacy"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-zinc-400 font-medium text-xs hover:text-white"
                >
                  Privacy Policy
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://github.com/Shashwat-CODING/Muzo/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-zinc-400 font-medium text-xs hover:text-white"
                >
                  MIT License
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://github.com/Shashwat-CODING/Muzo/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-5 py-2.5 rounded-full text-zinc-400 font-medium text-xs hover:text-white"
                >
                  Report Issue
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-zinc-500 text-[10px] font-semibold tracking-widest uppercase order-2 md:order-1">
              © {new Date().getFullYear()} Muzo Open Source. MIT License.
            </div>

            <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm">❤</span>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black text-xs tracking-normal ml-0.5">Shashwat</span>
            </div>

            <MagneticButton
              as="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-zinc-400 hover:text-white group order-3"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>

        </footer>
      </div>
    </>
  );
}
