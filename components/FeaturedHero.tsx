"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { games } from "@/data/games";
import type { Game } from "@/types";
import { Play, Eye, ThumbsUp, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const FEATURED_SLUGS = [
  "momentum",
  "street-mayhem-driver",
  "turret-defend-apocalypse",
  "number-slide",
  "off-the-hook-ring-puzzle"
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export default function FeaturedHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Retrieve full game data based on the featured slugs
  const featuredGames = FEATURED_SLUGS.map((slug) => games.find((g) => g.slug === slug)).filter((g): g is Game => !!g);

  useEffect(() => {
    if (featuredGames.length === 0) return;

    // Reset progress when slide changes
    setProgress(0);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (!isHovered) {
      const startTime = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(currentProgress);

        if (elapsed >= SLIDE_DURATION) {
          setActiveIndex((prev) => (prev + 1) % featuredGames.length);
          setProgress(0);
        }
      }, 50);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeIndex, isHovered, featuredGames.length]);

  if (featuredGames.length === 0) return null;

  const activeGame = featuredGames[activeIndex]!;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prevIndex) => (prevIndex - 1 + featuredGames.length) % featuredGames.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prevIndex) => (prevIndex + 1) % featuredGames.length);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Action":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "Racing":
        return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "Puzzle":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default:
        return "text-indigo-500 bg-indigo-500/10 border-indigo-500/20";
    }
  };

  return (
    <div
      className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] lg:h-[530px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300 flex flex-col md:flex-row bg-[#080b11]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LEFT AREA: Showcase detail screen */}
      <div className="flex-1 h-full relative overflow-hidden flex items-center justify-between p-6 sm:p-10 md:p-12 lg:p-16 gap-6 md:gap-10">
        {/* Blurred background image layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeGame.thumbnail}
            alt=""
            className="w-full h-full object-cover scale-105 blur-[35px] opacity-40 dark:opacity-30 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/70 to-[#080b11]/40" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex-1 text-left flex flex-col justify-center h-full max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121824]/80 backdrop-blur-sm border border-slate-800 shadow-sm rounded-full w-fit mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
              Lobby Spotlight
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight tracking-tight uppercase line-clamp-2">
            {activeGame.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3.5 mt-3 mb-4 text-xs font-semibold">
            <span className={`px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded ${getCategoryColor(activeGame.category)}`}>
              {activeGame.category}
            </span>
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 border border-emerald-500/20 rounded-lg">
              <ThumbsUp className="w-3.5 h-3.5 fill-current" />
              <span>{Math.round((activeGame.rating / 5) * 100)}% Match</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Eye className="w-4 h-4" />
              <span>{activeGame.plays.toLocaleString()} plays</span>
            </span>
          </div>

          <p className="text-sm md:text-base text-slate-400 line-clamp-3 leading-relaxed font-medium mb-6">
            {activeGame.description}
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={`/game/${activeGame.slug}`}
              className="sketch-btn text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 group hover:scale-[1.03] active:scale-[0.98] transition-all inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY NOW</span>
            </Link>
          </div>
        </div>

        {/* Big Preview Frame (hidden on smaller tablet screens) */}
        <div className="w-[180px] h-[135px] lg:w-[280px] lg:h-[210px] shrink-0 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group/thumb hidden lg:block">
          <img
            src={activeGame.thumbnail}
            alt={activeGame.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current text-indigo-400" />
              <span>Launch Cabinet</span>
            </span>
          </div>
        </div>

        {/* Mobile slide control buttons */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 md:hidden">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-lg bg-black/60 border border-slate-800 text-slate-300 flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-lg bg-black/60 border border-slate-800 text-slate-300 flex items-center justify-center backdrop-blur-sm"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile bottom progress dashes */}
        <div className="absolute bottom-6 left-6 z-20 flex gap-1.5 md:hidden">
          {featuredGames.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="h-1 rounded-full bg-slate-800 overflow-hidden relative w-6"
              aria-label={`Go to slide ${idx + 1}`}
            >
              {idx === activeIndex && (
                <span 
                  className="absolute inset-y-0 left-0 bg-indigo-500 transition-all ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR: Vertical list selectors (hidden on mobile, visible md and up) */}
      <div className="hidden md:flex flex-col w-[260px] lg:w-[320px] bg-[#090d16]/50 border-l border-slate-800/80 p-4 justify-between select-none">
        <div className="space-y-2 flex-1 flex flex-col justify-center">
          {featuredGames.map((game, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={game.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? "bg-[#1b2234] border border-indigo-500/20 shadow-md scale-[1.02]" 
                    : "hover:bg-[#121824]/60 border border-transparent opacity-75 hover:opacity-100 hover:scale-[1.01]"
                }`}
              >
                {/* Mini Thumbnail */}
                <div className="w-12 h-9 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                  <img src={game.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Title and Genre info */}
                <div className="text-left flex-1 min-w-0">
                  <h3 className={`font-semibold text-xs truncate ${isActive ? "text-white" : "text-slate-400"}`}>
                    {game.title}
                  </h3>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                    {game.category}
                  </span>
                </div>

                {/* Progress bar loader under active selector */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#121824]">
                    <div 
                      className="h-full bg-indigo-500 transition-all ease-linear"
                      style={{ 
                        width: `${progress}%`,
                        transitionDuration: "50ms"
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
