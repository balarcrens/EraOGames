import Link from "next/link";
import { FileTextIcon, HomeIcon } from "@/components/Icons";

export const metadata = {
  title: "Terms of Service - EraOGames | OG Era Games & Era of Games",
  description: "Read the Terms of Service for EraOGames. Learn about our guidelines, rules, and licensing for playing HTML5 games.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-[#2d2d2d] dark:text-[#fdfbf7] font-hand">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mb-8">
        <Link href="/" className="flex items-center gap-1 hover:text-[#ff4d4d] transition-colors">
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">Terms of Service</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10" style={{ transform: "rotate(0.5deg)" }}>
        <div className="w-12 h-12 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center mx-auto mb-3 text-[#ff4d4d] dark:text-[#ff6b6b]"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
        >
          <FileTextIcon className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-doodle font-bold relative inline-block">
          Terms of Service
          <span className="absolute -bottom-2 left-0 right-0 h-[5px] bg-[#ff4d4d]/30 rounded-full" />
        </h1>
        <p className="text-xs md:text-sm text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mt-4">
          Last updated: June 12, 2026
        </p>
      </div>

      {/* Terms Content */}
      <div
        className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-6 md:p-8 space-y-6"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          transform: "rotate(-0.3deg)",
        }}
      >
        <p className="text-sm md:text-base leading-relaxed text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70">
          By accessing and playing games on EraOGames, you agree to comply with and be bound by the following Terms of Service. If you do not agree, please do not use this portal.
        </p>

        <div className="doodle-separator" />

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            ✏️ 1. Use of the Site
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            EraOGames is a free online game portal. You are granted permission to access games for personal, non-commercial entertainment. You may not:
          </p>
          <ul className="list-disc pl-5 text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 space-y-2">
            <li>Attempt to reverse-engineer, modify, or block components of the site or games.</li>
            <li>Use bots, scrapers, or automated tools to access the portal.</li>
            <li>Violate the terms of any third-party embedded game providers.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            🕹️ 2. Embedded Content & Iframe Policy
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            Games displayed on EraOGames are hosted on external servers via HTML5 iframe embeds. We do not own, develop, or license these files directly unless specifically noted. We are not responsible for any performance lag, advertisements, or cookies served by external hosts.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            ⚠️ 3. Disclaimer of Warranties
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            EraOGames is provided &quot;as is&quot; and &quot;as available.&quot; We make no guarantees that games will work on every browser or device configuration, load under a specific amount of time, or remain online indefinitely.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] flex items-center gap-2">
            ✉️ 4. Revisions
          </h2>
          <p className="text-xs md:text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
            We reserve the right to modify these terms or adjust the game collection at any time. Your continued use of the website represents acceptance of the updated terms. If you have questions, please use our <Link href="/contact" className="text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline font-bold">Contact Us</Link> form.
          </p>
        </div>
      </div>
    </div>
  );
}
