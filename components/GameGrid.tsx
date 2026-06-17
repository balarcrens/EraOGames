import type { Game } from "@/types";
import GameCard from "./GameCard";

interface GameGridProps {
  games: readonly Game[];
}

export default function GameGrid({ games }: GameGridProps) {
  // Poki/CrazyGames-style bento grid — dense auto-placement with mixed spans
  const getSpanClass = (index: number) => {
    const mod = index % 12;
    if (mod === 0)  return "col-span-2 row-span-2"; // Large featured 2×2
    if (mod === 4)  return "col-span-2 row-span-1"; // Wide banner 2×1
    if (mod === 7)  return "col-span-1 row-span-2"; // Tall portrait 1×2
    if (mod === 10) return "col-span-2 row-span-2"; // Large featured 2×2
    return "col-span-1 row-span-1";                  // Standard tile 1×1
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 md:gap-3 grid-flow-row-dense auto-rows-[115px] sm:auto-rows-[130px] md:auto-rows-[140px] lg:auto-rows-[158px] w-full">
      {games.map((game, index) => (
        <div key={game.id} className={`${getSpanClass(index)} w-full h-full min-h-0`}>
          <GameCard game={game} index={index} />
        </div>
      ))}
    </div>
  );
}
