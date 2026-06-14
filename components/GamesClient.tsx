"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Game, GameCategory } from "@/types";
import GameGrid from "./GameGrid";
import {
  Search,
  X,
  SlidersHorizontal,
  Flame,
  Star,
  Gamepad2,
  Swords,
  Car,
  Brain,
  Compass,
  Users,
  Trophy,
  Gamepad,
  Filter,
  ChevronLeft,
  ChevronRight,
  ThumbsUp
} from "lucide-react";

interface GamesClientProps {
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
  Arcade: Gamepad,
};

const ITEMS_PER_PAGE = 12;

export default function GamesClient({ games, categories }: GamesClientProps) {
  const searchParams = useSearchParams();

  // State filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [minRating, setMinRating] = useState<number>(0);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination page state
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync bookmarks list from LocalStorage
  const [favoritesList, setFavoritesList] = useState<string[]>([]);

  useEffect(() => {
    const syncFavs = () => {
      try {
        const favs = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
        setFavoritesList(favs);
      } catch (_) {}
    };
    syncFavs();
    window.addEventListener("favorites_updated", syncFavs);
    return () => window.removeEventListener("favorites_updated", syncFavs);
  }, []);

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

  // Sync state back to URL query parameters dynamically
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

  // Reset page to 1 when filters are toggled
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy, minRating, favoritesOnly]);

  // Helper to count games in categories based on search/rating criteria (excluding category filter itself)
  const getCategoryCount = (catName: string) => {
    return games.filter((g) => {
      const matchesSearch =
        search === "" ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase());
      const matchesRating = g.rating >= minRating;
      const matchesCat = g.category.toLowerCase() === catName.toLowerCase();
      const matchesFavorites = !favoritesOnly || favoritesList.includes(g.slug);
      return matchesSearch && matchesRating && matchesCat && matchesFavorites;
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
      const matchesFavorites = !favoritesOnly || favoritesList.includes(g.slug);
      return matchesSearch && matchesRating && matchesCategory && matchesFavorites;
    }).length;
  }, [games, search, category, minRating, favoritesOnly, favoritesList]);

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
      const matchesFavorites = !favoritesOnly || favoritesList.includes(g.slug);
      return matchesSearch && matchesRating && matchesCategory && matchesFavorites;
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
  }, [games, search, category, sortBy, minRating, favoritesOnly, favoritesList]);

  // Paginated Games slice
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedGames.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedGames, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedGames.length / ITEMS_PER_PAGE);

  const paginationRange = useMemo(() => {
    const range: (number | string)[] = [];
    if (totalPages <= 1) return range;

    const siblingCount = isMobile ? 1 : 2;
    const totalPageNumbers = siblingCount * 2 + 5; // First + Last + Active + Siblings + Dots

    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    range.push(1);

    if (shouldShowLeftDots) {
      range.push("dots-left");
    } else {
      for (let i = 2; i < leftSiblingIndex; i++) {
        range.push(i);
      }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      range.push(i);
    }

    if (shouldShowRightDots) {
      range.push("dots-right");
    } else {
      for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
        range.push(i);
      }
    }

    range.push(totalPages);

    return range;
  }, [totalPages, currentPage, isMobile]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll page back to explorer title header
    const element = document.getElementById("game-explorer-header");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("popular");
    setMinRating(0);
    setFavoritesOnly(false);
  };

  const renderFilterContent = (isMobile = false) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <h2 className="text-base font-display font-bold text-slate-800 dark:text-gray-100 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
            <span>Filter Panel</span>
          </h2>
          {isMobile ? (
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
              aria-label="Close filters menu"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            (search || category !== "all" || sortBy !== "popular" || minRating > 0 || favoritesOnly) && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-violet-500 dark:text-violet-400 hover:underline"
                aria-label="Clear all active search filters"
              >
                Clear All
              </button>
            )
          )}
        </div>

        {/* Clear All button for mobile if active */}
        {isMobile && (search || category !== "all" || sortBy !== "popular" || minRating > 0 || favoritesOnly) && (
          <button
            onClick={resetFilters}
            className="w-full py-2.5 px-4 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-xl text-xs font-bold transition-all border border-violet-100 dark:border-violet-900/30 hover:border-violet-500"
            aria-label="Clear all active search filters"
          >
            Clear All Active Filters
          </button>
        )}

        {/* Search Box */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Search Games
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="sketch-input pl-10 pr-9 py-2 text-sm"
              aria-label="Search game database text input"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 dark:text-slate-500 transition-colors"
                aria-label="Clear search text query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800/80 rounded-xl font-sans text-sm text-slate-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40 appearance-none cursor-pointer"
              aria-label="Sort list sort order selection"
            >
              <option value="popular">Most Played</option>
              <option value="rating">Highest Liked</option>
              <option value="alpha">Alphabetical (A-Z)</option>
            </select>
            <div className="absolute pointer-events-none right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Min Likes Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Min Likes
            </label>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
              <ThumbsUp className="w-3 h-3 fill-current" />
              {minRating > 0 ? `${Math.round(minRating * 20)}%+` : "Any"}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 dark:accent-emerald-600 cursor-pointer bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg"
            aria-label="Minimum rating threshold slider filter"
          />
          <div className="flex justify-between text-[10px] font-medium text-slate-400 dark:text-slate-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Categories
          </label>
          <div className="space-y-1">
            {/* Favorites Bookmark Toggle Option */}
            <button
              onClick={() => {
                setFavoritesOnly(!favoritesOnly);
                setCategory("all");
                if (isMobile) setMobileFilterOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                favoritesOnly
                  ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/20"
                  : "bg-transparent text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
              aria-label="Filter games by bookmarks favorites shelf"
            >
              <span className="flex items-center gap-2">
                <Star className={`w-4 h-4 ${favoritesOnly ? 'fill-current text-slate-900' : 'text-amber-500'}`} />
                <span>Bookmarked</span>
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${favoritesOnly ? "bg-black/10 text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                {favoritesList.length}
              </span>
            </button>

            <button
              onClick={() => {
                setCategory("all");
                setFavoritesOnly(false);
                if (isMobile) setMobileFilterOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                category === "all" && !favoritesOnly
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
              aria-label="Filter list by all games"
            >
              <span className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>All Games</span>
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${category === "all" && !favoritesOnly ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                {games.length}
              </span>
            </button>

            {categories.map((cat) => {
              const CatIcon = catIconMap[cat.name];
              const isActive = category === cat.name.toLowerCase() && !favoritesOnly;
              const currentCatCount = getCategoryCount(cat.name);
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setCategory(cat.name.toLowerCase());
                    setFavoritesOnly(false);
                    if (isMobile) setMobileFilterOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                      : "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                  aria-label={`Filter games by category ${cat.name}`}
                >
                  <span className="flex items-center gap-2">
                    {CatIcon && <CatIcon className="w-4 h-4" />}
                    <span>{cat.name}</span>
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                    {currentCatCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar - Desktop Only */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-5 md:p-6 rounded-2xl shadow-premium sticky top-24">
          {renderFilterContent(false)}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileFilterOpen(false)}
          />
          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-[#121824] p-6 shadow-2xl flex flex-col h-full overflow-y-auto border-l border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-out translate-x-0">
            {renderFilterContent(true)}
          </div>
        </div>
      )}

      {/* Games Grid Results */}
      <div className="lg:col-span-3 space-y-6">
        <div id="game-explorer-header" className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 scroll-mt-24">
          <h1 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-500 animate-spin-slow" />
            <span>Game Explorer</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 hover:scale-[1.02]"
              aria-label="Open filter options menu"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
              Found <span className="text-slate-800 dark:text-white font-bold">{totalFilteredCount}</span> games
            </p>
          </div>
        </div>

        {/* Filters Summary Badges */}
        {(search || category !== "all" || minRating > 0 || favoritesOnly) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Active filters:</span>
            {category !== "all" && (
              <span
                className="doodle-badge text-[10px] flex items-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 hover:border-red-200 cursor-pointer transition-colors"
                onClick={() => setCategory("all")}
                aria-label="Remove category filter"
                role="button"
              >
                Category: {category} <X className="w-3 h-3 text-red-500" />
              </span>
            )}
            {favoritesOnly && (
              <span
                className="doodle-badge text-[10px] flex items-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 hover:border-red-200 cursor-pointer transition-colors"
                onClick={() => setFavoritesOnly(false)}
                aria-label="Remove bookmarks favorites filter"
                role="button"
              >
                Bookmarks Only <X className="w-3 h-3 text-red-500" />
              </span>
            )}
            {search && (
              <span
                className="doodle-badge text-[10px] flex items-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 hover:border-red-200 cursor-pointer transition-colors"
                onClick={() => setSearch("")}
                aria-label="Remove search filter"
                role="button"
              >
                Search: &quot;{search}&quot; <X className="w-3 h-3 text-red-500" />
              </span>
            )}
            {minRating > 0 && (
              <span
                className="doodle-badge text-[10px] flex items-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 hover:border-red-200 cursor-pointer transition-colors"
                onClick={() => setMinRating(0)}
                aria-label="Remove minimum rating filter"
                role="button"
              >
                Likes: &gt;={Math.round(minRating * 20)}% <X className="w-3 h-3 text-red-500" />
              </span>
            )}
          </div>
        )}

        {/* Games Display */}
        {filteredAndSortedGames.length > 0 ? (
          <div className="space-y-8">
            <GameGrid games={paginatedGames} columns={3} />
            
            {/* Centered Pagination Control board with aria attributes */}
            {totalPages > 1 && (
              <div 
                className="flex justify-center items-center gap-2 pt-6 border-t border-slate-100 dark:border-slate-800/80" 
                aria-label="Games list pagination"
                role="navigation"
              >
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 transition-colors"
                  aria-label="Go to previous games page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {paginationRange.map((pageNum, idx) => {
                  if (typeof pageNum === "string") {
                    return (
                      <span
                        key={`dots-${idx}`}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-slate-400 dark:text-slate-600 font-bold select-none text-xs md:text-sm"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-xl font-bold text-xs md:text-sm border flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                          : "bg-white dark:bg-[#121824] border-slate-200 dark:border-slate-800 hover:border-violet-500 text-slate-600 dark:text-slate-400"
                      }`}
                      aria-label={`Go to games page ${pageNum}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 transition-colors"
                  aria-label="Go to next games page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 flex items-center justify-center rounded-2xl mb-4 text-red-500">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-800 dark:text-gray-100 mb-1">
              No matching games found!
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6 max-w-sm">
              We couldn&apos;t find any games matching your current filters. Try relaxing your search
              term or resetting the filters.
            </p>
            <button 
              onClick={resetFilters} 
              className="sketch-btn text-xs hover:shadow-lg"
              aria-label="Reset all search filters"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
