import Link from "next/link";
import { Swords, Car, Brain, Compass, Users, Trophy, Gamepad } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  index?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Action: Swords,
  Racing: Car,
  Puzzle: Brain,
  Adventure: Compass,
  Multiplayer: Users,
  Sports: Trophy,
  Arcade: Gamepad,
};

const colorMap: Record<string, string> = {
  Action: "text-red-500 dark:text-red-400",
  Racing: "text-orange-500 dark:text-orange-400",
  Puzzle: "text-blue-500 dark:text-blue-400",
  Adventure: "text-emerald-500 dark:text-emerald-400",
  Multiplayer: "text-violet-500 dark:text-violet-400",
  Sports: "text-indigo-500 dark:text-indigo-400",
  Arcade: "text-pink-500 dark:text-pink-400",
};

const bgMap: Record<string, string> = {
  Action: "bg-red-500/10 dark:bg-red-500/5 border-red-500/20 dark:border-red-500/10",
  Racing: "bg-orange-500/10 dark:bg-orange-500/5 border-orange-500/20 dark:border-orange-500/10",
  Puzzle: "bg-blue-500/10 dark:bg-blue-500/5 border-blue-500/20 dark:border-blue-500/10",
  Adventure: "bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/20 dark:border-emerald-500/10",
  Multiplayer: "bg-violet-500/10 dark:bg-violet-500/5 border-violet-500/20 dark:border-violet-500/10",
  Sports: "bg-indigo-500/10 dark:bg-indigo-500/5 border-indigo-500/20 dark:border-indigo-500/10",
  Arcade: "bg-pink-500/10 dark:bg-pink-500/5 border-pink-500/20 dark:border-pink-500/10",
};

export default function CategoryCard({ name, count, index = 0 }: CategoryCardProps) {
  const Icon = iconMap[name];
  const colorClass = colorMap[name] || "text-indigo-500 dark:text-indigo-400";
  const bgClass = bgMap[name] || "bg-indigo-500/10 dark:bg-indigo-500/5 border-indigo-500/20 dark:border-indigo-500/10";

  return (
    <Link
      href={`/category/${name.toLowerCase()}`}
      className="sketch-card block p-5 md:p-6 text-center h-full hover:-translate-y-1.5 transition-all duration-300 group"
      aria-label={`Browse free games in category: ${name}. There are ${count} games available`}
    >
      <div className="flex items-center justify-center mb-3.5">
        <div className={`w-12 h-12 ${bgClass} border flex items-center justify-center ${colorClass} rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-sm`}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base group-hover:text-indigo-600 dark:group-hover:text-violet-400 transition-colors">
        {name}
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">{count} games</p>
    </Link>
  );
}
