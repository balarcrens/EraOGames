import Link from "next/link";
import { Shield, Home, ChevronRight, FileText, Mail, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "DMCA Policy - EraOGames | OG Era Games & Era of Games",
  description: "EraOGames DMCA compliance policy. Learn how to submit a copyright infringement notice for content hosted on our free online games portal.",
};

export default function DmcaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 text-slate-600 dark:text-slate-400 font-sans">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-500 dark:text-slate-400 font-bold">DMCA Policy</span>
      </div>

      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -top-8 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl mx-auto pointer-events-none" />
        <div className="w-14 h-14 bg-indigo-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-500 rounded-2xl">
          <Shield className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          DMCA Policy
          <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-5 font-bold uppercase tracking-widest">
          Last updated: June 12, 2026
        </p>
      </div>

      <div className="space-y-6">
        <div className="animate-fade-in-up bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium leading-relaxed text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
          EraOGames respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged copyright infringement.
        </div>

        <div className="animate-fade-in-up animate-delay-100 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>1. Notice of Infringement</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            If you believe that any content available through EraOGames infringes your copyright, you should notify us in writing. Your notification must include the following information:
          </p>
          <ul className="list-none pl-1 space-y-3">
            {[
              { title: "Identification", desc: "Identify the copyrighted work you claim has been infringed." },
              { title: "Location", desc: "Identify the material you claim is infringing and provide enough information for us to locate it (URL, game title, etc.)." },
              { title: "Contact", desc: "Provide your mailing address, telephone number, and email address." },
              { title: "Statement", desc: "Include a statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law." },
              { title: "Accuracy", desc: "Include a statement under penalty of perjury that the information in your notice is accurate and that you are the copyright owner or authorized to act on the owner's behalf." },
              { title: "Signature", desc: "Provide your physical or electronic signature." }
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
            <Mail className="w-5 h-5 text-violet-500 shrink-0" />
            <span>2. Submit Your DMCA Notice</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            Please send your DMCA notice to our designated Copyright Agent:
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border-l-4 border-violet-500 rounded-r-xl">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email: dmca@eraogames.com
            </p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
              Subject line: "DMCA Notice - EraOGames"
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>3. Counter-Notice</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            If you believe that material you posted was removed or access to it was disabled by mistake or misidentification, you may file a counter-notification. Your counter-notification must include:
          </p>
          <ul className="list-none pl-1 space-y-3">
            {[
              "Your physical or electronic signature.",
              "Identification of the material that was removed and the location where it appeared before removal.",
              "A statement under penalty of perjury that you have a good faith belief that the material was removed as a result of mistake or misidentification.",
              "Your name, address, telephone number, and email address.",
              "A statement that you consent to the jurisdiction of the federal court in your district and that you will accept service of process from the person who submitted the original notice."
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-premium space-y-4 hover:-translate-y-0.5 transition-transform duration-200">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
            <FileText className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>4. Repeat Infringer Policy</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            EraOGames reserves the right to terminate the accounts or access of users who are repeat infringers of intellectual property rights. We take copyright protection seriously and cooperate with copyright owners to identify and address infringement.
          </p>
        </div>
      </div>
    </div>
  );
}
