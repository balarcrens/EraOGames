import Link from "next/link";
import { FileText, Home, Shield, Star, Heart, BookOpen } from "lucide-react";

export const metadata = {
  title: "Editorial Policy - EraOGames | OG Era Games & Era of Games",
  description: "EraOGames editorial policy. Learn about our content standards, game review process, curation guidelines, and commitment to quality.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 text-slate-600 dark:text-slate-400 font-sans">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-500 dark:text-slate-400 font-bold">Editorial Policy</span>
      </div>

      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -top-8 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl mx-auto pointer-events-none" />
        <div className="w-14 h-14 bg-indigo-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-500 rounded-2xl">
          <BookOpen className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          Editorial Policy
          <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-5 font-bold uppercase tracking-widest">
          Last updated: June 12, 2026
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium leading-relaxed text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
          At EraOGames, we are committed to providing our readers with accurate, informative, and engaging content. This editorial policy outlines the standards and practices we follow to ensure the quality and integrity of everything we publish.
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Star className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>1. Our Content Standards</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            All content published on EraOGames undergoes a thorough review process to ensure it meets our quality standards:
          </p>
          <ul className="list-none pl-1 space-y-3">
            {[
              { title: "Accuracy", desc: "We verify factual claims and ensure game descriptions accurately reflect the actual gameplay experience." },
              { title: "Originality", desc: "Our content is written by our editorial team. We do not plagiarize or use auto-generated content without substantial human editing." },
              { title: "Relevance", desc: "All content is directly relevant to our audience of browser gaming enthusiasts." },
              { title: "Clarity", desc: "We write in clear, accessible language that is easy for readers of all ages to understand." }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                <span className="text-indigo-500 font-bold mt-0.5">•</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">{item.title}:</strong> {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Heart className="w-5 h-5 text-red-500 shrink-0" />
            <span>2. Game Curation Process</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            Games featured on EraOGames are carefully selected based on the following criteria:
          </p>
          <ul className="list-none pl-1 space-y-3">
            {[
              { title: "Playability", desc: "Games must load quickly, run smoothly, and provide responsive controls across devices." },
              { title: "Quality", desc: "We prioritize games with polished graphics, solid gameplay mechanics, and good production value." },
              { title: "Safety", desc: "All games are vetted for appropriate content. We do not host games with violent, explicit, or otherwise harmful material." },
              { title: "Variety", desc: "We maintain a diverse collection spanning multiple genres to serve different player preferences." }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">{item.title}:</strong> {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>3. Corrections and Updates</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            We are committed to correcting errors promptly. If you identify an inaccuracy in our content, please contact us at support@eraogames.com. We will review the issue and update the content as necessary. All significant corrections will be noted at the bottom of the relevant page.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <FileText className="w-5 h-5 text-violet-500 shrink-0" />
            <span>4. Advertising and Sponsorship</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames uses Google AdSense to display advertisements. These ads are clearly distinguishable from editorial content. We do not accept paid placements disguised as editorial content. Sponsored content, if any, will be clearly labeled as such. Our editorial team maintains full independence from advertising partners in all content decisions.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <BookOpen className="w-5 h-5 text-cyan-500 shrink-0" />
            <span>5. User Contributions</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            We welcome feedback and suggestions from our community. User ratings and favorites are genuine reflections of player preferences and are not manipulated. Game recommendations are based on objective criteria and community engagement metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
