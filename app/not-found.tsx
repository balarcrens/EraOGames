import Link from "next/link";
import { GamepadIcon, HomeIcon } from "@/components/Icons";

export const metadata = {
  title: "404 - Page Not Found | EraOGames",
  description: "Oops! The page you are looking for has been scribbled over or does not exist. Go back to EraOGames home or search games.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 md:py-24 text-[#2d2d2d] dark:text-[#fdfbf7]">
      <div
        className="max-w-md w-full bg-white dark:bg-[#242429] border-[3px] border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-8 md:p-10 text-center relative pin tape-top"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          transform: "rotate(-1deg)",
        }}
      >
        {/* Sketchy 404 Icon/Number */}
        <div className="relative inline-block mb-6">
          <span className="text-7xl md:text-8xl font-doodle font-bold select-none text-[#ff4d4d]">
            404
          </span>
          <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#2d2d2d] dark:bg-[#fdfbf7] rounded-full" />
        </div>

        <h1 className="text-2xl md:text-3xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-4">
          Lost in the Margins!
        </h1>
        
        <p className="font-hand text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 text-sm md:text-base leading-relaxed mb-8">
          Oops! The page you are looking for has been scribbled out, erased, or never made it onto the canvas. Don&apos;t worry, the games are still safe!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="sketch-btn w-full sm:w-auto text-xs px-5 py-2.5 flex items-center justify-center gap-1.5"
            style={{ transform: "rotate(0.5deg)" }}
          >
            <HomeIcon className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/games"
            className="sketch-btn w-full sm:w-auto text-xs px-5 py-2.5 bg-white dark:bg-[#242429] text-[#2d2d2d] dark:text-[#fdfbf7] hover:bg-[#2d5da1] dark:hover:bg-[#2d5da1] hover:text-white dark:hover:text-white flex items-center justify-center gap-1.5"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <GamepadIcon className="w-4 h-4" />
            Search Games
          </Link>
        </div>
      </div>
    </div>
  );
}
