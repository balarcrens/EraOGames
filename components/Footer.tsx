"use client";

import Link from "next/link";
import { Gamepad2, Share2, Mail, Globe } from "lucide-react";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter submit stub
    alert("Thanks for subscribing to EraOGames newsletter!");
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-[#05070c] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Column 1: Logo & description (Takes 5 cols on lg) */}
            <div className="animate-fade-in-up lg:col-span-5 space-y-5 text-left">
              <Link
                href="/"
                className="flex items-center gap-2 group w-fit"
                aria-label="EraOGames Footer Logo"
              >
                <span className="text-xl font-display font-extrabold tracking-wider text-slate-900 dark:text-white">
                  Era<span className="text-gradient-purple">OG</span>ames
                </span>
              </Link>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                The ultimate destination for premium browser-based gaming. Experience innovation, speed, and fun without boundaries.
              </p>

              {/* Social sharing links */}
              <div className="flex items-center gap-3.5 pt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                  aria-label="Twitter social profile"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                  aria-label="Github profile"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <button
                  className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                  aria-label="Share site link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 2: Navigation Links (Takes 2 cols on lg) */}
            <div className="animate-fade-in-up animate-delay-100 lg:col-span-2 text-left">
              <h3 className="text-sm font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Categories", href: "/category/all" },
                  { label: "New Games", href: "/games?sortBy=new" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150 font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

              {/* Column 3: Company Support (Takes 2 cols on lg) */}
            <div className="animate-fade-in-up animate-delay-200 lg:col-span-2 text-left">
              <h3 className="text-sm font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Blog", href: "/blog" },
                  { label: "Editorial Policy", href: "/editorial-policy" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150 font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter Subscriber Form (Takes 3 cols on lg) */}
            <div className="animate-fade-in-up animate-delay-300 lg:col-span-3 text-left">
              <h3 className="text-sm font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Newsletter
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Get notified about new game releases!
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2 items-stretch">
                <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-lg text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all duration-200"
                    />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] uppercase tracking-wider whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & TOS/Privacy */}
        <div className="animate-fade-in animate-delay-400 border-t border-slate-200 dark:border-slate-900/80 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} EraOGames. All rights reserved.
            </p>
            <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-2">
              <Link href="/privacy" className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Cookies Policy</Link>
              <Link href="/dmca" className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">DMCA</Link>
              <Link href="/disclaimer" className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/editorial-policy" className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Editorial Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
