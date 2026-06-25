"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Game, GameCategory } from "@/types";
import FeaturedHero from "./FeaturedHero";
import GameCard from "./GameCard";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

// Local Custom SVG Icons matching the reference image layout precisely
const SwordsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <polyline points="9.5 17.5 21 6 21 3 18 3 6.5 14.5" />
    <line x1="11" y1="19" x2="5" y2="13" />
    <line x1="8" y1="16" x2="4" y2="20" />
  </svg>
);

const CompassIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const RacingIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
    <path d="M6.1 15a8 8 0 0 1 .5-9M17.4 6a8 8 0 0 1 .5 9" />
  </svg>
);

const PuzzleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-2-2h-3.5a1.5 1.5 0 0 1-3 0H9a2 2 0 0 0-2 2v3.5a1.5 1.5 0 0 1 0 3V19a2 2 0 0 0 2 2h3.5a1.5 1.5 0 0 1 3 0H19a2 2 0 0 0 2-2z" />
  </svg>
);

const SportsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const GridIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const NoDownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const FreeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <circle cx="7" cy="15" r="1" />
    <circle cx="11" cy="15" r="1" />
  </svg>
);

const DeviceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

interface PremiumLobbyProps {
  games: Game[];
  categories: { name: GameCategory }[];
}

export default function PremiumLobby({ games, categories }: PremiumLobbyProps) {
  // Favorites synced from LocalStorage
  const [favoritesList, setFavoritesList] = useState<string[]>([]);
  const [visiblePopularCount, setVisiblePopularCount] = useState(12);

  // New states for recently played local storage and FAQ indices
  const [recentlyPlayed, setRecentlyPlayed] = useState<Game[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Sync favorites
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

  // Sync recently played history from LocalStorage with custom recommend fallback
  useEffect(() => {
    const loadHistory = () => {
      try {
        const historySlugs: string[] = JSON.parse(localStorage.getItem("eraogames_history") || "[]");
        const filteredHistory = historySlugs
          .map((slug) => games.find((g) => g.slug === slug))
          .filter((g): g is Game => !!g)
          .slice(0, 10);
        
        if (filteredHistory.length === 0) {
          // Fallback recommended grid games if empty
          setRecentlyPlayed(games.slice(20, 28));
        } else {
          setRecentlyPlayed(filteredHistory);
        }
      } catch (_) {
        setRecentlyPlayed(games.slice(20, 28));
      }
    };
    loadHistory();
    window.addEventListener("game_played", loadHistory);
    return () => window.removeEventListener("game_played", loadHistory);
  }, [games]);

  // Filter game datasets
  const trendingGames = [...games].sort((a, b) => b.plays - a.plays).slice(0, 4);
  const popularGames = [...games].sort((a, b) => b.rating - a.rating);
  const freshGames = [...games].reverse().slice(0, 8); // Extended count to 8 games for horizontal slider
  const actionEliteGames = games.filter((g) => g.category === "Action").slice(0, 6);

  // Hardcoded display categories order matching the reference image layout precisely
  const displayCategories = [
    { name: "Action", icon: SwordsIcon, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25" },
    { name: "Adventure", icon: CompassIcon, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
    { name: "Racing", icon: RacingIcon, color: "text-orange-400 bg-orange-500/10 border-orange-500/25" },
    { name: "Puzzle", icon: PuzzleIcon, color: "text-blue-400 bg-blue-500/10 border-blue-500/25" },
    { name: "Sports", icon: SportsIcon, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25" },
  ];

  // Scrolling handlers for horizontal shelves
  const scrollTrending = (direction: "left" | "right") => {
    const el = document.getElementById("trending-games-container");
    if (el) {
      const scrollAmount = el.offsetWidth * 0.8;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollFresh = (direction: "left" | "right") => {
    const el = document.getElementById("fresh-games-container");
    if (el) {
      const scrollAmount = el.offsetWidth * 0.8;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRecent = (direction: "left" | "right") => {
    const el = document.getElementById("recent-games-container");
    if (el) {
      const scrollAmount = el.offsetWidth * 0.8;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Fake static leaderboard scores matching the retro arcade style
  const leaderboardScores = [
    { rank: 1, name: "👑 AlphaSniper_99", game: "Turret Defend Apocalypse", score: "1,540,200 pts" },
    { rank: 2, name: "⭐ RetroDrifter", game: "Street Mayhem Driver", score: "1,290,500 pts" },
    { rank: 3, name: "⚡ MindMaster", game: "Off the Hook: Ring Puzzle", score: "990,400 pts" },
    { rank: 4, name: "🔥 CyberRider", game: "Momentum", score: "850,200 pts" },
    { rank: 5, name: "🎮 ArcadeQueen", game: "Number Slide", score: "710,100 pts" },
  ];

  // Accordion FAQ content array
  const faqList = [
    {
      q: "Are these games completely free to play?",
      a: "Yes, absolutely! All games on EraOGames are 100% free with no hidden subscriptions, fees, or download requirements. Simply click any game card and start playing instantly in your browser."
    },
    {
      q: "Do I need to sign up or create an account?",
      a: "No account registration is required to enjoy our games catalog. Your gameplay history, bookmarks, and settings are saved automatically using secure local storage in your browser."
    },
    {
      q: "Are these games safe for my device?",
      a: "Yes! All games are built using standard web technologies (HTML5, CSS3, WebGL) and run inside your browser's sandboxed environment. They require no downloads and pose no security risks."
    },
    {
      q: "Can I play these games on my mobile phone?",
      a: "Yes, EraOGames is fully responsive and optimized for cross-platform play. The interface, navigation, and gameplay adapt dynamically to mobile touch controls, tablet screens, and desktop layouts."
    }
  ];

  return (
    <div className="w-full space-y-16 pb-12 bg-slate-50 dark:bg-[#05070c]">
      {/* 1. Dynamic Hero Showcase (spans 100% full screen width) */}
      <HeroSectionFallback />

      {/* Grid Content Container wrapper (matches navbar and footer max-width constraints) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Categories Row Grid (6 Cards layout) */}
        <div className="animate-fade-in-up animate-delay-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCategories.map((cat) => {
            const CatIcon = cat.icon;
            const colorClass = cat.color;
            return (
              <Link
                key={cat.name}
                href={`/category/${cat.name.toLowerCase()}`}
                className="flex flex-col items-center justify-center p-5 bg-white dark:bg-[#0c1020]/60 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 rounded-2xl transition-all duration-300 hover:scale-[1.03] group shadow-lg"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
                  <CatIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-wider mt-4">
                  {cat.name}
                </span>
              </Link>
            );
          })}

          {/* Special 'All Games' card */}
          <Link
            href="/games"
            className="flex flex-col items-center justify-center p-5 bg-white dark:bg-[#0c1020]/60 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 rounded-2xl transition-all duration-300 hover:scale-[1.03] group shadow-lg"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform duration-300 text-cyan-500 dark:text-cyan-400">
              <GridIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-wider mt-4">
              All Games
            </span>
          </Link>
        </div>

        {/* 3. Featured Masterpieces */}
        <div className="animate-fade-in-up animate-delay-200">
          <FeaturedHero />
        </div>

        {/* 4. Recently Played Shelf (LocalStorage dynamically loaded) */}
        <section className="animate-fade-in-up animate-delay-300 relative">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide">
                Recently Played
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
                Pick up right where you left off or check recommendations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollRecent("left")}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => scrollRecent("right")}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          <div
            id="recent-games-container"
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          >
            {recentlyPlayed.map((game) => (
              <div
                key={game.id}
                className="w-[180px] sm:w-[220px] shrink-0 snap-start"
              >
                <GameCard game={game} variant="popular" />
              </div>
            ))}
          </div>
        </section>

        {/* 5. Trending Right Now (Horizontal list with arrows) */}
        <section className="animate-fade-in-up animate-delay-300 relative">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide">
                Trending Right Now
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTrending("left")}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => scrollTrending("right")}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Scrolling box container */}
          <div
            id="trending-games-container"
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          >
            {trendingGames.map((game) => (
              <div
                key={game.id}
                className="w-[200px] sm:w-[250px] md:w-[280px] shrink-0 snap-start"
              >
                <GameCard game={game} variant="below" />
              </div>
            ))}
          </div>
        </section>

        {/* 6. Action Elite Showcase Grid */}
        <section className="animate-fade-in-up">
          <div className="flex items-end justify-between mb-6 px-1">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide">
                Action Elite Showcase
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
                High-octane excitement and battle arenas
              </p>
            </div>
            <Link
              key="action-link"
              href="/category/action"
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>View All Action</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {actionEliteGames.map((game) => (
              <div key={game.id} className="h-full">
                <GameCard game={game} variant="popular" />
              </div>
            ))}
          </div>
        </section>

        {/* 7. All Popular Titles Grid */}
        <section className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide">
              All Popular Titles
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {popularGames.slice(0, visiblePopularCount).map((game) => (
              <div key={game.id} className="h-full">
                <GameCard game={game} variant="popular" />
              </div>
            ))}
          </div>

          {/* Load more button */}
          {visiblePopularCount < popularGames.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisiblePopularCount((prev) => prev + 12)}
                className="px-8 py-3 bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-900 dark:text-white rounded-xl font-sans font-bold text-xs tracking-wider transition-all hover:scale-105 uppercase"
              >
                Load More Games
              </button>
            </div>
          )}
        </section>

        {/* 8. Fresh Releases (Horizontal Scroll Carousel with arrow markers) */}
        <section className="animate-fade-in-up relative">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide">
                Fresh Releases
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
                Newly integrated HTML5 titles slider
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollFresh("left")}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => scrollFresh("right")}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          <div
            id="fresh-games-container"
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          >
            {freshGames.map((game, idx) => (
              <div
                key={game.id}
                className="w-[260px] sm:w-[320px] shrink-0 snap-start"
              >
                <GameCard game={game} variant="fresh" index={idx} />
              </div>
            ))}
          </div>
        </section>

        {/* 9. Lobby Arcade Leaderboard Scoreboard */}
        <section className="animate-fade-in-up border-t border-slate-200 dark:border-slate-900/60 pt-12 mt-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
              Arcade Hall of Fame
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
              Top scores achieved in the lobby catalog this week
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-[#0C0F17] border border-slate-200 dark:border-slate-900 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
            <div className="hidden sm:grid grid-cols-12 bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-900 py-3.5 px-4 sm:px-6 text-left text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              <div className="col-span-2">Rank</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-4">Game Title</div>
              <div className="col-span-2 text-right">Score</div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-950/60">
              {leaderboardScores.map((player) => {
                let rankColor = "text-slate-300";
                if (player.rank === 1) rankColor = "text-amber-400 font-extrabold";
                else if (player.rank === 2) rankColor = "text-slate-100 font-bold";
                else if (player.rank === 3) rankColor = "text-amber-600 font-bold";
                
                return (
                  <div
                    key={player.rank}
                    className="grid grid-cols-2 sm:grid-cols-12 py-3 sm:py-4 px-4 sm:px-6 items-center text-left text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors group border-b border-slate-200 dark:border-slate-900 last:border-0 gap-2"
                  >
                    <div className={`font-mono text-sm sm:text-base flex items-center gap-2 ${rankColor}`}>
                      <span>#{player.rank}</span>
                      <span className="sm:hidden truncate font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-xs">
                        {player.name.replace(/[^\w\s]/g, '')}
                      </span>
                    </div>
                    <div className="hidden sm:block col-span-3 font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors text-sm truncate">
                      {player.name}
                    </div>
                    <div className="hidden sm:block col-span-4 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 truncate pr-2">
                      {player.game}
                    </div>
                    <div className="text-right font-mono font-bold text-[10px] sm:text-xs text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 whitespace-nowrap">
                      {player.score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. Lobby FAQs Accordion Help Desk */}
        <section className="animate-fade-in-up max-w-3xl mx-auto pt-12 border-t border-slate-200 dark:border-slate-900/60">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
              Lobby Help Desk
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
              Frequently asked questions about EraOGames browser play
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqList.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-[#0C0F17] border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "border-violet-500/60 shadow-[0_0_15px_rgba(139,92,246,0.2)] scale-[1.01]" : "border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800"}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm md:text-base font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-slate-400 dark:text-slate-500 transition-transform duration-300 transform ${isOpen ? "rotate-180" : ""}`}>
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 border-t border-slate-200 dark:border-slate-900/60 p-5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 11. Blog Preview Section */}
        <section className="animate-fade-in-up border-t border-slate-200 dark:border-slate-900/60 pt-12 mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
              Latest from the Blog
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
              Gaming guides, tips, and industry insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Top 10 Best Free Browser Games to Play in 2026", slug: "best-free-browser-games-2026", excerpt: "Discover the most addictive browser games you can play instantly without downloads.", category: "Gaming Guides" },
              { title: "How Playing Browser Games Can Improve Your Brain", slug: "how-browser-games-improve-brain-function", excerpt: "Scientific research shows casual gaming can enhance cognitive abilities, memory, and reaction time.", category: "Health & Gaming" },
              { title: "A Parent's Guide to Safe Online Gaming for Kids", slug: "parent-guide-safe-online-gaming-kids", excerpt: "Comprehensive guide covering screen time management, age-appropriate games, and safe browsing.", category: "Parenting" },
            ].map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-[#0C0F17] border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-base md:text-lg font-sans font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 mt-4 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Read More
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-900 dark:text-white rounded-xl font-sans font-bold text-xs tracking-wider transition-all hover:scale-105 uppercase"
            >
              View All Articles
            </Link>
          </div>
        </section>

        {/* 12. Why EraOGames Editorial Section */}
        <section className="animate-fade-in-up border-t border-slate-200 dark:border-slate-900/60 pt-12 mt-12 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
              Why EraOGames?
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">
              The premier destination for browser-based gaming
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Curated Quality",
                desc: "Every game on EraOGames is handpicked for performance, fun factor, and visual quality. We test each title across multiple devices to ensure a smooth experience."
              },
              {
                title: "Privacy First",
                desc: "No accounts, no tracking pixels, no personal information required. Your gaming stays your business. We believe in minimal, transparent data collection."
              },
              {
                title: "Instant Play",
                desc: "Zero downloads, zero installations, zero waiting. Click any game and start playing immediately. Pure frictionless entertainment in your browser."
              },
              {
                title: "Cross-Platform",
                desc: "All games work seamlessly on desktop, tablet, and mobile. Your favorites follow you everywhere with controls that adapt to any screen size."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#0C0F17] border border-slate-200 dark:border-slate-900 rounded-2xl p-6 text-left hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-base md:text-lg font-sans font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 13. USP Features Section (No Download, 100% Free, Cross-Platform) */}
        <section className="animate-fade-in-up border-t border-slate-200 dark:border-slate-900/80 pt-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center px-4">
            <div className="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(139,92,246,0.1)] animate-pulse-slow">
              <NoDownloadIcon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-white mb-2">No Download</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Play instantly in your browser without wasting disk space or waiting for installs.
            </p>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(34,211,238,0.1)] animate-pulse-slow">
              <FreeIcon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-white mb-2">100% Free</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Enjoy premium high-quality games without hidden costs, subscriptions or paywalls.
            </p>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(139,92,246,0.1)] animate-pulse-slow">
              <DeviceIcon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-white mb-2">Cross-Platform</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Your progress follows you, from desktop to mobile. Game anywhere, anytime.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

// Inline fallback loader wrapper component for clean Hero inclusion
import HeroSection from "./HeroSection";
function HeroSectionFallback() {
  return <HeroSection />;
}
