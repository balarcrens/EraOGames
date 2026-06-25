"use client";

import Link from "next/link";
import { games } from "@/data/games";
import { Play, ArrowRight, Gamepad2 } from "lucide-react";

export default function HeroSection() {
  // Retrieve thumbnails for the floating cards from actual games
  const game1 = games.find((g) => g.slug === "street-mayhem-driver") || games[0]!;
  const game2 = games.find((g) => g.slug === "off-the-hook-ring-puzzle") || games[1]!;
  const game3 = games.find((g) => g.slug === "momentum") || games[3]!;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#05070c] transition-colors duration-300 border-b border-slate-200 dark:border-slate-900/60 py-12 md:py-16 lg:py-24">
      {/* Background radial glowing blobs */}
      <div className="absolute top-[-10%] left-[20%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-indigo-500/10 rounded-full blur-[90px] md:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-violet-600/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side Content Column */}
        <div className="lg:col-span-7 flex flex-col text-left max-w-2xl">
          {/* Badge */}
          <div className="animate-fade-in-down inline-flex items-center gap-1.5 px-4 py-1.5 bg-violet-600/25 border border-violet-500/35 rounded-full text-violet-400 font-display font-bold text-[10px] tracking-wider uppercase mb-6 w-fit shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            <span>★ OVER 5,000 TITLES READY TO PLAY</span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-up animate-delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
            Play Thousands of
            <br />
            <span className="text-gradient-cyan drop-shadow-[0_2px_15px_rgba(34,211,238,0.2)]">Free Online Games</span>
            <br />
            Instantly
          </h1>

          {/* Description */}
          <p className="animate-fade-in-up animate-delay-200 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed mb-8 max-w-lg">
            No downloads, no installations. Experience premium browser-based gaming on any device. Start your adventure now.
          </p>

          {/* Call-to-action buttons */}
          <div className="animate-fade-in-up animate-delay-300 flex flex-wrap items-center gap-4">
            <Link
              href="/games"
              className="group px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-[0.98] inline-flex items-center gap-2"
            >
              <Play className="w-4.5 h-4.5 fill-current transition-transform duration-300 group-hover:scale-110" />
              <span>PLAY NOW</span>
            </Link>

            <Link
              href="/category/all"
              className="group px-8 py-3.5 bg-slate-200 dark:bg-slate-900/60 hover:bg-slate-300 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-900 dark:text-white rounded-full font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-[0.98] inline-flex items-center gap-2"
            >
              <span>EXPLORE GAMES</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Side Slanted Stacked Cards */}
        <div className="lg:col-span-5 flex justify-center items-center h-[300px] sm:h-[450px] relative select-none mt-8 lg:mt-0">
          {/* Card 1 (Bottom Left) */}
          <Link
            href={`/game/${game1.slug}`}
            className="animate-fade-in-up duration-500 animate-delay-400 absolute hero-card-slanted w-[120px] sm:w-[190px] h-[170px] sm:h-[260px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#090d16] left-[0%] sm:left-[5%] bottom-[5%] sm:bottom-[10%] rotate-[-10deg] z-10"
            aria-label={`Play ${game1.title}`}
          >
            <img
              src={game1.thumbnail}
              alt={game1.title}
              className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-all duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Card 2 (Middle) */}
          <Link
            href={`/game/${game2.slug}`}
            className="animate-fade-in-up animate-delay-500 duration-500 absolute hero-card-slanted w-[130px] sm:w-[200px] h-[180px] sm:h-[270px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#090d16] left-[28%] sm:left-[32%] top-[10%] sm:top-[15%] rotate-[-4deg] z-20"
            aria-label={`Play ${game2.title}`}
          >
            <img
              src={game2.thumbnail}
              alt={game2.title}
              className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-all duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Card 3 (Top Right) */}
          <Link
            href={`/game/${game3.slug}`}
            className="animate-fade-in-up animate-delay-600 duration-500 absolute hero-card-slanted w-[120px] sm:w-[195px] h-[175px] sm:h-[265px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#090d16] right-[0%] sm:right-[5%] bottom-[10%] sm:bottom-[15%] rotate-[8deg] z-30"
            aria-label={`Play ${game3.title}`}
          >
            <img
              src={game3.thumbnail}
              alt={game3.title}
              className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-all duration-500 group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}