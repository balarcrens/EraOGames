import Link from "next/link";
import { Cookie, Settings, Gamepad2, Sliders, Shield, Home } from "lucide-react";

export const metadata = {
  title: "Cookies Policy - EraOGames | OG Era Games & Era of Games",
  description: "Read the Cookies Policy for EraOGames. Understand how functional and third-party cookies are used to optimize game loading times.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 text-slate-700 dark:text-slate-400 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
        <Link 
          href="/" 
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
          aria-label="Back to EraOGames Home page"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-500 dark:text-slate-400 font-bold">Cookies Policy</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -top-8 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl mx-auto pointer-events-none" />
        <div className="w-14 h-14 bg-indigo-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-500 rounded-2xl"
        >
          <Shield className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          Cookies Policy
          <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-5 font-bold uppercase tracking-widest">
          Last updated: June 12, 2026
        </p>
      </div>

      {/* Cookies Content - Modular Cards */}
      <div className="space-y-6">
        {/* Intro */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium leading-relaxed text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
          This Cookies Policy explains what cookies are, how EraOGames uses them, and how third-party embedded games might access them when you play.
        </div>

        {/* Section 1 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Cookie className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>1. What are Cookies?</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            Cookies are small text files stored in your browser when you visit a website. They are commonly used to remember preferences, track statistics, and support game-saving systems.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Settings className="w-5 h-5 text-violet-500 shrink-0" />
            <span>2. How EraOGames Uses Cookies</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames itself does NOT use advertising cookies or tracking tools like pixels. We use browser `LocalStorage` and session parameters to remember:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-500 dark:text-slate-400 space-y-2 font-medium">
            <li>Search parameters on the game explorer screen.</li>
            <li>Category tabs and sorting preferences.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Gamepad2 className="w-5 h-5 text-amber-500 shrink-0" />
            <span>3. Third-Party Game Frame Cookies</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            Because our games run in embedded standard iframe configurations, third-party game platforms (like GameDistribution) place their own cookies and local browser storage. These are required to:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-500 dark:text-slate-400 space-y-2 font-medium">
            <li>Save your in-game progress (such as unlocked levels or characters).</li>
            <li>Render local scoreboards and top ratings.</li>
            <li>Serve appropriate lightweight HTML5 scripts.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Sliders className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>4. Managing Cookies</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            You can clear or block cookies at any time through your browser settings. Please note that blocking third-party cookies might prevent in-game progress or save files from persisting correctly between browser sessions.
          </p>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            For general questions about our cookie procedures, write us a note on our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline" aria-label="Navigate to contact us page to ask questions about cookies">Contact Us</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
}
