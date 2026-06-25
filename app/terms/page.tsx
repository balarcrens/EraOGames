import Link from "next/link";
import { FileText, Home, Gamepad2, AlertTriangle, Mail } from "lucide-react";

export const metadata = {
  title: "Terms of Service - EraOGames | OG Era Games & Era of Games",
  description: "Read the Terms of Service for EraOGames. Learn about our guidelines, rules, and licensing for playing HTML5 games.",
};

export default function TermsPage() {
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
        <span className="text-slate-500 dark:text-slate-400 font-bold">Terms of Service</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -top-8 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl mx-auto pointer-events-none" />
        <div className="w-14 h-14 bg-indigo-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-500 rounded-2xl"
        >
          <FileText className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          Terms of Service
          <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-5 font-bold uppercase tracking-widest">
          Last updated: June 12, 2026
        </p>
      </div>

      {/* Terms Content - Modular Cards */}
      <div className="space-y-6">
        {/* Intro */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium leading-relaxed text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
          By accessing and playing games on EraOGames, you agree to comply with and be bound by the following Terms of Service. If you do not agree, please do not use this portal.
        </div>

        {/* Section 1 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>1. Use of the Site</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames is a free online game portal. You are granted permission to access games for personal, non-commercial entertainment. You may not:
          </p>
          <ul className="list-none pl-1 space-y-3">
            {[
              { title: "Block & Extract", desc: "Attempt to reverse-engineer, modify, or block components of the site or game embeds." },
              { title: "Automated scripts", desc: "Use bots, scrapers, or automated tools to access the portal." },
              { title: "Provider compliance", desc: "Violate the terms of any third-party embedded game providers." }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                <span className="text-red-500 font-bold mt-0.5">✗</span>
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
            <span>2. Embedded Content & Iframe Policy</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            Games displayed on EraOGames are hosted on external servers via HTML5 iframe embeds. We do not own, develop, or license these files directly unless specifically noted. We are not responsible for any performance lag, advertisements, or cookies served by external hosts.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>3. Disclaimer of Warranties</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames is provided &quot;as is&quot; and &quot;as available.&quot; We make no guarantees that games will work on every browser or device configuration, load under a specific amount of time, or remain online indefinitely.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>4. Revisions & Support</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            We reserve the right to modify these terms or adjust the game collection at any time. Your continued use of the website represents acceptance of the updated terms. If you have questions, please use our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline" aria-label="Navigate to contact us form page">Contact Us</Link> form.
          </p>
        </div>
      </div>
    </div>
  );
}
