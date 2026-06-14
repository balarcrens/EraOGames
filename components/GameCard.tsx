"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Game } from "@/types";
import { Star, Play, Eye, ThumbsUp } from "lucide-react";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Sync favorites state from localStorage on load
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
      setIsFavorite(favs.includes(game.slug));
    } catch (_) {}

    // Dynamic listen for updates from other cards or filters
    const handleFavsUpdate = () => {
      try {
        const favs = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
        setIsFavorite(favs.includes(game.slug));
      } catch (_) {}
    };

    window.addEventListener("favorites_updated", handleFavsUpdate);
    return () => window.removeEventListener("favorites_updated", handleFavsUpdate);
  }, [game.slug]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
      let newFavs;
      if (favs.includes(game.slug)) {
        newFavs = favs.filter((s: string) => s !== game.slug);
        setIsFavorite(false);
      } else {
        newFavs = [...favs, game.slug];
        setIsFavorite(true);
      }
      localStorage.setItem("eraogames_favorites", JSON.stringify(newFavs));
      // Dispatch a custom event to notify other components to refresh
      window.dispatchEvent(new Event("favorites_updated"));
    } catch (_) {}
  };

  // We offset grid alignments slightly for fluid visuals without rotations
  const marginTop = index % 3 === 1 ? "lg:mt-2" : index % 3 === 2 ? "lg:mt-1" : "";

  return (
    <Link
      href={`/game/${game.slug}`}
      className={`sketch-card block group ${marginTop} overflow-hidden`}
      aria-label={`Play free game: ${game.title}. Like Ratio: ${Math.round((game.rating / 5) * 100)}%`}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-[#0b0e14]">
        <img
          src={game.thumbnail}
          alt={`Thumbnail capture of the game ${game.title}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
          loading="lazy"
        />

        {/* Dynamic Hover Play Overlay */}
        <div className="play-overlay">
          <div className="play-icon">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Category Badge tag */}
        <div className="absolute top-2.5 left-2.5">
          <span className="doodle-badge text-[9px] bg-white/95 dark:bg-[#0e1320]/95 text-indigo-600 dark:text-violet-400 border border-slate-200 dark:border-slate-800 shadow-sm px-2 py-0.5">
            {game.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500 dark:bg-emerald-600 text-white shadow-md text-[10px] font-bold rounded-lg tracking-wide border border-emerald-400/20">
          <ThumbsUp className="w-3 h-3 fill-current shrink-0" />
          <span>{Math.round((game.rating / 5) * 100)}%</span>
        </div>

        {/* Interactive Star Favorite Button overlay */}
        <button
          onClick={toggleFavorite}
          className={`absolute bottom-2.5 right-2.5 z-20 w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-sm ${
            isFavorite
              ? "bg-amber-400 border-amber-400 text-slate-900 scale-100"
              : "bg-white/80 hover:bg-white dark:bg-[#0e1320]/80 dark:hover:bg-[#0e1320] border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500 hover:scale-105"
          }`}
          aria-label={isFavorite ? `Remove ${game.title} from favorites bookmark shelf` : `Add ${game.title} to favorites bookmark shelf`}
        >
          <Star className={`w-4 h-4 ${isFavorite ? "fill-current text-slate-900" : ""}`} />
        </button>
      </div>

      {/* Info card text block below image */}
      <div className="p-3.5 bg-white dark:bg-[#0e1320] border-t border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
        <h3 className="font-display font-bold text-sm md:text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">
          {game.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{game.plays.toLocaleString()} plays</span>
          </span>
          <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-600 dark:text-violet-400">
            OG Era
          </span>
        </div>
      </div>
    </Link>
  );
}
