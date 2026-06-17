import { Suspense } from "react";
import GamesClient from "@/components/GamesClient";
import { games, categories } from "@/data/games";
import { GamepadIcon } from "@/components/Icons";

function GamesLoader() {
  return (
    <div className="text-center py-20 font-sans">
      <div className="relative w-12 h-12 flex items-center justify-center mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-dashed border-indigo-500 rounded-full animate-spin" />
      </div>
      <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Opening the game cabinet...</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full max-w-none px-3 sm:px-5 md:px-8 py-5 md:py-8">
      {/* Compact gamer lobby header */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-200 dark:border-slate-800/80">
        <div className="w-10 h-10 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-indigo-600 dark:text-violet-400 rounded-xl shrink-0">
          <GamepadIcon className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white tracking-wide uppercase leading-none">
            EraOGames Arcade
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold mt-0.5">
            <span className="text-indigo-600 dark:text-violet-400 font-bold">{games.length.toLocaleString()}</span> free browser games — play instantly
          </p>
        </div>
      </div>

      {/* Full-width bento game grid — no filters */}
      <Suspense fallback={<GamesLoader />}>
        <GamesClient games={games} categories={categories} hideFilters={true} />
      </Suspense>
    </div>
  );
}
