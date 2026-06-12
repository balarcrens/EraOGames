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
  Action: "text-[#ff4d4d] dark:text-[#ff6b6b]",
  Racing: "text-[#2d2d2d] dark:text-[#fdfbf7]",
  Puzzle: "text-[#2d5da1] dark:text-[#4dabf7]",
  Adventure: "text-[#2d2d2d] dark:text-[#fdfbf7]",
  Multiplayer: "text-[#ff4d4d] dark:text-[#ff6b6b]",
  Sports: "text-[#2d5da1] dark:text-[#4dabf7]",
  Arcade: "text-[#2d2d2d] dark:text-[#fdfbf7]",
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
  const colorClass = isAll ? "text-[#2d2d2d] dark:text-[#fdfbf7]" : catPageColorMap[currentName] || "text-[#2d2d2d] dark:text-[#fdfbf7]";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 font-hand">
      <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mb-6">
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
        <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">{currentName}</span>
      </div>

      <div className="relative mb-8">
        <div className="flex items-center gap-3 mb-2">
          {!isAll && Icon && (
            <div className={`w-10 h-10 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center ${colorClass}`}
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
            >
              <Icon className="w-5 h-5" />
            </div>
          )}
          {isAll && (
            <div className="w-10 h-10 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center"
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
            >
              <GamepadIcon className="w-5 h-5 text-[#2d2d2d] dark:text-[#fdfbf7]" />
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] tracking-tight">
              {isAll ? "All Games" : `${currentName} Games`}
            </h1>
            <p className="font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 text-sm">
              <span className="text-[#2d2d2d] dark:text-[#fdfbf7] font-bold">{catGames.length}</span> game{catGames.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
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
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center mx-auto mb-4"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          >
            <GamepadIcon className="w-8 h-8 text-[#2d2d2d]/30 dark:text-[#fdfbf7]/30" />
          </div>
          <h2 className="text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-2">No games found</h2>
          <p className="font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50">Check back soon for new games in this category.</p>
        </div>
      )}
    </div>
  );
}
