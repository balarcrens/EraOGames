"use client";

import Link from "next/link";
import type { Game } from "@/types";
import { Play, Eye, ThumbsUp } from "lucide-react";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="w-full h-full relative">
      <Link
        href={`/game/${game.slug}`}
        className="w-full h-full block group relative overflow-hidden rounded-xl md:rounded-2xl bg-[#0b0e14] shadow-premium transition-all duration-300 hover:scale-[1.02] hover:shadow-glow hover:border-indigo-500/60 dark:hover:border-violet-500/60"
        aria-label={`Play free game: ${game.title}. Like Ratio: ${Math.round((game.rating / 5) * 100)}%`}
      >
        {/* Full bleed thumbnail */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Dark gradient overlay — stronger at bottom for legible text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-xl shadow-violet-500/50 scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Category badge — top left */}
        <div className="absolute top-2 left-2 pointer-events-none">
          <span className="inline-flex items-center px-1.5 py-0.5 text-[7px] sm:text-[8px] font-bold uppercase tracking-wider bg-black/50 text-violet-300 border border-violet-500/20 rounded backdrop-blur-sm leading-none">
            {game.category}
          </span>
        </div>

        {/* Like ratio badge — top right */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500/90 text-white text-[7px] sm:text-[8px] font-bold rounded tracking-wide pointer-events-none">
          <ThumbsUp className="w-2 h-2 fill-current shrink-0" />
          <span>{Math.round((game.rating / 5) * 100)}%</span>
        </div>

        {/* Game title + plays — bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5 pt-6 pointer-events-none">
          <h3 className="font-display font-bold leading-tight line-clamp-2 text-white text-[10px] sm:text-[11px] md:text-xs lg:text-sm tracking-wide">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 mt-0.5 text-[8px] sm:text-[9px] text-slate-400 font-medium uppercase tracking-wider">
            <Eye className="w-2.5 h-2.5 shrink-0" />
            <span>{game.plays.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
