import type { Game } from "@/types";
import GameCard from "./GameCard";

interface GameGridProps {
  games: readonly Game[];
}

export default function GameGrid({ games }: GameGridProps) {
  // Poki/CrazyGames-style bento grid — dense auto-placement with mixed spans, optimized for responsiveness
  const getSpanClass = (index: number) => {
    const mod = index % 12;
    if (mod === 0)  return "sm:col-span-2 sm:row-span-2 col-span-1 row-span-1"; // Large featured 2×2 on tablet/desktop
    if (mod === 4)  return "sm:col-span-2 sm:row-span-1 col-span-1 row-span-1"; // Wide banner 2×1 on tablet/desktop
    if (mod === 7)  return "sm:col-span-1 sm:row-span-2 col-span-1 row-span-1"; // Tall portrait 1×2 on tablet/desktop
    if (mod === 10) return "sm:col-span-2 sm:row-span-2 col-span-1 row-span-1"; // Large featured 2×2 on tablet/desktop
    return "col-span-1 row-span-1";                  // Standard tile 1×1
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 grid-flow-row-dense auto-rows-[130px] sm:auto-rows-[120px] md:auto-rows-[130px] lg:auto-rows-[145px] xl:auto-rows-[160px] w-full">
      {games.map((game, index) => (
        <div key={game.id} className={`${getSpanClass(index)} w-full h-full min-h-0`}>
          <GameCard game={game} index={index} />
        </div>
      ))}
    </div>
  );
}
