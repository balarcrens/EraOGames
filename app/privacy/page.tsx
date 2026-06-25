import Link from "next/link";
import { Shield, Home, FileText, Gamepad2, Megaphone, Cookie, Mail, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - EraOGames | OG Era Games & Era of Games",
  description: "Read the Privacy Policy for EraOGames. Understand how we handle data, cookies, and respect user privacy on our free online games portal.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 text-slate-600 dark:text-slate-400 font-sans">
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
        <span className="text-slate-500 dark:text-slate-400 font-bold">Privacy Policy</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -top-8 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl mx-auto pointer-events-none" />
        <div className="w-14 h-14 bg-indigo-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-500 rounded-2xl"
        >
          <Shield className="w-7 h-7 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          Privacy Policy
          <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-5 font-bold uppercase tracking-widest">
          Last updated: June 12, 2026
        </p>
      </div>

      {/* Policy Content - Structured in Premium Modular Panels */}
      <div className="space-y-6">
        {/* Intro */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium leading-relaxed text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
          Welcome to EraOGames! Your privacy is incredibly important to us. Because we are a lightweight, instant-play games portal, we do not require you to create user accounts, type in personal passwords, or upload files. However, we do collect some minimal information to keep the site functioning quickly and correctly.
        </div>

        {/* Section 1 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>1. Information We Collect</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            We collect non-identifying operational log details when you browse our site:
          </p>
          <ul className="list-none pl-1 space-y-3">
            {[
              { title: "Browser & Tech details", desc: "Browser type, version, and screen parameters to render frames correctly." },
              { title: "Approximate Geography", desc: "Approximate location / geographic area (country level) for local CDN load speeds." },
              { title: "Aggregated Metrics", desc: "Which games are played, click counts, search terms, and load times." }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">{item.title}:</strong> {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Gamepad2 className="w-5 h-5 text-violet-500 shrink-0" />
            <span>2. Third-Party Game Providers</span>
          </h2>
          <p className="text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            EraOGames embeds HTML5 games from third-party distribution websites (such as GameDistribution). When you load these games, the third-party platforms may collect device information, IP addresses, or place cookies to manage game state, scoreboards, and save files.
          </p>
          <p className="text-sm leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-4 border-l-4 border-violet-500 rounded-r-xl font-medium text-slate-500 dark:text-slate-400">
            We recommend checking the respective privacy policy pages of game hosts (e.g., GameDistribution) to see how they collect and utilize your gameplay data.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Megaphone className="w-5 h-5 text-amber-500 shrink-0" />
            <span>3. Google AdSense & DoubleClick Cookie</span>
          </h2>
          <p className="text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            Google, as a third-party vendor, uses cookies to serve ads on EraOGames. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to EraOGames and other sites on the Internet.
          </p>
          <p className="text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            Users may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting the{" "}
            <a 
              href="https://adssettings.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              aria-label="Visit Google Ads settings to customize details"
            >
              Google Ads Settings
            </a>{" "}
            page, or by opting out of a third-party vendor's use of cookies for interest-based advertising at{" "}
            <a 
              href="https://aboutads.info" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              aria-label="Visit AboutAds info to opt out of advertising cookies"
            >
              aboutads.info
            </a>.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Cookie className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>4. Cookies Policy link</span>
          </h2>
          <p className="text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            We use very simple functional cookies to save local web client preferences (such as your search terms and category choices). For detailed terms, check our dedicated <Link href="/cookies" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline" aria-label="Navigate to read the cookies policy page">Cookies Policy</Link>.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Mail className="w-5 h-5 text-pink-500 shrink-0" />
            <span>5. Contact & Support Info</span>
          </h2>
          <p className="text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            If you have questions, please reach out to us at <a href="mailto:support@eraogames.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline" aria-label="Mail directly to support inbox">support@eraogames.com</a> or use our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline" aria-label="Navigate to write support team a note">Contact Us</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
}
