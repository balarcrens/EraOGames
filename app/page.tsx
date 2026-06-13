import HeroSection from "@/components/HeroSection";
import GameGrid from "@/components/GameGrid";
import CategoryCard from "@/components/CategoryCard";
import FavoritesShelf from "@/components/FavoritesShelf";
import { games, categories } from "@/data/games";
import { TrendingUp, Star } from "lucide-react";

function getCategoryCount(categoryName: string) {
  return games.filter((g) => g.category.toLowerCase() === categoryName.toLowerCase()).length;
}

export default function HomePage() {
  const trending = [...games].sort((a, b) => b.plays - a.plays).slice(0, 10);

  return (
    <div>
      <HeroSection />

      {/* Dynamic Bookmarks favorites shelf */}
      <FavoritesShelf />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="doodle-section-title">
            <Star className="w-6 h-6 text-indigo-500 fill-current" />
            <span>Game Categories</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={getCategoryCount(cat.name)}
              index={i}
            />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="doodle-separator" />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="doodle-section-title">
            <TrendingUp className="w-6 h-6 text-violet-500" />
            <span>Trending Games</span>
          </h2>
        </div>
        <GameGrid games={trending} />
      </section>
    </div>
  );
}
