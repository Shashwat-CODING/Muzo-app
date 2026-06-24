import React, { useState } from 'react';

const accordionItems = [
  { id: 1, title: 'Home Dashboard', imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/1.jpg', description: 'Instant access to recently played tracks, history, and sub feeds in a clean layout.' },
  { id: 2, title: 'Glassmorphic Player', imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/2.jpg', description: 'An immersive player interface showcasing high-quality album art and glassmorphic overlays.' },
  { id: 3, title: 'Karaoke Lyrics', imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/3.jpg', description: 'Synchronized lyrics that scroll automatically with word-level highlights in karaoke mode.' },
  { id: 4, title: 'Library Manager', imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/5.jpg', description: 'Organize your favorite music into custom playlists, with complete control over offline cache.' },
  { id: 5, title: 'Spotify Imports', imageUrl: 'https://raw.githubusercontent.com/Shashwat-CODING/Muzo/main/images/13.jpg', description: 'Paste a public Spotify playlist URL to instantly load and match tracks for streaming.' },
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => (
  <div
    className={`
      relative overflow-hidden cursor-pointer glass-card !border-white/10 !rounded-2xl
      transition-all duration-700 ease-in-out
      w-full md:h-[460px]
      ${isActive ? 'h-[300px] md:w-[380px]' : 'h-[56px] md:w-[56px]'}
    `}
    onMouseEnter={onMouseEnter}
  >
    <img
      src={item.imageUrl}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover opacity-75 transition-opacity duration-300 hover:opacity-90"
      onError={(e) => {
        const t = e.target as HTMLImageElement;
        t.onerror = null;
        t.src = 'https://placehold.co/400x460/0d0d0f/ffffff?text=Image+Error';
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

    <span className={`
      absolute text-white text-xs font-bold tracking-tight whitespace-nowrap
      transition-all duration-500 ease-in-out
      ${isActive
        ? 'bottom-5 left-5 rotate-0 opacity-100'
        : 'bottom-4 left-4 md:bottom-20 md:left-1/2 md:-translate-x-1/2 md:rotate-90 opacity-40 hover:opacity-80'
      }
    `}>
      {item.title}
    </span>
  </div>
);

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeItem = accordionItems[activeIndex];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* Left: text */}
      <div className="w-full lg:w-5/12 space-y-5 text-center lg:text-left">
        <span className="section-label">Interface Walkthrough</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mt-3">
          {activeItem.title}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {activeItem.description}
        </p>
        <a href="#downloads" className="btn-primary inline-flex mt-2">
          Get Muzo App
        </a>
      </div>

      {/* Right: accordion */}
      <div className="w-full lg:w-7/12 flex justify-center">
        <div className="flex flex-col md:flex-row items-center gap-2.5 w-full max-w-[680px] p-3 glass-card !rounded-3xl">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isActive={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
