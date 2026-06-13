"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gamepad2, Search, Menu, X, Home, Compass, Moon, Sun } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Games", href: "/games", icon: Gamepad2 },
  { label: "Categories", href: "/category/all", icon: Compass },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const pathname = usePathname();
  const router = useRouter();

  // Load theme on client-side mount
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#07090e]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-900/50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Link */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group shrink-0"
              aria-label="EraOGames Home page logo"
            >
              <Gamepad2 className="w-8 h-8 text-indigo-600 dark:text-violet-500 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-gray-100 tracking-wider">
                EraOGames
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-label={`Browse ${link.label} section`}
                    className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide rounded-lg transition-all duration-200 ${isActive
                      ? "text-indigo-600 dark:text-violet-400 bg-indigo-50/50 dark:bg-violet-950/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Icons block */}
            <div className="flex items-center gap-2">
              {/* Search Toggle Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-200 ${searchOpen ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                aria-label="Search game query"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-200"
                aria-label="Toggle theme display colors"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-500" />}
              </button>

              {/* Hamburger Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-200"
                aria-label="Toggle menu navigation drawer"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Box Form */}
          {searchOpen && (
            <div className="pb-4 md:pb-5">
              <form onSubmit={handleSearchSubmit} className="relative" aria-label="Search game form">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games & press Enter..."
                  className="sketch-input pl-12"
                  aria-label="Search input text"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu Sidebar & Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
        aria-label="Close sidebar menu backdrop overlay"
        role="button"
      />

      {/* Side Menu Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-64 max-w-[80vw] bg-white dark:bg-[#07090e] border-l border-slate-200 dark:border-slate-800 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-end border-b border-slate-100 dark:border-slate-800/70 pb-4 mb-6">
            <div className="flex items-center gap-1.5">
              {/* Compact theme toggler icon button for mobile sidebar */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 p-2 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                aria-label="Toggle theme display colors"
              >
                {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-amber-500" />}
              </button>

              <button
                onClick={closeMenu}
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                aria-label="Close sidebar menu panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-label={`Browse ${link.label} in drawer`}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Bottom branding footnote */}
        <div className="border-t border-slate-100 dark:border-slate-800/70 pt-4 text-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-600">
            Era of Games Portal
          </p>
        </div>
      </div>
    </>
  );
}
