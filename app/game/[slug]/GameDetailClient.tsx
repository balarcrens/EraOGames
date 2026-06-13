"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { Game } from "@/types";
import GameCard from "@/components/GameCard";
import {
  Home,
  ChevronRight,
  Star,
  Eye,
  Gamepad2,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Keyboard,
  HelpCircle,
  ChevronDown,
  Check,
  Swords,
  Car,
  Brain,
  Compass,
  Users,
  Trophy,
  Gamepad
} from "lucide-react";
import type { GameCategory } from "@/types";

const detailIconMap: Record<GameCategory, React.ComponentType<{ className?: string }>> = {
  Action: Swords,
  Racing: Car,
  Puzzle: Brain,
  Adventure: Compass,
  Multiplayer: Users,
  Sports: Trophy,
  Arcade: Gamepad,
};

interface GameDetailClientProps {
  game: Game;
  related: readonly Game[];
}

export default function GameDetailClient({ game, related }: GameDetailClientProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const CategoryIcon = detailIconMap[game.category];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // UX states: Local Upvote/Downvote
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  // Sync vote on mount
  useEffect(() => {
    try {
      const vote = localStorage.getItem(`eraogames_vote_${game.slug}`);
      if (vote === "up" || vote === "down") {
        setUserVote(vote);
      }
    } catch (_) {}
  }, [game.slug]);

  const handleVote = (type: "up" | "down") => {
    try {
      if (userVote === type) {
        localStorage.removeItem(`eraogames_vote_${game.slug}`);
        setUserVote(null);
      } else {
        localStorage.setItem(`eraogames_vote_${game.slug}`, type);
        setUserVote(type);
      }
    } catch (_) {}
  };

  // Dynamic control keys list derived from instructions
  const controlKeys = (() => {
    const keys: { key: string; action: string }[] = [];
    const lowercase = game.instructions.toLowerCase();
    
    if (lowercase.includes("wasd") || lowercase.includes("w/a/s/d")) {
      keys.push({ key: "W A S D", action: "Move / Steer Character" });
    }
    if (lowercase.includes("arrow")) {
      keys.push({ key: "← ↑ → ↓", action: "Directional Control" });
    }
    if (lowercase.includes("space")) {
      keys.push({ key: "SPACEBAR", action: "Action / Jump / Speed Boost" });
    }
    if (lowercase.includes("click") || lowercase.includes("mouse") || lowercase.includes("aim") || lowercase.includes("shoot")) {
      keys.push({ key: "MOUSE L-CLICK", action: "Aim / Shoot / Select Items" });
    }
    if (lowercase.includes("shift")) {
      keys.push({ key: "SHIFT KEY", action: "Drift / Run" });
    }
    if (lowercase.includes("z") || lowercase.includes("x")) {
      keys.push({ key: "Z / X KEYS", action: "Pass / Shoot Ball / Specials" });
    }
    if (keys.length === 0) {
      keys.push({ key: "TAP / CLICK", action: "Standard Game Interaction" });
    }
    return keys;
  })();

  // Dynamic features checklist based on category
  const gameFeatures = (() => {
    const base = [
      "Instant Play in Browser (No Downloads or Hassle)",
      "Fully Responsive Layout optimized for all screens",
      "Sleek modern High-Fidelity display details",
    ];
    if (game.category === "Action" || game.category === "Racing" || game.category === "Arcade") {
      return [
        ...base,
        "High-Speed stage challenges designed for quick sessions",
        "Reflex-testing mechanics and stage layout",
        "Clean, responsive frame rate inputs",
      ];
    }
    if (game.category === "Puzzle") {
      return [
        ...base,
        "Mind-bending spatial logic and layout puzzles",
        "Satisfying level progression difficulty curve",
        "Calm yet engaging brain-training sessions",
      ];
    }
    return [
      ...base,
      "Immersive thematic style and setting elements",
      "Achievements and high-scoring triggers",
      "Fun, lightweight browser gameplay loops",
    ];
  })();

  // Custom FAQ dataset
  const faqs = [
    {
      q: `Is ${game.title} safe and free to play online?`,
      a: `Yes! ${game.title} is completely free to play on EraOGames. We host lightweight, sanitized HTML5 sandbox builds directly via secure frames. You do not need to input payment details or download any executable files.`,
    },
    {
      q: `Do I need to download or install any files for ${game.title}?`,
      a: `No downloads or installation are needed. EraOGames is an instant-play game portal (representing the golden Era of Games). Simply open the game page in your web browser and click play.`,
    },
    {
      q: `Can I play ${game.title} on my mobile phone or tablet?`,
      a: `Absolutely! ${game.title} is built with HTML5 responsive scaling. It adjusts dynamically to mobile devices (iOS and Android) and desktop computers.`,
    },
    {
      q: `How does EraOGames save my high scores and progress in ${game.title}?`,
      a: `This game saves score metrics and stage progress local file storage directly inside your browser cache. Clearing your browser cookies or history data may reset these variables.`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400 dark:text-slate-500 mb-6 font-medium">
        <Link 
          href="/" 
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
          aria-label="Back to EraOGames Home page"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-700" />
        <Link 
          href="/games" 
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
          aria-label="Browse all games"
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Games</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-700" />
        <span className="text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[120px] sm:max-w-[200px]">{game.title}</span>
      </div>

      {/* Header Panel */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-14 h-14 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm items-center justify-center shrink-0 rounded-2xl text-indigo-500"
          >
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-800 dark:text-white tracking-wide leading-tight">
              {game.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3.5 mt-2 text-xs md:text-sm font-semibold">
              <Link 
                href={`/category/${game.category.toLowerCase()}`}
                className="doodle-badge text-[10px] flex items-center gap-1.5 px-3 py-1 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30 rounded-full hover:border-violet-500 transition-colors"
                aria-label={`Browse games in ${game.category}`}
              >
                {CategoryIcon && <CategoryIcon className="w-3.5 h-3.5" />}
                <span>{game.category}</span>
              </Link>
              <span className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span>{game.rating.toFixed(1)}</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                <Eye className="w-4 h-4" />
                <span>{game.plays.toLocaleString()} plays</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Buttons Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
          {/* Rate Game: Upvote/Downvote */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#121824] shadow-sm">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Rate Game:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleVote("up")}
                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center text-xs transition-all ${
                  userVote === "up"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                aria-label="Upvote this game with a thumbs up"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleVote("down")}
                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center text-xs transition-all ${
                  userVote === "down"
                    ? "bg-red-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                aria-label="Downvote this game with a thumbs down"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game Screen Container - scaled height/width */}
      <div className="relative w-full mb-6 md:mb-8 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden rounded-3xl h-[480px] sm:h-[500px] md:h-[580px] lg:h-[680px] w-full"
      >
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-white dark:bg-[#080b11] flex flex-col items-center justify-center transition-opacity duration-300">
            <div className="flex flex-col items-center gap-4 text-center p-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-dashed border-indigo-500 rounded-full animate-spin" />
                <Gamepad2 className="w-8 h-8 text-indigo-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white tracking-wide">
                  Booting Game Cabinet...
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                  Loading &quot;{game.title}&quot; safely
                </p>
              </div>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={game.embedUrl}
          className="absolute inset-0 w-full h-full bg-white dark:bg-[#080b11]"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title={game.title}
        />
      </div>

      {/* Box Grid Area */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Left Side: About & Features */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium">
            <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center rounded-lg text-sm text-indigo-600 dark:text-indigo-400">
                <Gamepad2 className="w-4 h-4" />
              </span>
              <span>Game Overview & Mechanics</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-4 font-medium">
              {game.description}
            </p>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Step into the modern browser arena with {game.title}, an instant-play HTML5 game. As a highlight in the {game.category} segment on EraOGames, it merges classic gameplay design with robust browser responsiveness. Master the physics, aim for high score milestones, and discover why this title stands out in the current browser gaming era.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium">
            <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center rounded-lg text-sm text-amber-600 dark:text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </span>
              <span>Key Game Features</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
              {gameFeatures.map((feat, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: How to Play & Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium">
            <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center rounded-lg text-sm text-blue-600 dark:text-blue-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <span>Instructions</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {game.instructions}
            </p>
          </div>

          <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium">
            <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 flex items-center justify-center rounded-lg text-sm text-red-500 dark:text-red-400">
                <Keyboard className="w-4 h-4" />
              </span>
              <span>Input Control Layout</span>
            </h2>
            <div className="space-y-3">
              {controlKeys.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-2 last:border-b-0 last:pb-0 text-sm font-medium">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-gray-200 tracking-wide">
                    {item.key}
                  </span>
                  <span className="text-slate-400 dark:text-slate-400 text-right text-xs">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ Area */}
      <section className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium mb-10">
        <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <span>Frequently Asked Questions (FAQ)</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div key={i} className="border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left p-4 bg-white dark:bg-[#121824] hover:bg-violet-500/5 dark:hover:bg-violet-500/5 text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 transition-all duration-200"
                  aria-expanded={isOpen}
                  aria-label={`Frequently Asked Question: ${faq.q}. Click to expand answer.`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0d121c] text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-all">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* More Games List Grid */}
      {related.length > 0 && (
        <section className="pb-8">
          <div className="doodle-separator" />
          <div className="flex items-center justify-between mb-8">
            <h2 className="doodle-section-title">
              <Gamepad2 className="w-5 h-5 text-indigo-500" />
              <span>More {game.category} Games</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
