import React, { useState } from 'react';

// --- Data for Muzo screenshots in the accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Home Dashboard',
    imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/1.jpg',
    description: 'Instant access to recently played tracks, history, and sub feeds in a clean layout.',
  },
  {
    id: 2,
    title: 'Glassmorphic Player',
    imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/2.jpg',
    description: 'An immersive player interface showcasing high-quality album art and glassmorphic overlays.',
  },
  {
    id: 3,
    title: 'Karaoke Lyrics',
    imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/3.jpg',
    description: 'Synchronized lyrics that scroll automatically with word-level highlights in karaoke mode.',
  },
  {
    id: 4,
    title: 'Library Manager',
    imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/5.jpg',
    description: 'Organize your favorite music into custom playlists, with complete control over offline cache.',
  },
  {
    id: 5,
    title: 'Spotify Imports',
    imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/13.jpg',
    description: 'Paste a public Spotify playlist URL to instantly load and match tracks for streaming.',
  },
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}

// --- Accordion Item Component ---
const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
  return (
    <div
      className={`
        relative overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl shadow-lg
        transition-all duration-700 ease-in-out
        w-full md:h-[450px]
        ${isActive ? 'h-[320px] md:w-[380px]' : 'h-[60px] md:w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://placehold.co/400x450/171717/ffffff?text=Image+Error';
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-xs font-semibold tracking-tight whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? 'bottom-4 left-4 md:bottom-6 md:left-6 rotate-0 opacity-100 scale-100'
              : 'bottom-4 left-4 md:bottom-24 md:left-1/2 md:-translate-x-1/2 md:rotate-90 opacity-45 hover:opacity-100 scale-95 origin-center'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main Accordion Section Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(1); // Set Glassmorphic Player (index 1) active by default

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  const activeItem = accordionItems[activeIndex];

  return (
    <div className="w-full text-left font-sans">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/5 border border-white/10 text-zinc-300 shadow-sm">
            Interface Walkthrough
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight">
            {activeItem.title}
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            {activeItem.description}
          </p>
          <div className="pt-4">
            <a
              href="#downloads"
              className="inline-block bg-white text-black font-bold text-sm px-8 py-3.5 rounded-full tracking-tight hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Get Muzo App
            </a>
          </div>
        </div>

        {/* Right Side: Image Accordion */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full max-w-[650px] p-3 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => handleItemHover(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
