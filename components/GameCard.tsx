"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Game } from "@/types";
import { Play, Eye, ThumbsUp, Heart, ArrowRight } from "lucide-react";

interface GameCardProps {
  game: Game;
  index?: number;
  variant?: "overlay" | "below" | "popular" | "fresh";
}

export default function GameCard({ game, variant = "overlay", index = 0 }: GameCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Sync favorites state on mount and update
  useEffect(() => {
    const syncFav = () => {
      try {
        const favSlugs: string[] = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
        setIsFavorite(favSlugs.includes(game.slug));
      } catch (_) {}
    };
    syncFav();
    window.addEventListener("favorites_updated", syncFav);
    return () => window.removeEventListener("favorites_updated", syncFav);
  }, [game.slug]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favSlugs: string[] = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
      let nextFavs;
      if (favSlugs.includes(game.slug)) {
        nextFavs = favSlugs.filter((s) => s !== game.slug);
      } else {
        nextFavs = [...favSlugs, game.slug];
      }
      localStorage.setItem("eraogames_favorites", JSON.stringify(nextFavs));
      setIsFavorite(!favSlugs.includes(game.slug));
      window.dispatchEvent(new Event("favorites_updated"));
    } catch (_) {}
  };

  // Get neon hover border class depending on game category
  const getHoverBorderClass = () => {
    switch (game.category) {
      case "Action":
        return "hover:border-red-500/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]";
      case "Racing":
        return "hover:border-orange-500/60 hover:shadow-[0_0_15px_rgba(249,115,22,0.25)]";
      case "Puzzle":
        return "hover:border-blue-500/60 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]";
      case "Adventure":
        return "hover:border-emerald-500/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]";
      case "Multiplayer":
        return "hover:border-violet-500/60 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]";
      case "Sports":
        return "hover:border-indigo-500/60 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]";
      default:
        return "hover:border-pink-500/60 hover:shadow-[0_0_15px_rgba(236,72,153,0.25)]";
    }
  };

  // Variant 1: Below Image Details (Trending Right Now style)
  if (variant === "below") {
    return (
      <Link
        href={`/game/${game.slug}`}
        className="block group w-full text-left"
        aria-label={`Play ${game.title}`}
      >
        <div className={`relative aspect-[16/11] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-[#0C0F17] border border-slate-200 dark:border-slate-900 transition-all duration-500 ease-out group-hover:sm:scale-105 group-hover:sm:-translate-y-1 ${getHoverBorderClass()}`}>
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Play button hover overlay - always visible on mobile */}
          <div className="absolute inset-0 bg-black/30 sm:bg-black/40 opacity-100 sm:opacity-0 group-hover:sm:opacity-100 transition-all duration-400 flex items-center justify-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg transform scale-100 sm:scale-75 group-hover:sm:scale-100 transition-transform duration-300">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>
          
          {/* Mini overlay tag on top-left */}
          <div className="absolute top-2 left-2 pointer-events-none z-10">
            {index === 0 ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] font-extrabold uppercase bg-red-500 text-white border border-red-400/20 rounded shadow-md leading-none">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                HOT
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[8px] font-bold uppercase bg-black/60 text-slate-300 border border-slate-800 rounded backdrop-blur-sm">
                {game.category}
              </span>
            )}
          </div>
        </div>

        {/* Text details below the image */}
        <div className="mt-3.5 px-1">
          <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
            {game.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-wider flex items-center gap-1.5">
            <span>{game.category}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>{game.plays.toLocaleString()} Plays</span>
          </p>
        </div>
      </Link>
    );
  }

  // Variant 2: Popular Card Frame (All Popular Titles style)
  if (variant === "popular") {
    return (
      <Link
        href={`/game/${game.slug}`}
        className={`relative flex flex-col justify-between h-full bg-white/60 dark:bg-[#0C0F17]/60 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group ${getHoverBorderClass()}`}
        aria-label={`Play ${game.title}`}
      >
        <div className="w-full">
          {/* Card image container */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-[#0C0F17] border border-slate-200 dark:border-slate-900/60 mb-3 shrink-0">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Play button hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Interactive Favorite/Heart Absolute Button on Top-Right */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-lg border backdrop-blur-md transition-all z-20 shadow-md ${
              isFavorite
                ? "bg-red-500/20 border-red-500/40 text-red-500 scale-105"
                : "bg-black/50 border-slate-800 text-slate-400 hover:text-white"
            }`}
            title={isFavorite ? "Remove from bookmarks" : "Save to bookmarks"}
            aria-label="Toggle favorite bookmark"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          {/* Text Title details */}
          <div className="px-1 text-left">
            <h3 className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1 leading-snug">
              {game.title}
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">
              {game.category}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Variant 3: Fresh Release Card (Fresh Releases style)
  if (variant === "fresh") {
    // Generate a tag depending on the index matching the reference image (NEW, HOT, NEW, HOT)
    const tags = ["NEW", "HOT", "NEW", "HOT"];
    const tag = tags[index % tags.length]!;
    const badgeColors = {
      NEW: "bg-cyan-400 text-slate-950 border-cyan-300/20",
      HOT: "bg-[#f97316] text-white border-orange-400/20",
    };
    
    return (
      <Link
        href={`/game/${game.slug}`}
        className={`relative flex flex-col justify-between h-[200px] sm:h-[260px] rounded-2xl overflow-hidden bg-white dark:bg-[#0C0F17] border border-slate-200 dark:border-slate-900 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group ${getHoverBorderClass()}`}
        aria-label={`Play fresh game ${game.title}`}
      >
        {/* Thumbnail Background */}
        <img
          src={game.thumbnail}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Ambient Dark Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

        {/* Top-Left Tag Badge */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <span className={`inline-flex items-center px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest border rounded leading-none shadow-md ${badgeColors[tag as keyof typeof badgeColors]}`}>
            {tag}
          </span>
        </div>

        {/* Bottom Details Row */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10 pointer-events-none">
          <div className="text-left flex-1 min-w-0 pr-2">
            <h3 className="font-sans font-extrabold text-sm sm:text-base text-white leading-tight uppercase line-clamp-1">
              {game.title}
            </h3>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider mt-0.5">
              {game.category}
            </p>
          </div>

          {/* Action indicator arrow */}
          <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-slate-900 dark:group-hover:bg-white text-white dark:text-white group-hover:text-white dark:group-hover:text-black flex items-center justify-center transition-all duration-300 shrink-0 shadow-md">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    );
  }

  // Default Variant: Standard Overlay (Home page shelf standard / fallback style)
  return (
    <div className="w-full h-full relative">
      <Link
        href={`/game/${game.slug}`}
        className={`w-full h-full block group relative overflow-hidden rounded-xl md:rounded-2xl bg-white dark:bg-[#0C0F17] shadow-premium border border-slate-200 dark:border-slate-900/60 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 ${getHoverBorderClass()}`}
        aria-label={`Play free game: ${game.title}`}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-xl scale-75 group-hover:scale-100 transition-all duration-400 ease-out">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2 pointer-events-none">
          <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-black/60 text-violet-300 border border-violet-500/20 rounded backdrop-blur-sm leading-none">
            {game.category}
          </span>
        </div>

        {/* Likes Match Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500/90 text-white text-[8px] font-bold rounded tracking-wide pointer-events-none">
          <ThumbsUp className="w-2 h-2 fill-current shrink-0" />
          <span>{Math.round((game.rating / 5) * 100)}%</span>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6 pointer-events-none">
          <h3 className="font-sans font-bold leading-tight line-clamp-1 text-white text-xs tracking-wide">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-400 font-medium uppercase tracking-wider">
            <Eye className="w-2.5 h-2.5 shrink-0" />
            <span>{game.plays.toLocaleString()} plays</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
