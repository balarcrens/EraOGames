"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Game } from "@/types";
import GameGrid from "@/components/GameGrid";
import {
  Home,
  ChevronRight,
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
  Gamepad,
  Maximize2,
  Minimize2,
  RotateCcw,
  Tv,
  Laptop,
  Smartphone,
  Sparkles
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
  suggested?: readonly Game[];
}

export default function GameDetailClient({ game, related, suggested = [] }: GameDetailClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [iframeSizeOffset, setIframeSizeOffset] = useState(false);

  const [referrerUrl, setReferrerUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReferrerUrl(window.location.origin);
    }
  }, []);

  // Disabled focus-based scroll lock for the iframe game cabinet to prevent broken scrolling on accidental clicks
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const embedUrlWithReferrer = useMemo(() => {
    const origin = referrerUrl || (typeof window !== "undefined" ? window.location.origin : "https://eraogames.vercel.app");
    try {
      const url = new URL(game.embedUrl);
      url.searchParams.set("gd_sdk_referrer_url", origin);
      return url.toString();
    } catch (_) {
      return game.embedUrl;
    }
  }, [game.embedUrl, referrerUrl]);

  // Derive likes and dislikes from plays & rating
  const initialLikes = useMemo(() => {
    const reviews = Math.max(10, Math.round(game.plays * 0.03));
    const ratio = game.rating / 5;
    return Math.round(reviews * ratio);
  }, [game.plays, game.rating]);

  const initialDislikes = useMemo(() => {
    const reviews = Math.max(10, Math.round(game.plays * 0.03));
    const ratio = game.rating / 5;
    return reviews - Math.round(reviews * ratio);
  }, [game.plays, game.rating]);

  const [likesOffset, setLikesOffset] = useState(0);
  const [dislikesOffset, setDislikesOffset] = useState(0);

  // UX states: Local Upvote/Downvote
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  // Sync vote on mount
  useEffect(() => {
    try {
      const vote = localStorage.getItem(`eraogames_vote_${game.slug}`);
      if (vote === "up" || vote === "down") {
        setUserVote(vote);
      }
    } catch (_) { }
  }, [game.slug]);

  // Sync offsets when userVote changes
  useEffect(() => {
    if (userVote === "up") {
      setLikesOffset(1);
      setDislikesOffset(0);
    } else if (userVote === "down") {
      setLikesOffset(0);
      setDislikesOffset(1);
    } else {
      setLikesOffset(0);
      setDislikesOffset(0);
    }
  }, [userVote]);

  // Force reflow and repaint of WebGL/Canvas inside iframe
  useEffect(() => {
    setIframeSizeOffset(true);
    const timer = setTimeout(() => {
      setIframeSizeOffset(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [isFullscreen, isTheaterMode]);

  // Sync fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === containerRef.current ||
        (document as any).webkitFullscreenElement === containerRef.current ||
        (document as any).mozFullScreenElement === containerRef.current ||
        (document as any).msFullscreenElement === containerRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const handleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement &&
      !(document as any).webkitFullscreenElement &&
      !(document as any).mozFullScreenElement &&
      !(document as any).msFullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      } else if ((el as any).mozRequestFullScreen) {
        (el as any).mozRequestFullScreen();
      } else if ((el as any).msRequestFullscreen) {
        (el as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = embedUrlWithReferrer;
    }
  };

  const CategoryIcon = detailIconMap[game.category];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const likesCount = initialLikes + likesOffset;
  const dislikesCount = initialDislikes + dislikesOffset;

  const handleVote = (type: "up" | "down") => {
    try {
      if (userVote === type) {
        localStorage.removeItem(`eraogames_vote_${game.slug}`);
        setUserVote(null);
      } else {
        localStorage.setItem(`eraogames_vote_${game.slug}`, type);
        setUserVote(type);
      }
    } catch (_) { }
  };

  // Dynamic control keys list derived from instructions and category suggestions
  const desktopControls = (() => {
    const keys: { key: string; action: string }[] = [];
    const lowercase = game.instructions.toLowerCase();
    const descLower = game.description.toLowerCase();

    // Check if game instructions actually outline keys explicitly (like Busy Bee Hive or Cat vs Granny)
    const lines = game.instructions.split('\n');
    let hasExplicitPC = false;

    lines.forEach(line => {
      if (line.toLowerCase().includes("pc controls") || line.toLowerCase().includes("desktop:")) {
        hasExplicitPC = true;
      }
    });

    if (hasExplicitPC) {
      let isPCSection = false;
      lines.forEach(line => {
        const lineLower = line.toLowerCase();
        if (lineLower.includes("pc controls:") || lineLower.includes("desktop:")) {
          isPCSection = true;
          return;
        }
        if (lineLower.includes("mobile device controls:") || lineLower.includes("mobile:")) {
          isPCSection = false;
        }
        if (isPCSection && line.trim()) {
          const cleaned = line.replace(/^[•\-\*\s]+/, "").trim();
          if (cleaned.includes(" - ")) {
            const [k, act] = cleaned.split(" - ");
            keys.push({ key: k.trim(), action: act.trim() });
          } else if (cleaned.includes(" – ")) {
            const [k, act] = cleaned.split(" – ");
            keys.push({ key: k.trim(), action: act.trim() });
          } else if (cleaned.includes(":")) {
            const [k, act] = cleaned.split(":");
            keys.push({ key: k.trim(), action: act.trim() });
          } else if (cleaned.includes("–")) {
            const [k, act] = cleaned.split("–");
            keys.push({ key: k.trim(), action: act.trim() });
          }
        }
      });
    }

    if (keys.length === 0) {
      if (lowercase.includes("wasd") || lowercase.includes("w/a/s/d") || descLower.includes("wasd")) {
        keys.push({ key: "W A S D", action: "Character Movement / Steering" });
      }
      if (lowercase.includes("arrow") || descLower.includes("arrow")) {
        keys.push({ key: "← ↑ → ↓", action: "Directional Control" });
      }
      if (lowercase.includes("space") || descLower.includes("space")) {
        keys.push({ key: "SPACEBAR", action: "Main Action / Jump / Boost" });
      }
      if (lowercase.includes("click") || lowercase.includes("mouse") || lowercase.includes("aim") || lowercase.includes("shoot") || descLower.includes("mouse") || descLower.includes("click")) {
        keys.push({ key: "MOUSE L-CLICK", action: "Aim / Select / Drag Items" });
      }
      if (lowercase.includes("shift") || descLower.includes("shift")) {
        keys.push({ key: "SHIFT KEY", action: "Drift / Sprint / Speed run" });
      }
      if (lowercase.includes("z") || lowercase.includes("x") || descLower.includes("z") || descLower.includes("x")) {
        keys.push({ key: "Z / X KEYS", action: "Primary / Secondary Attack" });
      }
      if (lowercase.includes("esc") || descLower.includes("esc")) {
        keys.push({ key: "ESC KEY", action: "Pause / Open Menu" });
      }
      if (lowercase.includes("e ") || lowercase.includes("e-") || lowercase.includes("e key")) {
        keys.push({ key: "E KEY", action: "Interact / Pickup" });
      }
      if (lowercase.includes("f ") || lowercase.includes("f-") || lowercase.includes("f key")) {
        keys.push({ key: "F KEY", action: "Interact / Alternative Action" });
      }
    }

    // Category-specific fallbacks for desktop screens if parsed list is still short/empty
    if (keys.length < 2) {
      const catKeys = [];
      if (game.category === "Racing") {
        catKeys.push({ key: "W A S D / Arrows", action: "Steer, Accelerate, and Brake" });
        catKeys.push({ key: "SPACEBAR", action: "Handbrake / Drift" });
        catKeys.push({ key: "SHIFT KEY", action: "Nitro Speed Boost" });
        catKeys.push({ key: "R KEY", action: "Respawn / Reset Car" });
        catKeys.push({ key: "ESC KEY", action: "Pause Game Menu" });
      } else if (game.category === "Action" || game.category === "Arcade" || game.category === "Multiplayer") {
        catKeys.push({ key: "W A S D / Arrows", action: "Move Character / Vehicle" });
        catKeys.push({ key: "SPACEBAR", action: "Jump / Dash Action" });
        catKeys.push({ key: "MOUSE L-CLICK", action: "Aim & Shoot / Select" });
        catKeys.push({ key: "SHIFT KEY", action: "Sprint / Secondary Speed" });
        catKeys.push({ key: "R KEY", action: "Reload / Restart Game" });
        catKeys.push({ key: "ESC KEY", action: "Pause Game Menu" });
      } else if (game.category === "Sports") {
        catKeys.push({ key: "W A S D / Arrows", action: "Move Player / Pitcher" });
        catKeys.push({ key: "SPACEBAR", action: "Power Shot / Pass / Jump" });
        catKeys.push({ key: "MOUSE L-CLICK", action: "Aim Shoot / Menu selection" });
        catKeys.push({ key: "ESC KEY", action: "Pause Game Menu" });
      } else {
        catKeys.push({ key: "MOUSE L-CLICK", action: "Select, Drag and Interact" });
        catKeys.push({ key: "W A S D / Arrows", action: "Camera movement / Viewport" });
        catKeys.push({ key: "SPACEBAR", action: "Confirm Selection" });
        catKeys.push({ key: "R KEY", action: "Reset Level / Restart" });
        catKeys.push({ key: "ESC KEY", action: "Pause Game Menu" });
      }

      catKeys.forEach(ck => {
        if (!keys.some(k => k.key.toLowerCase() === ck.key.toLowerCase())) {
          keys.push(ck);
        }
      });
    }
    return keys;
  })();

  const mobileControls = (() => {
    const gestures: { key: string; action: string }[] = [];
    const lowercase = game.instructions.toLowerCase();
    const descLower = game.description.toLowerCase();

    // Check if game instructions explicitly outline mobile controls
    const lines = game.instructions.split('\n');
    let hasExplicitMobile = false;

    lines.forEach(line => {
      if (line.toLowerCase().includes("mobile device controls") || line.toLowerCase().includes("mobile:")) {
        hasExplicitMobile = true;
      }
    });

    if (hasExplicitMobile) {
      let isMobileSection = false;
      lines.forEach(line => {
        const lineLower = line.toLowerCase();
        if (lineLower.includes("mobile device controls:") || lineLower.includes("mobile:")) {
          isMobileSection = true;
          return;
        }
        if (lineLower.includes("gameplay:") || lineLower.includes("pc controls:")) {
          isMobileSection = false;
        }
        if (isMobileSection && line.trim()) {
          const cleaned = line.replace(/^[•\-\*\s]+/, "").trim();
          if (cleaned.includes(" - ")) {
            const [k, act] = cleaned.split(" - ");
            gestures.push({ key: k.trim(), action: act.trim() });
          } else if (cleaned.includes(" – ")) {
            const [k, act] = cleaned.split(" – ");
            gestures.push({ key: k.trim(), action: act.trim() });
          } else if (cleaned.includes(":")) {
            const [k, act] = cleaned.split(":");
            gestures.push({ key: k.trim(), action: act.trim() });
          } else if (cleaned.includes("–")) {
            const [k, act] = cleaned.split("–");
            gestures.push({ key: k.trim(), action: act.trim() });
          }
        }
      });
    }

    if (gestures.length === 0) {
      if (lowercase.includes("finger") || lowercase.includes("swipe") || descLower.includes("swipe")) {
        gestures.push({ key: "SWIPE GESTURE", action: "Aim Camera / Slide Blocks" });
      }
      if (lowercase.includes("drag") || lowercase.includes("pull") || descLower.includes("drag")) {
        gestures.push({ key: "DRAG & HOLD", action: "Move character / Drag object" });
      }
      if (lowercase.includes("tap") || lowercase.includes("touch") || descLower.includes("tap")) {
        gestures.push({ key: "TAP SCREEN", action: "Jump / Shoot / Action" });
      }
    }

    // Category fallbacks for mobile
    if (gestures.length < 2) {
      const catGestures = [];
      if (game.category === "Racing") {
        catGestures.push({ key: "TAP LEFT/RIGHT", action: "Steer vehicle left/right" });
        catGestures.push({ key: "ON-SCREEN PEDALS", action: "Accelerate and brake" });
        catGestures.push({ key: "SWIPE UP", action: "Nitro Booster" });
      } else if (game.category === "Action" || game.category === "Arcade" || game.category === "Multiplayer") {
        catGestures.push({ key: "VIRTUAL D-PAD", action: "Move character / vehicle" });
        catGestures.push({ key: "TAP SCREEN", action: "Aim & Shoot / Attack" });
        catGestures.push({ key: "ACTION BUTTONS", action: "Jump, Dodge, or Interact" });
      } else if (game.category === "Puzzle") {
        catGestures.push({ key: "TAP & DRAG", action: "Connect / Move puzzle pieces" });
        catGestures.push({ key: "TAP SCREEN", action: "Select bubble / Release item" });
        catGestures.push({ key: "POWERUPS BAR", action: "Tap to activate helpers" });
      } else {
        catGestures.push({ key: "TAP SCREEN", action: "Select & Interact" });
        catGestures.push({ key: "DRAG SLIDER", action: "Scroll/Move camera view" });
        catGestures.push({ key: "DOUBLE TAP", action: "Confirm action / Open menu" });
      }

      catGestures.forEach(cg => {
        if (!gestures.some(g => g.key.toLowerCase() === cg.key.toLowerCase())) {
          gestures.push(cg);
        }
      });
    }

    return gestures;
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
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 font-sans">
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
              <span className="flex items-center gap-1 text-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 px-2.5 py-0.5 border border-emerald-100/30 dark:border-emerald-900/30 rounded-lg">
                <ThumbsUp className="w-3.5 h-3.5 fill-current" />
                <span>{likesCount.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-1 text-red-500 bg-red-50/50 dark:bg-red-950/20 px-2.5 py-0.5 border border-red-100/30 dark:border-red-900/30 rounded-lg">
                <ThumbsDown className="w-3.5 h-3.5 fill-current" />
                <span>{dislikesCount.toLocaleString()}</span>
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
          {/* Reload Game */}
          <button
            onClick={handleReload}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#121824] text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-450 hover:border-indigo-300 dark:hover:border-indigo-900/50 shadow-sm transition-colors"
            title="Reload Game"
            aria-label="Reload current game cabinet"
          >
            <RotateCcw className="w-3.5 h-3.5 animate-hover-spin" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          {/* Theater Mode */}
          <button
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-bold shadow-sm transition-all ${isTheaterMode
              ? "bg-indigo-600 border-indigo-600 text-white shadow-indigo-500/20"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-450 hover:border-indigo-300 dark:hover:border-indigo-900/50"
              }`}
            title="Toggle Theater Mode"
            aria-label="Toggle larger theater mode"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Theater Mode</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#121824] text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-450 hover:border-indigo-300 dark:hover:border-indigo-900/50 shadow-sm transition-colors"
            title="Toggle Fullscreen"
            aria-label="Expand game cabinet to full screen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>

          {/* Rate Game: Upvote/Downvote */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#121824] shadow-sm">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Rate Game:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleVote("up")}
                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center text-xs transition-all ${userVote === "up"
                  ? "text-emerald-500 shadow-sm"
                  : "text-slate-400 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                aria-label="Upvote this game with a thumbs up"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleVote("down")}
                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center text-xs transition-all ${userVote === "down"
                  ? "text-red-500 shadow-sm"
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
      <div
        ref={containerRef}
        className={`relative w-full mb-6 md:mb-8 bg-slate-100 dark:bg-[#080b11] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden rounded-3xl transition-colors ${isFullscreen
          ? "fixed inset-0 z-50 rounded-none w-screen h-screen m-0"
          : isTheaterMode
            ? "w-full h-[80vh] max-h-[90vh] md:h-[85vh] lg:h-[90vh]"
            : "w-full h-[50vh] min-h-[280px] max-h-[400px] sm:h-auto sm:aspect-[16/9] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px]"
          }`}
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

        {isFullscreen && (
          <button
            onClick={handleFullscreen}
            className="absolute top-4 right-4 z-40 bg-slate-950/80 hover:bg-slate-950 text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-105"
            aria-label="Exit fullscreen mode"
          >
            <Minimize2 className="w-6 h-6" />
          </button>
        )}

        <iframe
          ref={iframeRef}
          src={embedUrlWithReferrer}
          className={`absolute inset-0 w-full h-full bg-white dark:bg-[#080b11] transition-transform duration-100 ${iframeSizeOffset ? "scale-[0.999]" : "scale-100"}`}
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          allow="autoplay; fullscreen; pointer-lock"
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
                <Trophy className="w-4 h-4 fill-current" />
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
            <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <span className="w-7 h-7 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 flex items-center justify-center rounded-lg text-sm text-red-500 dark:text-red-400">
                <Keyboard className="w-4 h-4" />
              </span>
              <span>Control Reference & Layout</span>
            </h2>

            {/* Desktop Section */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-indigo-500" />
                <span>Desktop Controls</span>
              </h3>
              <div className="space-y-2.5">
                {desktopControls.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-2 last:border-b-0 last:pb-0 text-sm font-medium">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-gray-200 tracking-wide">
                      {item.key}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-right text-xs">
                      {item.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Mobile Touch Gestures</span>
              </h3>
              <div className="space-y-2.5">
                {mobileControls.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-2 last:border-b-0 last:pb-0 text-sm font-medium">
                    <span className="px-2 py-0.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/30 dark:border-emerald-900/30 rounded-lg text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">
                      {item.key}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-right text-xs">
                      {item.action}
                    </span>
                  </div>
                ))}
              </div>
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

      {/* ── More Games in this Category ── */}
      {related.length > 0 && (
        <section className="pb-2">
          <div className="doodle-separator" />

          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white tracking-wide uppercase leading-none">
                  More {game.category} Games
                </h2>
                <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                  {related.length} more games in this category
                </p>
              </div>
            </div>
            <Link
              href={`/category/${game.category.toLowerCase()}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-violet-400 border border-indigo-200 dark:border-violet-500/30 bg-indigo-50 dark:bg-violet-500/10 hover:bg-indigo-100 dark:hover:bg-violet-500/20 transition-colors"
            >
              View all
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Bento grid — same visual language as homepage */}
          <GameGrid games={related} />
        </section>
      )}

      {/* ── You Might Also Like ── */}
      {suggested.length > 0 && (
        <section className="pb-10">
          <div className="doodle-separator" />

          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30 shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-display font-bold text-slate-800 dark:text-white tracking-wide uppercase leading-none">
                  You Might Also Like
                </h2>
                <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                  Discover games across all genres
                </p>
              </div>
            </div>
            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-fuchsia-600 dark:text-pink-400 border border-fuchsia-200 dark:border-pink-500/30 bg-fuchsia-50 dark:bg-pink-500/10 hover:bg-fuchsia-100 dark:hover:bg-pink-500/20 transition-colors"
            >
              Browse all
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Bento grid — consistent style */}
          <GameGrid games={suggested} />
        </section>
      )}
    </div>
  );
}
