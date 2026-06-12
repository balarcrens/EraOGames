import Link from "next/link";
import { ShieldIcon, HomeIcon } from "@/components/Icons";

export const metadata = {
  title: "Privacy Policy - EraOGames | OG Era Games & Era of Games",
  description: "Read the Privacy Policy for EraOGames. Understand how we handle data, cookies, and respect user privacy on our free online games portal.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-[#2d2d2d] dark:text-[#fdfbf7] font-hand">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mb-8">
        <Link href="/" className="flex items-center gap-1 hover:text-[#ff4d4d] transition-colors">
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">Privacy Policy</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10" style={{ transform: "rotate(-0.5deg)" }}>
        <div className="w-12 h-12 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center mx-auto mb-3 text-[#ff4d4d] dark:text-[#ff6b6b]"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
        >
          <ShieldIcon className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-doodle font-bold relative inline-block">
          Privacy Policy
          <span className="absolute -bottom-2 left-0 right-0 h-[5px] bg-[#ff4d4d]/30 rounded-full" />
        </h1>
        <p className="text-xs md:text-sm text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mt-4">
          Last updated: June 12, 2026
        </p>
      </div>

      {/* Policy Content */}
      <div
        className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-6 md:p-8 space-y-6"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          transform: "rotate(0.3deg)",
        }}
      >
        <p className="text-sm md:text-base leading-relaxed text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70">
          Welcome to EraOGames! Your privacy is incredibly important to us. Because we are a lightweight, instant-play games portal, we do not require you to create user accounts, type in personal passwords, or upload files. However, we do collect some minimal information to keep the site functioning quickly and correctly.
        </p>

        <div className="doodle-separator" />

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            ✏️ 1. Information We Collect
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            We collect non-identifying operational log details when you browse our site:
          </p>
          <ul className="list-disc pl-5 text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 space-y-2">
            <li>Browser type and version.</li>
            <li>Approximate location / geographic area (country level).</li>
            <li>Aggregated page statistics (which games are played, click counts, search terms).</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            🕹️ 2. Third-Party Game Providers
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            EraOGames embeds HTML5 games from third-party distribution websites (such as GameDistribution). When you load these games, the third-party platforms may collect device information, IP addresses, or place cookies to manage game state, scoreboards, and save files.
          </p>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            We recommend checking the respective privacy policy pages of game hosts (e.g., GameDistribution) to see how they collect and utilize your gameplay data.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            📢 3. Google AdSense and DoubleClick Cookie
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            Google, as a third-party vendor, uses cookies to serve ads on EraOGames. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to EraOGames and other sites on the Internet.
          </p>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            Users may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting the{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline font-bold">
              Google Ads Settings
            </a>{" "}
            page, or by opting out of a third-party vendor's use of cookies for interest-based advertising at{" "}
            <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline font-bold">
              aboutads.info
            </a>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            🍪 4. Cookies Policy
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            We use very simple functional cookies to save local web client preferences (such as your search terms and category choices). For detailed terms, check our dedicated <Link href="/cookies" className="text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline font-bold">Cookies Policy</Link>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            ✉️ 5. Contact and Support
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            If you have questions, please reach out to us at <a href="mailto:support@eraogames.com" className="text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline font-bold">support@eraogames.com</a> or use our <Link href="/contact" className="text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline font-bold">Contact Us</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
}
