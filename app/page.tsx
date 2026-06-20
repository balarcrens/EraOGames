import { Suspense } from "react";
import PremiumLobby from "@/components/PremiumLobby";
import { games, categories } from "@/data/games";

function LobbyLoader() {
  return (
    <div className="text-center py-24 font-sans">
      <div className="relative w-12 h-12 flex items-center justify-center mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-dashed border-indigo-500 rounded-full animate-spin" />
      </div>
      <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Powering up the lobby cabinet...</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full max-w-none px-4 sm:px-6 md:px-8 py-6 md:py-10">
      <Suspense fallback={<LobbyLoader />}>
        <PremiumLobby games={games} categories={categories} />
      </Suspense>
    </div>
  );
}
