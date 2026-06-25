import Link from "next/link";
import { AlertTriangle, Home, FileText, Shield, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Disclaimer - EraOGames | OG Era Games & Era of Games",
  description: "EraOGames disclaimer. Important information about third-party content, game providers, affiliate links, and limitation of liability.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 text-slate-600 dark:text-slate-400 font-sans">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-500 dark:text-slate-400 font-bold">Disclaimer</span>
      </div>

      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -top-8 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl mx-auto pointer-events-none" />
        <div className="w-14 h-14 bg-indigo-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center mx-auto mb-4 text-amber-500 rounded-2xl">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          Disclaimer
          <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-5 font-bold uppercase tracking-widest">
          Last updated: June 12, 2026
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium leading-relaxed text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
          The information provided on EraOGames is for general informational and entertainment purposes only. All games are provided as embedded third-party content and we make no representations regarding their accuracy, availability, or suitability.
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <ExternalLink className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>1. Third-Party Content</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames embeds HTML5 games from third-party distribution platforms such as GameDistribution, CrazyGames, and other providers. We do not develop, host, or control the content of these games. The game providers are solely responsible for their content, functionality, and any data collection practices.
          </p>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            We make no warranty that game content is accurate, complete, or current. If you encounter any issues with a specific game, please contact the game provider directly.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Shield className="w-5 h-5 text-violet-500 shrink-0" />
            <span>2. Limitation of Liability</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames, its operators, contributors, and affiliates shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, our website or any embedded game content. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
          </p>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            We provide our service on an "as is" and "as available" basis without any warranties of any kind, either express or implied.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <FileText className="w-5 h-5 text-amber-500 shrink-0" />
            <span>3. External Links</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any external link does not imply endorsement by EraOGames.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <span>4. No Professional Advice</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            Any information provided on EraOGames, including blog articles, guides, and tips, is for general informational purposes only and does not constitute professional advice. We recommend consulting appropriate professionals for specific advice tailored to your situation.
          </p>
        </div>
      </div>
    </div>
  );
}
