"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Game } from "@/types";
import FullscreenButton from "@/components/FullscreenButton";
import GameCard from "@/components/GameCard";
import {
  HomeIcon,
  GridIcon,
  ChevronRightIcon,
  RatingStarIcon,
  EyeIcon,
  PlayIcon,
  GamepadIcon,
  ActionIcon,
  RacingIcon,
  PuzzleIcon,
  AdventureIcon,
  MultiplayerIcon,
  SportsIcon,
  ArcadeIcon,
} from "@/components/Icons";
import type { GameCategory } from "@/types";

const detailIconMap: Record<GameCategory, React.FC<{ className?: string }>> = {
  Action: ActionIcon,
  Racing: RacingIcon,
  Puzzle: PuzzleIcon,
  Adventure: AdventureIcon,
  Multiplayer: MultiplayerIcon,
  Sports: SportsIcon,
  Arcade: ArcadeIcon,
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
      keys.push({ key: "SHIFT KEY", action: "Drift Around Corners / Run" });
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
      "Sketch-style classic Retro Art details",
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
      a: `This game saves score metrics and Stage progress local file storage directly inside your browser cache. Clearing your browser cookies or history data may reset these variables.`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex items-center gap-1.5 text-xs md:text-sm font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mb-6">
        <Link href="/" className="flex items-center gap-1 hover:text-[#ff4d4d] transition-colors">
          <HomeIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        <Link href="/games" className="flex items-center gap-1 hover:text-[#ff4d4d] transition-colors">
          <GridIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Games</span>
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 truncate max-w-[120px] sm:max-w-[200px]">{game.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-14 h-14 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm items-center justify-center shrink-0 text-[#2d2d2d] dark:text-[#fdfbf7]"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          >
            <GamepadIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] tracking-tight leading-tight">
              {game.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="doodle-badge text-[10px] flex items-center gap-1.5">
                {CategoryIcon && <CategoryIcon className="w-3.5 h-3.5" />}
                {game.category}
              </div>
              <span className="flex items-center gap-1 text-sm font-hand font-bold text-[#2d2d2d] dark:text-[#fdfbf7]">
                <RatingStarIcon className="w-4 h-4 text-[#ff4d4d]" />
                {game.rating}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50">
                <EyeIcon className="w-4 h-4" />
                {game.plays.toLocaleString()} plays
              </span>
            </div>
          </div>
        </div>
        <FullscreenButton iframeRef={iframeRef} />
      </div>

      <div
        className="relative w-full aspect-video mb-6 md:mb-8 bg-[#fdfbf7] dark:bg-[#18181c] border-[3px] border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch pin tape-top transition-colors duration-200"
        style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", transform: "rotate(-0.5deg)" }}
      >
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-[#fdfbf7] dark:bg-[#18181c] flex flex-col items-center justify-center rounded-[inherit] transition-opacity duration-300">
            <div className="flex flex-col items-center gap-4 text-center p-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-dashed border-[#2d2d2d] dark:border-[#fdfbf7] rounded-full animate-spin" />
                <GamepadIcon className="w-8 h-8 text-[#ff4d4d] animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] tracking-wide animate-bounce">
                  Sharpening the pencils...
                </h3>
                <p className="text-sm font-hand text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
                  Loading &quot;{game.title}&quot; safely into the canvas
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-[#fdfbf7]/10 dark:bg-black/10 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[inherit]">
          <div className="flex items-center gap-2 text-sm font-hand font-bold text-[#2d2d2d] dark:text-[#fdfbf7] bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] px-4 py-2 shadow-sketch-sm"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          >
            <PlayIcon className="w-5 h-5" />
            Click to interact with game
          </div>
        </div>
        <iframe
          ref={iframeRef}
          src={game.embedUrl}
          className="absolute inset-0 w-full h-full rounded-[inherit] bg-white dark:bg-[#18181c]"
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
          <div
            className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-5 md:p-7"
            style={{ borderRadius: "15px 255px 15px 225px / 225px 15px 255px 15px", transform: "rotate(0.3deg)" }}
          >
            <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] flex items-center justify-center text-[#ff4d4d]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                🎮
              </span>
              Game Overview & Mechanics
            </h2>
            <p className="text-sm md:text-base font-hand text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed mb-4">
              {game.description}
            </p>
            <p className="text-sm md:text-base font-hand text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
              Step into the modern browser arena with {game.title}, an instant-play HTML5 game. As a highlight in the {game.category} segment on EraOGames, it merges classic gameplay design with robust browser responsiveness. Master the physics, aim for high score milestones, and discover why this title stands out in the current browser gaming era.
            </p>
          </div>

          <div
            className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-5 md:p-7"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", transform: "rotate(-0.3deg)" }}
          >
            <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] flex items-center justify-center text-[#2d5da1]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                ⭐
              </span>
              Key Game Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-hand text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70">
              {gameFeatures.map((feat, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#ff4d4d] font-bold">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: How to Play & Controls */}
        <div className="space-y-6">
          <div
            className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-5 md:p-7"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", transform: "rotate(-0.5deg)" }}
          >
            <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] flex items-center justify-center text-[#2d5da1]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                📖
              </span>
              Instructions
            </h2>
            <p className="text-sm font-hand text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
              {game.instructions}
            </p>
          </div>

          <div
            className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-5 md:p-7"
            style={{ borderRadius: "15px 255px 15px 225px / 225px 15px 255px 15px", transform: "rotate(0.5deg)" }}
          >
            <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] flex items-center justify-center text-[#ff4d4d]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                ⌨️
              </span>
              Keyboard & Mouse Layout
            </h2>
            <div className="space-y-3">
              {controlKeys.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-dashed border-[#e5e0d8] dark:border-[#44444a] pb-1.5 last:border-b-0 last:pb-0 text-sm font-hand">
                  <span className="px-2 py-0.5 bg-white dark:bg-[#18181c] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm rounded text-xs font-bold text-[#2d2d2d] dark:text-[#fdfbf7] tracking-wider">
                    {item.key}
                  </span>
                  <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 text-right">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ Area */}
      <section
        className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-5 md:p-7 mb-10"
        style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", transform: "rotate(0.1deg)" }}
      >
        <h2 className="text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-5 flex items-center gap-2 border-b-2 border-dashed border-[#e5e0d8] dark:border-[#44444a] pb-2">
          ❓ Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div key={i} className="border-2 border-[#2d2d2d] dark:border-[#fdfbf7] rounded-lg overflow-hidden"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left p-4 bg-white dark:bg-[#242429] hover:bg-[#ff4d4d]/5 dark:hover:bg-[#ff6b6b]/5 text-sm md:text-base font-hand font-bold text-[#2d2d2d] dark:text-[#fdfbf7] transition-all"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-bold text-[#ff4d4d]">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="p-4 border-t-2 border-dashed border-[#2d2d2d] dark:border-[#fdfbf7] bg-[#fdfbf7] dark:bg-[#18181c] text-xs md:text-sm font-hand text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed transition-all">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {related.length > 0 && (
        <section className="pb-8">
          <div className="doodle-separator" />
          <div className="flex items-center justify-between mb-6">
            <h2 className="doodle-section-title text-xl md:text-2xl">
              <GamepadIcon className="w-5 h-5" />
              More {game.category} Games
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
