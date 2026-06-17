import { notFound } from "next/navigation";
import Link from "next/link";
import GameGrid from "@/components/GameGrid";
import { games, categories } from "@/data/games";
import {
  HomeIcon,
  GridIcon,
  ChevronRightIcon,
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

const catPageIconMap: Record<GameCategory, React.FC<{ className?: string }>> = {
  Action: ActionIcon,
  Racing: RacingIcon,
  Puzzle: PuzzleIcon,
  Adventure: AdventureIcon,
  Multiplayer: MultiplayerIcon,
  Sports: SportsIcon,
  Arcade: ArcadeIcon,
};

const catPageColorMap: Record<string, string> = {
  Action: "text-red-500 dark:text-red-400",
  Racing: "text-orange-500 dark:text-orange-400",
  Puzzle: "text-blue-500 dark:text-blue-400",
  Adventure: "text-emerald-500 dark:text-emerald-400",
  Multiplayer: "text-violet-500 dark:text-violet-400",
  Sports: "text-indigo-500 dark:text-indigo-400",
  Arcade: "text-pink-500 dark:text-pink-400",
};

export function generateStaticParams() {
  const names = categories.map((c) => c.name.toLowerCase());
  return [...names, "all"].map((name) => ({ name }));
}

export function generateMetadata({ params }: { params: { name: string } }) {
  const cat = categories.find((c) => c.name.toLowerCase() === params.name);
  if (!cat && params.name !== "all") return { title: "Category Not Found - EraOGames" };
  const name = cat ? cat.name : "All";
  return {
    title: `${name} Games - Play Free Online | EraOGames`,
    description: `Browse and play the best free ${name.toLowerCase()} games on EraOGames. Find classic OG era games and trending HTML5 instant titles.`,
  };
}

export default function CategoryPage({ params }: { params: { name: string } }) {
  const isAll = params.name === "all";
  const category = categories.find((c) => c.name.toLowerCase() === params.name);

  if (!isAll && !category) notFound();

  const catGames = isAll
    ? games
    : games.filter((g) => g.category.toLowerCase() === params.name);

  const currentName = isAll ? "All Games" : category!.name;
  const Icon = isAll ? null : catPageIconMap[currentName as GameCategory];
  const colorClass = isAll ? "text-slate-800 dark:text-white" : catPageColorMap[currentName] || "text-slate-800 dark:text-white";

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 text-slate-800 dark:text-gray-100 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400 dark:text-slate-500 mb-6 font-medium">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <HomeIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <ChevronRightIcon className="w-3 h-3 text-slate-300 dark:text-slate-700" />
        <Link href="/games" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <GridIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Games</span>
        </Link>
        <ChevronRightIcon className="w-3 h-3 text-slate-300 dark:text-slate-700" />
        <span className="text-slate-500 dark:text-slate-400 font-semibold">{currentName}</span>
      </div>

      <div className="relative mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          {!isAll && Icon && (
            <div className="w-11 h-11 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-center rounded-2xl"
            >
              <Icon className={`w-5 h-5 ${colorClass}`} />
            </div>
          )}
          {isAll && (
            <div className="w-11 h-11 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-center rounded-2xl"
            >
              <GamepadIcon className="w-5 h-5 text-indigo-500" />
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-white tracking-wide">
              {isAll ? "All Games" : `${currentName} Games`}
            </h1>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
              <span className="text-slate-800 dark:text-white font-bold">{catGames.length}</span> games active
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-8">
        <Link
          href="/category/all"
          className={isAll ? "chip-active" : "chip-default"}
        >
          All
        </Link>
        {categories.map((cat) => {
          const CatIcon = catPageIconMap[cat.name as GameCategory];
          const isActive = cat.name.toLowerCase() === params.name;
          return (
            <Link
              key={cat.name}
              href={`/category/${cat.name.toLowerCase()}`}
              className={isActive ? "chip-active flex items-center gap-1.5" : "chip-default flex items-center gap-1.5"}
            >
              {CatIcon && <CatIcon className="w-3.5 h-3.5" />}
              {cat.name}
            </Link>
          );
        })}
      </div>

      {catGames.length > 0 ? (
        <GameGrid games={catGames} />
      ) : (
        <div className="text-center py-20 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mx-auto mb-4 rounded-full"
          >
            <GamepadIcon className="w-8 h-8 text-slate-300 dark:text-slate-700" />
          </div>
          <h2 className="text-lg font-display font-bold text-slate-800 dark:text-white mb-1">No games found</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">Check back soon for new games in this category.</p>
        </div>
      )}
    </div>
  );
}
