import Link from "next/link";
import { Gamepad2, TrendingUp, ArrowRight, Star, Swords, Brain } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#07090e] transition-colors duration-300 border-b border-slate-200/50 dark:border-slate-900/60">
      {/* Background cyber grid patterns */}
      <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Decorative Radial Glowing Blobs for gaming aesthetics */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-indigo-500/10 dark:bg-indigo-500/[0.05] rounded-full blur-[70px] md:blur-[110px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] md:w-[550px] h-[400px] md:h-[550px] bg-violet-600/10 dark:bg-violet-600/[0.05] rounded-full blur-[90px] md:blur-[130px] pointer-events-none animate-pulse-slow" />

      {/* Floating Side Stickers (Glassmorphic gaming badges with Lucide SVGs) */}
      <div className="absolute left-[6%] top-[25%] hidden xl:flex flex-col items-center gap-2 p-4 bg-white/70 dark:bg-[#0e1320]/75 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl text-slate-800 dark:text-gray-200 rounded-2xl select-none animate-float-slow">
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center rounded-xl text-indigo-500 shadow-sm">
          <Swords className="w-6 h-6 animate-pulse" />
        </div>
        <span className="font-display font-bold uppercase tracking-wider text-[11px] text-indigo-600 dark:text-indigo-400 mt-1">Action Zone</span>
      </div>

      <div className="absolute right-[6%] top-[30%] hidden xl:flex flex-col items-center gap-2 p-4 bg-white/70 dark:bg-[#0e1320]/75 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl text-slate-800 dark:text-gray-200 rounded-2xl select-none animate-float-slow [animation-delay:2s]">
        <div className="w-12 h-12 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/30 flex items-center justify-center rounded-xl text-violet-500 shadow-sm">
          <Brain className="w-6 h-6 animate-pulse" />
        </div>
        <span className="font-display font-bold uppercase tracking-wider text-[11px] text-violet-600 dark:text-violet-400 mt-1">Mind Puzzles</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-[#0e1320] border border-slate-200 dark:border-slate-800 shadow-md rounded-full text-slate-700 dark:text-slate-300 font-semibold text-xs mb-8">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
          <span className="tracking-wide">Over 10,000+ Free Browser Games</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7.5xl lg:text-8xl font-display font-bold text-slate-800 dark:text-white mb-6 leading-tight tracking-tight">
          Play Free
          <br />
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.15)]">
            Online Games
          </span>
        </h1>

        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
          Welcome to the ultimate <span className="text-indigo-600 dark:text-indigo-400 font-bold">Era of Games</span>! Play classic <span className="text-violet-600 dark:text-violet-400 font-bold">OG Era Games</span> instantly in your browser —
          <span className="text-slate-800 dark:text-gray-200 font-semibold"> no downloads, no installations, just instant fun.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/games"
            className="sketch-btn text-base px-8 py-4 group hover:scale-[1.03] active:scale-[0.98] transition-all inline-flex items-center gap-2"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Browse All Games</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <Link
            href="/category/all"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-sans font-bold text-base tracking-wide rounded-xl bg-white dark:bg-[#0e1320] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-md hover:border-violet-500 dark:hover:border-violet-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <TrendingUp className="w-4 h-4 text-violet-500" />
            <span>Explore Categories</span>
          </Link>
        </div>

        {/* Statistics Panels */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {[
            { value: "10K+", label: "Free Games", bg: "hover:border-indigo-500/50" },
            { value: "500+", label: "Categories", bg: "hover:border-fuchsia-500/50" },
            { value: "2M+", label: "Active Players", bg: "hover:border-violet-500/50" },
            { value: "4.8/5", label: "Avg Rating", bg: "hover:border-amber-500/50" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-white/60 dark:bg-[#0e1320]/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1.5 ${stat.bg}`}
            >
              <div className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-slate-200">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-wider text-slate-400 dark:text-slate-500 mt-1 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
