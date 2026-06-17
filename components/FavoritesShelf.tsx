"use client";

import { useState, useEffect } from "react";
import { games } from "@/data/games";
import GameCard from "./GameCard";
import { Star } from "lucide-react";
import type { Game } from "@/types";

export default function FavoritesShelf() {
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const syncFavs = () => {
      try {
        const favSlugs: string[] = JSON.parse(localStorage.getItem("eraogames_favorites") || "[]");
        const list = games.filter((g) => favSlugs.includes(g.slug));
        setFavoriteGames(list);
      } catch (_) { }
    };

    syncFavs();
    window.addEventListener("favorites_updated", syncFavs);
    return () => window.removeEventListener("favorites_updated", syncFavs);
  }, []);

  if (favoriteGames.length === 0) return null;

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
      <div className="flex items-center justify-between mb-8">
        <h2 className="doodle-section-title">
          <Star className="w-6 h-6 text-amber-500 fill-current" />
          <span>Your Bookmarks</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {favoriteGames.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </div>
      <div className="doodle-separator" />
    </section>
  );
}
