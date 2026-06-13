import Link from "next/link";
import { Gamepad2, Home } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | EraOGames",
  description: "Oops! The page you are looking for does not exist. Go back to EraOGames home or search games.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 md:py-24 text-slate-700 dark:text-slate-300 font-sans">
      <div className="max-w-md w-full bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-premium p-8 md:p-10 text-center relative rounded-2xl">
        {/* Modern 404 text */}
        <div className="relative inline-block mb-6">
          <span className="text-7xl md:text-8xl font-display font-bold select-none bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
            404
          </span>
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-slate-200 dark:bg-slate-800" />
        </div>

        <h1 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white mb-3 tracking-wide">
          Page Not Found
        </h1>
        
        <p className="text-slate-400 dark:text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
          Oops! The page you are looking for has been removed, renamed, or never existed. Don&apos;t worry, the games are still safe!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="sketch-btn w-full sm:w-auto text-xs px-5 py-3 flex items-center justify-center gap-1.5 hover:shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/games"
            className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-3 font-sans font-bold text-xs tracking-wide rounded-xl bg-white dark:bg-[#121824] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-violet-500 dark:hover:border-violet-500/50 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 text-violet-500" />
            <span>Search Games</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
