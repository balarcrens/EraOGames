import Link from "next/link";
import { LogoIcon, GamepadIcon, ShieldIcon, FileTextIcon, MailIcon, ArrowRightIcon, GridIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-[#2d2d2d] dark:border-[#fdfbf7] bg-[#fdfbf7] dark:bg-[#18181c] overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="space-y-4" style={{ transform: "rotate(-0.5deg)" }}>
              <Link href="/" className="flex items-center gap-2.5 group">
                <LogoIcon className="w-8 h-8" />
                <span className="text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7]">EraOGames</span>
              </Link>
              <p className="text-sm font-hand text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 leading-relaxed max-w-xs">
                Your absolute destination for the best free online games. Experience the classic OG Era Games and explore a modern Era of Games instantly in your browser — zero downloads, no hassle.
              </p>
              <div className="flex items-center gap-2 text-sm font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50">
                <GamepadIcon className="w-4 h-4" />
                <span>Thousands of free games online</span>
              </div>
            </div>

            <div className="space-y-4" style={{ transform: "rotate(0.5deg)" }}>
              <h3 className="text-sm font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] uppercase tracking-wider doodle-underline inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3 mt-4">
                {[
                  { label: "Browse All Games", href: "/games", icon: GamepadIcon },
                  { label: "Game Categories", href: "/category/all", icon: GridIcon },
                  { label: "Action Games", href: "/category/action", icon: ArrowRightIcon },
                  { label: "Puzzle Games", href: "/category/puzzle", icon: ArrowRightIcon },
                  { label: "Racing Games", href: "/category/racing", icon: ArrowRightIcon },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm font-hand text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b] transition-colors duration-150 group"
                      >
                        <Icon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-4" style={{ transform: "rotate(-0.3deg)" }}>
              <h3 className="text-sm font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] uppercase tracking-wider doodle-underline inline-block">
                Support
              </h3>
              <ul className="space-y-3 mt-4">
                {[
                  { label: "Privacy Policy", href: "/privacy", icon: ShieldIcon },
                  { label: "Terms of Service", href: "/terms", icon: FileTextIcon },
                  { label: "Contact Us", href: "/contact", icon: MailIcon },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm font-hand text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b] transition-colors duration-150 group"
                      >
                        <Icon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-4">
                <p className="text-xs font-hand text-[#2d2d2d]/40 dark:text-[#fdfbf7]/40 leading-relaxed">
                  Questions or feedback? Reach out to us anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-[#e5e0d8] dark:border-[#44444a] py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50">
              &copy; {new Date().getFullYear()} EraOGames. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Cookies", href: "/cookies" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-hand text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
