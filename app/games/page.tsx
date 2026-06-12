import { Suspense } from "react";
import GamesClient from "@/components/GamesClient";
import { games, categories } from "@/data/games";
import { GamepadIcon } from "@/components/Icons";

export const metadata = {
  title: "Browse All Games - EraOGames | Era of Games Portal",
  description: "Explore our massive collection of free online games at EraOGames. Find classic OG era games, HTML5 puzzles, action, arcade & drift games instantly.",
};

function GamesExplorerLoader() {
  return (
    <div className="text-center py-24 font-hand">
      <div className="relative w-12 h-12 flex items-center justify-center mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-dashed border-[#2d2d2d] dark:border-[#fdfbf7] rounded-full animate-spin" />
      </div>
      <p className="text-sm text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50">Opening the game cabinet...</p>
    </div>
  );
}

export default function GamesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center text-[#ff4d4d]"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
        >
          <GamepadIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] tracking-tight">
            Arcade Room
          </h1>
          <p className="font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 text-sm">
            Browse and search through <span className="text-[#2d2d2d] dark:text-[#fdfbf7] font-bold">{games.length}</span> free, instant-play HTML5 games
          </p>
        </div>
      </div>

      <Suspense fallback={<GamesExplorerLoader />}>
        <GamesClient games={games} categories={categories} />
      </Suspense>
    </div>
  );
}

