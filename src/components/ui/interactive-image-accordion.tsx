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

const PhoneFrame: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => (
  <div className="relative mx-auto w-[190px] h-[390px] bg-zinc-950 rounded-[32px] border-[5px] border-zinc-800 shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-500 scale-95 md:scale-100 hover:scale-[1.02]">
    {/* Dynamic Island / Notch */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-zinc-900 rounded-full z-30 flex items-center justify-center border border-white/5">
      <div className="w-1 h-1 rounded-full bg-zinc-700/80 mr-2" />
      <div className="w-6 h-0.5 bg-zinc-800 rounded-full" />
    </div>

    {/* Screen reflection glare */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20" />

    {/* Screenshot */}
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover z-10"
      onError={(e) => {
        const t = e.target as HTMLImageElement;
        t.onerror = null;
        t.src = 'https://placehold.co/400x800/0d0d0f/ffffff?text=App+Screen';
      }}
    />
  </div>
);

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => (
  <div
    className={`
      relative overflow-hidden cursor-pointer glass-card !border-white/10 !rounded-2xl
      transition-all duration-700 ease-in-out
      w-full md:h-[460px]
      ${isActive ? 'h-[430px] md:w-[360px]' : 'h-[56px] md:w-[56px]'}
    `}
    onMouseEnter={onMouseEnter}
  >
    {isActive ? (
      <>
        {/* Active: Blurred background for depth */}
        <img
          src={item.imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl scale-110 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        {/* Active: Phone Mockup Container */}
        <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
          <PhoneFrame imageUrl={item.imageUrl} title={item.title} />
        </div>
      </>
    ) : (
      <>
        {/* Inactive: Clean cover view */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-300 hover:opacity-50"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.onerror = null;
            t.src = 'https://placehold.co/400x460/0d0d0f/ffffff?text=Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </>
    )}

    {/* Title tag */}
    <span className={`
      absolute text-white text-[10px] md:text-xs font-bold tracking-widest uppercase whitespace-nowrap
      transition-all duration-500 ease-in-out z-20 pointer-events-none
      ${isActive
        ? 'bottom-4 left-1/2 -translate-x-1/2 opacity-0'
        : 'bottom-4 left-4 md:bottom-20 md:left-1/2 md:-translate-x-1/2 md:rotate-90 opacity-50 hover:opacity-100'
      }
    `}>
      {item.title}
    </span>
  </div>
);

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);
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
