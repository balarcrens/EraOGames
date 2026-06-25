import Link from "next/link";
import { Gamepad2, Star, Home } from "lucide-react";

export const metadata = {
  title: "About Us - EraOGames | OG Era Games & Era of Games",
  description: "Learn about EraOGames — our mission to revive classic browser gaming and provide the best free games portal.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-slate-700 dark:text-slate-400 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 font-medium">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-500 dark:text-slate-400 font-semibold">About Us</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          About EraOGames
          <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto font-medium">
          Making online gaming free, responsive, instant, and high-fidelity for everyone.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-10">
        {/* Story Section */}
        <section
          className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-premium p-6 md:p-8 rounded-2xl"
        >
          <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-indigo-500 fill-current" />
            <span>Our Gaming Vision</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            EraOGames started with a simple goal: we were tired of endless installation bars, massive updates, and portals cluttered with intrusive ads. We wanted something simple: a cozy, responsive, and gorgeous space where anyone could jump in and play classic and trending games instantly in the browser. We represent the absolute golden era of browser gaming—a true Era of Games.
          </p>
          <p className="text-sm md:text-base leading-relaxed">
            What started as a hobby project between two developers has grown into a portal visited by thousands of gamers daily. Even as we add more games, our core philosophy remains unchanged: keep it simple, keep it fast, and keep it polished!
          </p>
        </section>

        {/* Highlight sticky notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Instant Play",
              desc: "Zero downloads, zero installations. Just click and play in your browser instantly.",
              color: "border-slate-200 dark:border-slate-800",
            },
            {
              title: "Modern Interface",
              desc: "Custom-made interfaces featuring geometric grids, dark mode support, and clean typography.",
              color: "border-slate-200 dark:border-slate-800",
            },
            {
              title: "Curated Collection",
              desc: "Handpicked, fast-loading, highly-rated games across seven popular categories.",
              color: "border-slate-200 dark:border-slate-800",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-[#121824] p-5 border ${item.color} rounded-2xl shadow-premium`}
            >
              <h3 className="font-display font-bold text-base md:text-lg mb-2 text-slate-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <section
          className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-premium p-6 md:p-8 rounded-2xl"
        >
          <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-violet-500" />
            <span>The Developer Squad</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Alex",
                role: "Chief UI Designer",
                quote: "\"If a layout isn't fully responsive and stunning at first glance, it isn't finished!\"",
              },
              {
                name: "Jordan",
                role: "Lead Systems Engineer",
                quote: "\"Smooth loops, low latency, and zero installation hassles are my jam.\"",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="p-5 border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0d121c] rounded-xl hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center font-display font-bold text-lg mb-3 shadow-sm text-indigo-500">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">{member.name}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-xs italic text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {member.quote}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center py-6">
          <Link href="/games" className="sketch-btn px-8 py-3.5 group hover:shadow-lg inline-flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            <span>Let&apos;s Play Some Games!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
