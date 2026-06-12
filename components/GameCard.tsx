import Link from "next/link";
import type { Game } from "@/types";
import { PlayIcon, RatingStarIcon, EyeIcon } from "./Icons";

interface GameCardProps {
  game: Game;
  index?: number;
}

const rotations = ["-1.5deg", "1deg", "-0.5deg", "1.5deg", "-1deg", "0.5deg"];

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const rot = rotations[index % rotations.length];
  const marginTop = index % 3 === 1 ? "mt-2" : index % 3 === 2 ? "mt-1" : "";

  return (
    <Link
      href={`/game/${game.slug}`}
      className={`sketch-card block group ${marginTop}`}
      style={{ transform: `rotate(${rot})` }}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e0d8] dark:bg-[#2c2c35]"
        style={{ borderRadius: "240px 10px 210px 10px / 10px 210px 10px 240px" }}
      >
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-90"
          loading="lazy"
        />

        <div className="play-overlay">
          <div className="play-icon">
            <PlayIcon className="w-6 h-6 ml-0.5" />
          </div>
        </div>

        <div className="absolute top-2.5 left-2.5 flex gap-2">
          <span className="doodle-badge text-[10px]">
            {game.category}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm text-[10px] text-[#2d2d2d] dark:text-[#fdfbf7] font-hand font-bold"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
        >
          <RatingStarIcon className="w-3 h-3 text-[#ff4d4d]" />
          {game.rating}
        </div>
      </div>

      {/* Info card text block below image */}
      <div className="p-3 bg-white dark:bg-[#242429] border-t-2 border-dashed border-[#e5e0d8] dark:border-[#44444a]"
        style={{ borderRadius: "0 0 15px 255px / 0 0 15px 225px" }}
      >
        <h3 className="font-doodle font-bold text-sm md:text-base text-[#2d2d2d] dark:text-[#fdfbf7] group-hover:text-[#ff4d4d] dark:group-hover:text-[#ff6b6b] transition-colors duration-200 line-clamp-1">
          {game.title}
        </h3>
        <div className="flex items-center justify-between mt-1 text-[11px] font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50">
          <span className="flex items-center gap-1">
            <EyeIcon className="w-3.5 h-3.5" />
            {game.plays.toLocaleString()} plays
          </span>
          <span className="text-[10px] uppercase font-bold text-[#ff4d4d] dark:text-[#ff6b6b]">
            OG Era
          </span>
        </div>
      </div>
    </Link>
  );
}
