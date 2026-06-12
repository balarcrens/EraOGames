import Link from "next/link";
import { GamepadIcon, DoodleStar, HomeIcon, GridIcon } from "@/components/Icons";

export const metadata = {
  title: "About Us - EraOGames | OG Era Games & Era of Games",
  description: "Learn about EraOGames — the story behind our hand-drawn games portal, our mission to revive the OG era games, and our browser gaming engine.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-[#2d2d2d] dark:text-[#fdfbf7] font-hand">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mb-8">
        <Link href="/" className="flex items-center gap-1 hover:text-[#ff4d4d] transition-colors">
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">About Us</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12" style={{ transform: "rotate(-0.5deg)" }}>
        <h1 className="text-4xl md:text-5xl font-doodle font-bold relative inline-block">
          About EraOGames
          <span className="absolute -bottom-2 left-0 right-0 h-[5px] bg-[#ff4d4d]/30 rounded-full" />
        </h1>
        <p className="text-base md:text-lg text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 mt-4 max-w-lg mx-auto">
          Built with pen, paper, and passion to make online gaming free, instant, and fun!
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-10">
        {/* Story Section */}
        <section
          className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-6 md:p-8"
          style={{
            borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            transform: "rotate(0.5deg)",
          }}
        >
          <h2 className="text-xl md:text-2xl font-doodle font-bold mb-4 flex items-center gap-2">
            <DoodleStar className="w-5 h-5 text-[#ff4d4d] dark:text-[#ff6b6b]" />
            Our Scribbled Story
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 mb-4">
            EraOGames started as a quick sketch on the back of a college notebook. We were tired of endless installation bars, massive updates, and portals cluttered with intrusive ads. We wanted something simple: a cozy, responsive, and gorgeous space where anyone could jump in and play classic and trending games instantly in the browser. We represent the absolute golden era of browser gaming—a true Era of Games.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70">
            What started as a hobby project between two developers has grown into a portal visited by thousands of gamers daily. Even as we add more games, our core philosophy remains unchanged: keep it simple, keep it fast, and keep it sketching!
          </p>
        </section>

        {/* Highlight sticky notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Instant Play",
              desc: "Zero downloads, zero installations. Just click and play in your browser instantly.",
              rotate: "-1deg",
              color: "border-[#ff4d4d] dark:border-[#ff6b6b]",
            },
            {
              title: "Hand-Drawn Vibe",
              desc: "Custom-made interfaces featuring sketches, warm tones, and friendly typography.",
              rotate: "1.5deg",
              color: "border-[#2d2d2d] dark:border-[#fdfbf7]",
            },
            {
              title: "Curated Collection",
              desc: "Handpicked, fast-loading, highly-rated games across seven categories.",
              rotate: "-0.5deg",
              color: "border-[#2d5da1] dark:border-[#4dabf7]",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`sticky-note p-5 border-2 ${item.color}`}
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                transform: `rotate(${item.rotate})`,
              }}
            >
              <h3 className="font-doodle font-bold text-base md:text-lg mb-2 text-[#2d2d2d] dark:text-[#fdfbf7]">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <section
          className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-6 md:p-8"
          style={{
            borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            transform: "rotate(-0.5deg)",
          }}
        >
          <h2 className="text-xl md:text-2xl font-doodle font-bold mb-6 flex items-center gap-2">
            <GamepadIcon className="w-5 h-5 text-[#2d5da1] dark:text-[#4dabf7]" />
            The Sketch Squad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Alex Scribble",
                role: "Chief Pixel Pusher",
                quote: "\"If it can't be drawn, it can't be coded!\"",
              },
              {
                name: "Jordan Pencil",
                role: "Lead Frame Builder",
                quote: "\"Smooth loops and fast load times are my jam.\"",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="p-4 border border-[#2d2d2d] dark:border-[#fdfbf7] bg-[#fdfbf7] dark:bg-[#18181c]"
                style={{
                  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                  transform: i % 2 === 0 ? "rotate(1deg)" : "rotate(-1deg)",
                }}
              >
                <div className="w-12 h-12 bg-white dark:bg-[#242429] border border-[#2d2d2d] dark:border-[#fdfbf7] rounded-full flex items-center justify-center font-doodle font-bold text-lg mb-3 shadow-sketch-sm text-[#2d2d2d] dark:text-[#fdfbf7]">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-doodle font-bold text-base text-[#2d2d2d] dark:text-[#fdfbf7]">{member.name}</h3>
                <p className="text-xs text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 font-bold uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-xs italic text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 leading-relaxed">
                  {member.quote}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center py-6">
          <Link href="/games" className="sketch-btn px-8 py-3.5 group">
            <GamepadIcon className="w-5 h-5" />
            Let&apos;s Play Some Games!
          </Link>
        </div>
      </div>
    </div>
  );
}
