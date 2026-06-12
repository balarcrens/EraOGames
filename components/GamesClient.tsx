"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Game, GameCategory } from "@/types";
import GameGrid from "./GameGrid";
import {
  SearchIcon,
  RatingStarIcon,
  GridIcon,
  CloseIcon,
  GamepadIcon,
  ActionIcon,
  RacingIcon,
  PuzzleIcon,
  AdventureIcon,
  MultiplayerIcon,
  SportsIcon,
  ArcadeIcon,
} from "./Icons";

interface GamesClientProps {
  games: Game[];
  categories: { name: GameCategory }[];
}

const catIconMap: Record<GameCategory, React.FC<{ className?: string }>> = {
  Action: ActionIcon,
  Racing: RacingIcon,
  Puzzle: PuzzleIcon,
  Adventure: AdventureIcon,
  Multiplayer: MultiplayerIcon,
  Sports: SportsIcon,
  Arcade: ArcadeIcon,
};

export default function GamesClient({ games, categories }: GamesClientProps) {
  const searchParams = useSearchParams();

  // State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [minRating, setMinRating] = useState<number>(0);

  // Initialize from URL search parameters
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");
    if (urlSearch) {
      setSearch(urlSearch);
    }
    if (urlCategory) {
      setCategory(urlCategory.toLowerCase());
    }
  }, [searchParams]);

  // Sync state back to URL query parameters dynamically (without page refresh lag)
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category !== "all") params.set("category", category);
    if (sortBy !== "popular") params.set("sortBy", sortBy);
    if (minRating > 0) params.set("minRating", minRating.toString());

    const queryString = params.toString();
    const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [search, category, sortBy, minRating]);

  // Helper to count games in categories based on search/rating criteria (excluding category filter itself)
  const getCategoryCount = (catName: string) => {
    return games.filter((g) => {
      const matchesSearch =
        search === "" ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase());
      const matchesRating = g.rating >= minRating;
      const matchesCat = g.category.toLowerCase() === catName.toLowerCase();
      return matchesSearch && matchesRating && matchesCat;
    }).length;
  };

  const totalFilteredCount = useMemo(() => {
    return games.filter((g) => {
      const matchesSearch =
        search === "" ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase());
      const matchesRating = g.rating >= minRating;
      const matchesCategory =
        category === "all" || g.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesRating && matchesCategory;
    }).length;
  }, [games, search, category, minRating]);

  // Filter and Sort Games
  const filteredAndSortedGames = useMemo(() => {
    let result = games.filter((g) => {
      const matchesSearch =
        search === "" ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase());
      const matchesRating = g.rating >= minRating;
      const matchesCategory =
        category === "all" || g.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesRating && matchesCategory;
    });

    // Sort
    return result.sort((a, b) => {
      if (sortBy === "popular") {
        return b.plays - a.plays;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "alpha") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [games, search, category, sortBy, minRating]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("popular");
    setMinRating(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div
          className="sticky-note p-5 md:p-6"
          style={{
            borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            transform: "rotate(-0.5deg)",
          }}
        >
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-dashed border-[#e5e0d8] dark:border-[#44444a]">
            <h2 className="text-lg font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
              <GridIcon className="w-5 h-5 text-[#2d2d2d] dark:text-[#fdfbf7]" />
              Filter Board
            </h2>
            {(search || category !== "all" || sortBy !== "popular" || minRating > 0) && (
              <button
                onClick={resetFilters}
                className="text-xs font-hand font-bold text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-2 mb-5">
            <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
              Search Games
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d2d2d]/40 dark:text-[#fdfbf7]/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type game name..."
                className="sketch-input pl-10 py-2.5"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2d2d2d]/40 dark:text-[#fdfbf7]/40 hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b]"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-2 mb-5">
            <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] font-hand text-sm text-[#2d2d2d] dark:text-[#fdfbf7] focus:outline-none appearance-none cursor-pointer"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                <option value="popular">🔥 Most Played</option>
                <option value="rating">⭐️ Top Rated</option>
                <option value="alpha">🔤 Alphabetical (A-Z)</option>
              </select>
              <div className="absolute pointer-events-none right-3 top-1/2 -translate-y-1/2 text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 font-bold">
                ▼
              </div>
            </div>
          </div>

          {/* Min Rating Slider */}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
                Min Rating
              </label>
              <span className="text-xs font-hand font-bold text-[#ff4d4d] dark:text-[#ff6b6b] flex items-center gap-0.5">
                <RatingStarIcon className="w-3.5 h-3.5" />
                {minRating > 0 ? `${minRating.toFixed(1)}+` : "Any"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full accent-[#ff4d4d] dark:accent-[#ff6b6b] cursor-pointer bg-white dark:bg-[#242429] h-2 rounded border border-[#2d2d2d] dark:border-[#fdfbf7]"
            />
            <div className="flex justify-between text-[10px] font-hand text-[#2d2d2d]/40 dark:text-[#fdfbf7]/40">
              <span>0.0</span>
              <span>2.5</span>
              <span>5.0</span>
            </div>
          </div>

          {/* Category List */}
          <div className="space-y-2">
            <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
              Categories
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setCategory("all")}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-hand font-bold border-2 transition-all duration-150 ${
                  category === "all"
                    ? "bg-[#ff4d4d] text-white border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm"
                    : "bg-white dark:bg-[#242429] text-[#2d2d2d] dark:text-[#fdfbf7] border-transparent hover:bg-[#2d2d2d]/5 dark:hover:bg-white/5"
                }`}
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                <span className="flex items-center gap-2">
                  <GamepadIcon className="w-4 h-4" />
                  All Games
                </span>
                <span className={`text-xs ${category === "all" ? "text-white" : "text-[#2d2d2d]/40 dark:text-[#fdfbf7]/40"}`}>
                  {games.length}
                </span>
              </button>

              {categories.map((cat) => {
                const CatIcon = catIconMap[cat.name];
                const isActive = category === cat.name.toLowerCase();
                const currentCatCount = getCategoryCount(cat.name);
                return (
                  <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name.toLowerCase())}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-hand font-bold border-2 transition-all duration-150 ${
                      isActive
                        ? "bg-[#2d5da1] text-white border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm"
                        : "bg-white dark:bg-[#242429] text-[#2d2d2d] dark:text-[#fdfbf7] border-transparent hover:bg-[#2d2d2d]/5 dark:hover:bg-white/5"
                    }`}
                    style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
                  >
                    <span className="flex items-center gap-2">
                      {CatIcon && <CatIcon className="w-4 h-4" />}
                      {cat.name}
                    </span>
                    <span className={`text-xs ${isActive ? "text-white" : "text-[#2d2d2d]/40 dark:text-[#fdfbf7]/40"}`}>
                      {currentCatCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid Results */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-[#e5e0d8] dark:border-[#44444a]">
          <h1 className="text-xl md:text-2xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            🧭 Game Explorer
          </h1>
          <p className="font-hand text-sm text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
            Found <span className="font-bold text-[#2d2d2d] dark:text-[#fdfbf7]">{totalFilteredCount}</span> game
            {totalFilteredCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filters Summary Badges */}
        {(search || category !== "all" || minRating > 0) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50">Active filters:</span>
            {category !== "all" && (
              <span
                className="doodle-badge text-[10px] flex items-center gap-1 hover:bg-red-50 dark:hover:bg-[#ff4d4d]/10 cursor-pointer"
                onClick={() => setCategory("all")}
              >
                Category: {category} <CloseIcon className="w-3 h-3 text-[#ff4d4d]" />
              </span>
            )}
            {search && (
              <span
                className="doodle-badge text-[10px] flex items-center gap-1 hover:bg-red-50 dark:hover:bg-[#ff4d4d]/10 cursor-pointer"
                onClick={() => setSearch("")}
              >
                Search: &quot;{search}&quot; <CloseIcon className="w-3 h-3 text-[#ff4d4d]" />
              </span>
            )}
            {minRating > 0 && (
              <span
                className="doodle-badge text-[10px] flex items-center gap-1 hover:bg-red-50 dark:hover:bg-[#ff4d4d]/10 cursor-pointer"
                onClick={() => setMinRating(0)}
              >
                Rating: &gt;={minRating.toFixed(1)} <CloseIcon className="w-3 h-3 text-[#ff4d4d]" />
              </span>
            )}
          </div>
        )}

        {/* Games Display */}
        {filteredAndSortedGames.length > 0 ? (
          <GameGrid games={filteredAndSortedGames} columns={3} />
        ) : (
          <div
            className="text-center py-20 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch flex flex-col items-center justify-center p-8"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          >
            <div
              className="w-16 h-16 bg-[#ff4d4d]/10 border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center mb-4 text-[#ff4d4d]"
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
            >
              <GamepadIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-1">
              No matching games found!
            </h3>
            <p className="font-hand text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 mb-6 max-w-sm">
              We couldn&apos;t find any games matching your current filters. Try relaxing your search
              term or resetting the filters.
            </p>
            <button onClick={resetFilters} className="sketch-btn text-xs hover:bg-[#ff4d4d] hover:text-white dark:hover:bg-[#ff6b6b]">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
