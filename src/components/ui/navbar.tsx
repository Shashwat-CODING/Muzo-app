import { useState, useEffect } from "react";
import { Menu, X, Download, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  logoText: string;
  navLinks: NavLink[];
  downloadUrl?: string;
  githubUrl?: string;
}

const supportsNativeScroll =
  typeof window !== "undefined" &&
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports("animation-timeline", "scroll()");

export function Navbar({
  logoText,
  navLinks,
  downloadUrl = "#downloads",
  githubUrl = "https://github.com/Shashwat-CODING/Muzo",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jsProgress, setJsProgress] = useState(0);

  // Shrink header on scroll & calculate scroll progress fallback
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Fallback scroll progress calculation
      if (!supportsNativeScroll) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setJsProgress(window.scrollY / docHeight);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initially
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section Observer to highlight active link
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Focus on the middle of the viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all targets in navLinks
    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Special case for top of page
    const handleTopCheck = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleTopCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTopCheck);
    };
  }, [navLinks]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12",
        isScrolled
          ? "py-3 bg-zinc-950/70 border-b border-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "py-6 bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-extrabold tracking-widest text-white uppercase flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
          {logoText}
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-xs font-bold tracking-widest uppercase transition-all duration-300 relative py-1.5 hover:text-white",
                  isActive ? "text-orange-400" : "text-zinc-400"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 transition-transform duration-300 origin-left",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a href={downloadUrl} className="btn-primary">
            <Download className="w-3.5 h-3.5" />
            Download APK
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={cn(
          "fixed inset-0 bg-zinc-950/98 backdrop-blur-2xl z-50 flex flex-col p-8 transition-all duration-500 ease-in-out md:hidden",
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="text-lg font-extrabold tracking-widest text-white uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
            {logoText}
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-left">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-2xl font-bold tracking-wide uppercase transition-colors py-2",
                  isActive ? "text-orange-400" : "text-zinc-300 hover:text-white"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="glass-pill py-3 text-center text-white flex items-center justify-center gap-2 font-bold"
          >
            <Github className="w-5 h-5" />
            GitHub Repository
          </a>
          <a
            href={downloadUrl}
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary py-3 text-center w-full"
          >
            <Download className="w-4 h-4 inline-block mr-1.5" />
            Download Stable APK
          </a>
        </div>
      </div>

      {/* Scroll Progress Bar at bottom edge of navbar */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-600 via-orange-400 to-amber-300 shadow-[0_1px_8px_rgba(249,115,22,0.6)] w-full origin-left",
          supportsNativeScroll ? "scroll-progress-bar" : ""
        )}
        style={supportsNativeScroll ? {} : { transform: `scaleX(${jsProgress})` }}
      />
    </header>
  );
}
