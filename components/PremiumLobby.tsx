"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Game, GameCategory } from "@/types";
import FeaturedHero from "./FeaturedHero";
import GameShelf from "./GameShelf";
import GameGrid from "./GameGrid";
import { 
  Gamepad2, Star, Flame, Award, Swords, Car, Brain, Compass, Users, Trophy, Sparkles, Search, ArrowRight 
} from "lucide-react";

interface PremiumLobbyProps {
  games: Game[];
  categories: { name: GameCategory }[];
}

const catIconMap: Record<GameCategory, React.ComponentType<{ className?: string }>> = {
  Action: Swords,
  Racing: Car,
  Puzzle: Brain,
  Adventure: Compass,
  Multiplayer: Users,
  Sports: Trophy,
  Arcade: Gamepad2,
};

const catColorMap: Record<GameCategory, string> = {
  Action: "text-red-500 bg-red-500/10 border-red-500/20",
  Racing: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  Puzzle: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  Adventure: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Multiplayer: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  Sports: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  Arcade: "text-pink-500 bg-pink-500/10 border-pink-500/20",
};

export default function PremiumLobby({ games, categories }: PremiumLobbyProps) {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync favorites from LocalStorage on mount
  useEffect(() => {
    const syncFavs = () => {
      try {
        const favSlugs: string[] = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
        const list = games.filter((g) => favSlugs.includes(g.slug));
        setFavorites(list);
      } catch (_) {}
    };

    syncFavs();
    window.addEventListener("favorites_updated", syncFavs);
    return () => window.removeEventListener("favorites_updated", syncFavs);
  }, [games]);

  // Derived curated lists for shelves
  const trendingGames = [...games].sort((a, b) => b.plays - a.plays).slice(0, 16);
  const topRatedGames = [...games].sort((a, b) => b.rating - a.rating).slice(0, 16);
  
  const actionGames = games.filter((g) => g.category === "Action").slice(0, 16);
  const puzzleGames = games.filter((g) => g.category === "Puzzle").slice(0, 16);
  const racingGames = games.filter((g) => g.category === "Racing").slice(0, 16);

  // Grid Highlights at the bottom (excluding the featured spotlight ones)
  const bottomGridGames = games.slice(12, 24);

  return (
    <div className="w-full space-y-12">
      {/* 1. Dynamic Hero Showcase */}
      <FeaturedHero />

      {/* 2. Quick Search & Category Navigation Bar */}
      <div className="bg-white dark:bg-[#0e1320] border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-3xl shadow-premium flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Category List */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none snap-x">
          {categories.map((cat) => {
            const CatIcon = catIconMap[cat.name];
            const colorClass = catColorMap[cat.name] || "text-indigo-500 bg-indigo-500/10 border-indigo-500/20";
            return (
              <Link
                key={cat.name}
                href={`/category/${cat.name.toLowerCase()}`}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shrink-0 snap-start bg-slate-50 dark:bg-[#121824] hover:bg-slate-100 dark:hover:bg-[#1b2234] text-slate-700 dark:text-gray-200 border-slate-200 dark:border-slate-800`}
              >
                {CatIcon && <CatIcon className={`w-4 h-4 ${colorClass.split(" ")[0]}`} />}
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-[320px] shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/games?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
          >
            <input
              type="text"
              placeholder="Search 2,000+ arcade games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-xl font-sans text-xs sm:text-sm text-slate-800 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
            />
          </form>
        </div>
      </div>

      {/* 3. Bookmarks Shelf (only rendered if user has saved items) */}
      {favorites.length > 0 && (
        <div className="animate-sketch-in">
          <GameShelf
            title="Your Bookmarks"
            subtitle="Pick up exactly where you left off"
            games={favorites}
            icon={<Star className="w-5 h-5 text-amber-500 fill-current" />}
          />
          <div className="border-t border-slate-200/50 dark:border-slate-800/60 pt-6 mt-6" />
        </div>
      )}

      {/* 4. Curated Game Shelves */}
      <div className="space-y-6">
        {/* Hot & Trending */}
        <GameShelf
          title="Hot & Trending"
          subtitle="The most popular browser games right now"
          games={trendingGames}
          icon={<Flame className="w-5 h-5 text-orange-500 fill-current" />}
          viewAllLink="/games?sortBy=popular"
        />

        {/* Top Rated Classics */}
        <GameShelf
          title="Top Rated Classics"
          subtitle="Highest liked and reviewed by players"
          games={topRatedGames}
          icon={<Award className="w-5 h-5 text-yellow-500" />}
          viewAllLink="/games?sortBy=rating"
        />

        {/* Action Zone */}
        <GameShelf
          title="Action Zone"
          subtitle="Fast-paced battles, merges, and target shooting"
          games={actionGames}
          icon={<Swords className="w-5 h-5 text-red-500" />}
          viewAllLink="/category/action"
        />

        {/* Mind Puzzles */}
        <GameShelf
          title="Mind Puzzles"
          subtitle="Relaxing logic, memory games, and suika merges"
          games={puzzleGames}
          icon={<Brain className="w-5 h-5 text-blue-500" />}
          viewAllLink="/category/puzzle"
        />

        {/* Speed Racing */}
        <GameShelf
          title="Speed & Drift"
          subtitle="High-speed chases, loops, and driver mayhem"
          games={racingGames}
          icon={<Car className="w-5 h-5 text-orange-500" />}
          viewAllLink="/category/racing"
        />
      </div>

      {/* 5. Bottom Highlight Bento Grid */}
      <div className="border-t border-slate-200/60 dark:border-slate-800/80 pt-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/30 flex items-center justify-center text-violet-500 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white tracking-wide uppercase leading-none">
                Arcade Room Highlights
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">
                A hand-picked selection of top web games
              </p>
            </div>
          </div>
        </div>

        <GameGrid games={bottomGridGames} />

        {/* Central CTA to browse everything */}
        <div className="flex justify-center mt-12">
          <Link
            href="/games"
            className="sketch-btn px-10 py-4 group hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 shadow-xl"
          >
            <Gamepad2 className="w-5.5 h-5.5 animate-pulse" />
            <span>Launch Full Arcade Explorer</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
