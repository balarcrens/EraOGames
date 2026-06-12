import type { Game } from "@/types";
import GameCard from "./GameCard";

interface GameGridProps {
  games: readonly Game[];
  columns?: number;
}

export default function GameGrid({ games, columns = 4 }: GameGridProps) {
  const gridColsClass = columns === 3
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${gridColsClass} gap-6 md:gap-8`}>
      {games.map((game, index) => (
        <div key={game.id}>
          <GameCard game={game} index={index} />
        </div>
      ))}
    </div>
  );
}
