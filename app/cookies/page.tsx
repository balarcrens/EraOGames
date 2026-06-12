import Link from "next/link";
import { ShieldIcon, HomeIcon } from "@/components/Icons";

export const metadata = {
  title: "Cookies Policy - EraOGames | OG Era Games & Era of Games",
  description: "Read the Cookies Policy for EraOGames. Understand how functional and third-party cookies are used to optimize game loading times.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-[#2d2d2d] dark:text-[#fdfbf7] font-hand">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mb-8">
        <Link href="/" className="flex items-center gap-1 hover:text-[#ff4d4d] transition-colors">
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">Cookies Policy</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10" style={{ transform: "rotate(-0.5deg)" }}>
        <div className="w-12 h-12 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center mx-auto mb-3 text-[#ff4d4d] dark:text-[#ff6b6b]"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
        >
          <ShieldIcon className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-doodle font-bold relative inline-block">
          Cookies Policy
          <span className="absolute -bottom-2 left-0 right-0 h-[5px] bg-[#ff4d4d]/30 rounded-full" />
        </h1>
        <p className="text-xs md:text-sm text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mt-4">
          Last updated: June 12, 2026
        </p>
      </div>

      {/* Cookies Content */}
      <div
        className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-6 md:p-8 space-y-6"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          transform: "rotate(0.3deg)",
        }}
      >
        <p className="text-sm md:text-base leading-relaxed text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70">
          This Cookies Policy explains what cookies are, how EraOGames uses them, and how third-party embedded games might access them when you play.
        </p>

        <div className="doodle-separator" />

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            🍪 1. What are Cookies?
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            Cookies are small text files stored in your browser when you visit a website. They are commonly used to remember preferences, track statistics, and support game-saving systems.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            ⚙️ 2. How EraOGames Uses Cookies
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            EraOGames itself does NOT use advertising cookies or tracking tools like pixels. We use browser `LocalStorage` and session parameters to remember:
          </p>
          <ul className="list-disc pl-5 text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 space-y-2">
            <li>Search parameters on the game explorer screen.</li>
            <li>Category tabs and sorting preferences.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            🕹️ 3. Third-Party Game Frame Cookies
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            Because our games run in embedded standard iframe configurations, third-party game platforms (like GameDistribution) place their own cookies and local browser storage. These are required to:
          </p>
          <ul className="list-disc pl-5 text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 space-y-2">
            <li>Save your in-game progress (such as unlocked levels or characters).</li>
            <li>Render local scoreboards and top ratings.</li>
            <li>Serve appropriate lightweight HTML5 scripts.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            🛠️ 4. Managing Cookies
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            You can clear or block cookies at any time through your browser settings. Please note that blocking third-party cookies might prevent in-game progress or save files from persisting correctly between browser sessions.
          </p>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            For general questions about our cookie procedures, write us a note on our <Link href="/contact" className="text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline font-bold">Contact Us</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
}
