"use client";

import { useState } from "react";
import Link from "next/link";
import { games } from "@/data/games";
import type { Game } from "@/types";
import { Play, Star, ChevronRight } from "lucide-react";

const FEATURED_SLUGS = [
  "momentum",
  "street-mayhem-driver",
  "turret-defend-apocalypse",
  "number-slide",
  "off-the-hook-ring-puzzle"
];

export default function FeaturedHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Retrieve full game data based on the featured slugs
  const featuredGames = FEATURED_SLUGS.map((slug) => games.find((g) => g.slug === slug)).filter((g): g is Game => !!g);

  if (featuredGames.length < 3) return null;

  const activeGame = featuredGames[activeIndex]!;
  const rightIndex1 = (activeIndex + 1) % featuredGames.length;
  const rightIndex2 = (activeIndex + 2) % featuredGames.length;
  
  const rightGame1 = featuredGames[rightIndex1]!;
  const rightGame2 = featuredGames[rightIndex2]!;

  return (
    <section className="w-full py-8">
      {/* Header Bar */}
      <div className="flex items-end justify-between mb-6 px-1">
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide">
            Featured Masterpieces
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
            Hand-picked premium experiences
          </p>
        </div>
        <Link
          href="/games?sortBy=rating"
          className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider"
        >
          <span>View All Featured</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid Layout (1 Large left, 2 stacked small right) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Columns - Large Card (Spans 3 cols on large screens) */}
        <div key={activeGame.slug} className="animate-fade-in lg:col-span-3 relative h-[280px] sm:h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-[#0C0F17] group">
          {/* Background image */}
          <img
            src={activeGame.thumbnail}
            alt={activeGame.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

          {/* Bottom-left details (Badge + Title + Metadata stacked) */}
          <div className="absolute bottom-6 left-6 right-20 text-left pointer-events-none flex flex-col gap-2">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-cyan-400 text-slate-950 rounded-md leading-none shadow-md">
                Featured
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-white leading-tight uppercase line-clamp-1">
              {activeGame.title}
            </h3>
            
            <div className="flex items-center gap-3.5 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{activeGame.rating.toFixed(1)}</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="uppercase tracking-wider">{activeGame.category} / RPG</span>
            </div>
          </div>

          {/* Circular Play Button Bottom-Right */}
          <Link
            href={`/game/${activeGame.slug}`}
            className="absolute bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-400 hover:to-fuchsia-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label={`Play ${activeGame.title} now`}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </Link>
        </div>

        {/* Right Columns - Stacked Cards (Spans 2 cols on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Small Card 1 (Interactive) */}
          <div 
            onClick={() => setActiveIndex(rightIndex1)}
            className="relative flex-1 h-[120px] sm:h-[190px] lg:h-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-900 bg-white dark:bg-[#0C0F17] group cursor-pointer"
          >
            <img
              src={rightGame1.thumbnail}
              alt={rightGame1.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 text-left">
              <h4 className="text-lg md:text-xl font-sans font-bold text-white uppercase line-clamp-1">
                {rightGame1.title}
              </h4>
              <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider mt-0.5">
                {rightGame1.category} • Match
              </p>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-0.5 text-xs text-amber-400 font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>{rightGame1.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Small Card 2 (Interactive) */}
          <div 
            onClick={() => setActiveIndex(rightIndex2)}
            className="relative flex-1 h-[140px] sm:h-[190px] lg:h-auto rounded-2xl overflow-hidden border border-slate-900 bg-[#0C0F17] group cursor-pointer"
          >
            <img
              src={rightGame2.thumbnail}
              alt={rightGame2.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 text-left">
              <h4 className="text-lg md:text-xl font-sans font-bold text-white uppercase line-clamp-1">
                {rightGame2.title}
              </h4>
              <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wider mt-0.5">
                {rightGame2.category} • Match
              </p>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-0.5 text-xs text-amber-400 font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>{rightGame2.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
