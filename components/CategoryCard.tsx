import Link from "next/link";
import { ActionIcon, RacingIcon, PuzzleIcon, AdventureIcon, MultiplayerIcon, SportsIcon, ArcadeIcon } from "./Icons";

interface CategoryCardProps {
  name: string;
  count: number;
  index?: number;
}

const rotations = ["-1deg", "1.5deg", "-0.5deg", "0.5deg", "-1.5deg", "1deg", "-0.8deg"];

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Action: ActionIcon,
  Racing: RacingIcon,
  Puzzle: PuzzleIcon,
  Adventure: AdventureIcon,
  Multiplayer: MultiplayerIcon,
  Sports: SportsIcon,
  Arcade: ArcadeIcon,
};

const colorMap: Record<string, string> = {
  Action: "text-[#ff4d4d] dark:text-[#ff6b6b]",
  Racing: "text-[#2d2d2d] dark:text-[#fdfbf7]",
  Puzzle: "text-[#2d5da1] dark:text-[#4dabf7]",
  Adventure: "text-[#2d2d2d] dark:text-[#fdfbf7]",
  Multiplayer: "text-[#ff4d4d] dark:text-[#ff6b6b]",
  Sports: "text-[#2d5da1] dark:text-[#4dabf7]",
  Arcade: "text-[#2d2d2d] dark:text-[#fdfbf7]",
};

const bgMap: Record<string, string> = {
  Action: "bg-[#ff4d4d]/10 dark:bg-[#ff6b6b]/10",
  Racing: "bg-[#2d2d2d]/5 dark:bg-[#fdfbf7]/5",
  Puzzle: "bg-[#2d5da1]/10 dark:bg-[#4dabf7]/10",
  Adventure: "bg-[#2d2d2d]/5 dark:bg-[#fdfbf7]/5",
  Multiplayer: "bg-[#ff4d4d]/10 dark:bg-[#ff6b6b]/10",
  Sports: "bg-[#2d5da1]/10 dark:bg-[#4dabf7]/10",
  Arcade: "bg-[#2d2d2d]/5 dark:bg-[#fdfbf7]/5",
};

export default function CategoryCard({ name, count, index = 0 }: CategoryCardProps) {
  const Icon = iconMap[name];
  const colorClass = colorMap[name] || "text-[#2d2d2d] dark:text-[#fdfbf7]";
  const bgClass = bgMap[name] || "bg-[#2d2d2d]/5 dark:bg-[#fdfbf7]/5";
  const rot = rotations[index % rotations.length];

  return (
    <Link
      href={`/category/${name.toLowerCase()}`}
      className="sketch-card block p-5 md:p-6 text-center h-full hover:-translate-y-1.5 transition-all duration-200"
      style={{ transform: `rotate(${rot})` }}
    >
      <div className="flex items-center justify-center mb-3">
        <div className={`w-12 h-12 ${bgClass} border-2 border-[#2d2d2d] dark:border-[#fdfbf7] flex items-center justify-center ${colorClass} transition-all duration-200 group-hover:scale-110`}
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      <h3 className="font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] text-sm md:text-base">
        {name}
      </h3>
      <p className="text-xs md:text-sm font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mt-1.5">{count} games</p>
    </Link>
  );
}
