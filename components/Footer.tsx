import Link from "next/link";
import { LogoIcon, GamepadIcon, ShieldIcon, FileTextIcon, MailIcon, ArrowRightIcon, GridIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#090d16] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="space-y-4">
              <Link 
                href="/" 
                className="flex items-center gap-2.5 group"
                aria-label="EraOGames home page logo footer link"
              >
                <LogoIcon className="w-8 h-8 text-indigo-600 dark:text-violet-500 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xl font-display font-bold tracking-wider text-slate-800 dark:text-gray-100">EraOGames</span>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Your absolute destination for the best free online games. Experience the classic OG Era Games and explore a modern Era of Games instantly in your browser — zero downloads, no hassle.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                <GamepadIcon className="w-4 h-4 text-indigo-500" />
                <span>Thousands of free games online</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-display font-bold text-slate-800 dark:text-gray-100 uppercase tracking-widest relative pb-2 border-b border-slate-100 dark:border-slate-800/60 inline-block min-w-[120px]">
                Quick Links
              </h3>
              <ul className="space-y-2.5 mt-4">
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
                        aria-label={`Browse page category ${link.label}`}
                        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-violet-400 transition-colors duration-150 group font-medium"
                      >
                        <Icon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-display font-bold text-slate-800 dark:text-gray-100 uppercase tracking-widest relative pb-2 border-b border-slate-100 dark:border-slate-800/60 inline-block min-w-[120px]">
                Support
              </h3>
              <ul className="space-y-2.5 mt-4">
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
                        aria-label={`View policy sheet ${link.label}`}
                        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-violet-400 transition-colors duration-150 group font-medium"
                      >
                        <Icon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Questions or feedback? Reach out to us anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800/70 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 dark:text-slate-500">
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
                  aria-label={`View ${item.label} documents`}
                  className="text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-violet-400 transition-colors"
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
