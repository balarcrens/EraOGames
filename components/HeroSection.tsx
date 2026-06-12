import Link from "next/link";
import { GamepadIcon, TrendingIcon, ArrowRightIcon, DoodleStar } from "./Icons";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#fdfbf7] dark:bg-[#18181c] transition-colors duration-200">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(var(--shadow-color) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      {/* Floating Side Stickers (Visible on large viewports) */}
      <div className="absolute left-[5%] top-[25%] hidden xl:flex flex-col items-center gap-1 p-3.5 bg-white dark:bg-[#242429] border-2 border-[#ff4d4d] dark:border-[#ff6b6b] shadow-sketch text-[#2d2d2d] dark:text-[#fdfbf7] font-hand font-bold text-sm select-none animate-float-slow"
        style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", transform: "rotate(-5deg)" }}
      >
        <span className="text-2xl">🎯</span>
        <span>Action Zone</span>
      </div>

      <div className="absolute right-[5%] top-[30%] hidden xl:flex flex-col items-center gap-1 p-3.5 bg-white dark:bg-[#242429] border-2 border-[#2d5da1] dark:border-[#4dabf7] shadow-sketch text-[#2d2d2d] dark:text-[#fdfbf7] font-hand font-bold text-sm select-none animate-float-slow [animation-delay:2s]"
        style={{ borderRadius: "15px 255px 15px 225px / 225px 15px 255px 15px", transform: "rotate(6deg)" }}
      >
        <span className="text-2xl">🧩</span>
        <span>Mind Puzzles</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm text-[#2d2d2d] dark:text-[#fdfbf7] font-hand font-bold text-sm mb-6 animate-wobble"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", transform: "rotate(-1deg)" }}
        >
          <DoodleStar className="w-4 h-4 text-[#ff4d4d] dark:text-[#ff6b6b]" />
          <span>10,000+ Free Games Available</span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-6 leading-[0.95]"
          style={{ transform: "rotate(-0.5deg)" }}
        >
          Play Free
          <br />
          <span className="relative">
            Online Games
            <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-[#ff4d4d]/30 rounded-full" />
          </span>
        </h1>

        <p
          className="text-base md:text-lg font-hand text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ transform: "rotate(0.3deg)" }}
        >
          Welcome to the ultimate <span className="text-[#ff4d4d] dark:text-[#ff6b6b] font-bold">Era of Games</span>! Play free classic <span className="text-[#2d5da1] dark:text-[#4dabf7] font-bold">OG Era Games</span> instantly at EraOGames —
          <span className="text-[#2d2d2d] dark:text-[#fdfbf7] font-bold"> no downloads, no hassle.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/games"
            className="sketch-btn text-base px-8 py-3.5 group hover:scale-105 active:scale-95 transition-all duration-150"
          >
            <GamepadIcon className="w-5 h-5" />
            Browse All Games
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/category/all"
            className="sketch-btn text-base px-8 py-3.5 bg-white hover:bg-[#2d5da1] hover:text-white dark:hover:bg-[#2d5da1] dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-150"
          >
            <TrendingIcon className="w-4 h-4" />
            Explore Categories
          </Link>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { value: "10K+", label: "Free Games", rotate: "-1deg", color: "border-[#ff4d4d] dark:border-[#ff6b6b]" },
            { value: "500+", label: "Categories", rotate: "0.5deg", color: "border-[#2d2d2d] dark:border-[#fdfbf7]" },
            { value: "2M+", label: "Active Players", rotate: "-0.5deg", color: "border-[#2d5da1] dark:border-[#4dabf7]" },
            { value: "4.8", label: "Avg Rating", rotate: "1deg", color: "border-[#ffeb3b] dark:border-[#ffeb3b]" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`sticky-note tape-top border-2 ${stat.color} p-4 md:p-5 hover:shadow-sketch-hover hover:-translate-y-1 transition-all duration-200`}
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", transform: `rotate(${stat.rotate})` }}
            >
              <div className="text-2xl md:text-3xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7]">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
