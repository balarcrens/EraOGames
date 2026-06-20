"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Game } from "@/types";
import GameCard from "./GameCard";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface GameShelfProps {
  title: string;
  subtitle?: string;
  games: readonly Game[];
  icon?: React.ReactNode;
  viewAllLink?: string;
}

export default function GameShelf({ title, subtitle, games, icon, viewAllLink }: GameShelfProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth * 0.75,
        behavior: "smooth",
      });
    }
  };

  if (games.length === 0) return null;

  return (
    <section className="relative w-full py-6 group/shelf">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center text-indigo-500 shadow-sm">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white tracking-wide uppercase leading-none">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-violet-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-violet-500/60 bg-white dark:bg-[#121824] transition-all hover:scale-[1.02] shadow-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Outer Slider Box with Absolute Arrows */}
      <div className="relative w-full">
        {/* Left Arrow Button */}
        <button
          onClick={handleScrollLeft}
          className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#121824] hover:bg-slate-50 dark:hover:bg-[#172030] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-center opacity-0 group-hover/shelf:opacity-100 transition-opacity duration-300 pointer-events-auto backdrop-blur-sm hidden md:flex"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleScrollRight}
          className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#121824] hover:bg-slate-50 dark:hover:bg-[#172030] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-center opacity-0 group-hover/shelf:opacity-100 transition-opacity duration-300 pointer-events-auto backdrop-blur-sm hidden md:flex"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrolling Inner Container */}
        <div
          ref={scrollContainerRef}
          className="w-full flex gap-3.5 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              className="w-[140px] sm:w-[170px] md:w-[200px] aspect-[4/3] shrink-0 snap-start"
            >
              <div className="w-full h-full relative">
                <GameCard game={game} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
