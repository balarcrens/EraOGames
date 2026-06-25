"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gamepad2, Search, Menu, X, Home, Compass, Moon, Sun, Star, Globe, BookOpen, ChevronDown, Shield } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/category/all", icon: Compass },
  { label: "New Games", href: "/games?sortBy=new", icon: Gamepad2 },
  { label: "Trending", href: "/games?sortBy=popular", icon: Compass },
  { label: "Favorites", href: "/games?favorites=true", icon: Star },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

const trustLinks = [
  { label: "About", href: "/about", icon: Compass },
  { label: "Contact", href: "/contact", icon: Globe },
  { label: "Privacy Policy", href: "/privacy", icon: Shield },
  { label: "Terms of Service", href: "/terms", icon: Shield },
  { label: "Cookies Policy", href: "/cookies", icon: Shield },
  { label: "DMCA", href: "/dmca", icon: Shield },
  { label: "Disclaimer", href: "/disclaimer", icon: Shield },
  { label: "Editorial Policy", href: "/editorial-policy", icon: Shield },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#05070c]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/40 shadow-lg transition-colors duration-300 animate-fade-in-down">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Link */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group shrink-0"
              aria-label="EraOGames Home page logo"
            >
              <span className="text-xl md:text-2xl font-display font-extrabold tracking-widest text-slate-900 dark:text-white uppercase transition-all duration-300 group-hover:tracking-[0.15em]">
                Era<span className="group-hover:text-violet-500 dark:group-hover:text-violet-400">OG</span>ames
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-label={`Browse ${link.label} section`}
                    className={`animate-fade-in-down relative px-1 py-1 text-sm font-semibold tracking-wide transition-all duration-200 ${isActive
                      ? "text-indigo-600 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                    style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-[-4px] left-0 right-0 h-[2.5px] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
              {/* More dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-1 py-1 text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 cursor-pointer">
                  <span>More</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-[#0e1320] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 origin-top-right scale-95 group-hover:scale-100">
                  {trustLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-all duration-150 ${
                          isActive ? "text-indigo-600 dark:text-white bg-indigo-100 dark:bg-indigo-600/20" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40"
                        }`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right-Side block (Search + Language + Theme + Hamburger) */}
            <div className="flex items-center gap-4">
              {/* Permanent Pill Search Bar for Desktop */}
              <form onSubmit={handleSearchSubmit} className="animate-fade-in-down animate-delay-200 hidden md:flex items-center relative w-48 lg:w-60 xl:w-72" aria-label="Search game form">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-full font-sans text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
                  aria-label="Search input text"
                />
              </form>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="animate-fade-in-down animate-delay-300 hidden md:flex p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                aria-label="Toggle theme display colors"
              >
                {theme === "light" ? <Moon className="w-5 h-5 animate-hover-spin" /> : <Sun className="w-5 h-5 text-amber-500 animate-hover-spin" />}
              </button>

              {/* Search Toggle Button for Mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 hover:scale-110 ${searchOpen ? 'bg-slate-100 dark:bg-slate-900/60' : ''}`}
                aria-label="Search game query"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Hamburger Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Toggle menu navigation drawer"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Box Form for Mobile (Toggled) */}
          {searchOpen && (
            <div className="animate-fade-in-down pb-4 md:hidden">
              <form onSubmit={handleSearchSubmit} className="relative" aria-label="Search game form">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  className="w-full pl-12 pr-4 py-2 bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-full font-sans text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all duration-200"
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
        className={`fixed inset-0 z-40 bg-black/40 dark:bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
        aria-label="Close sidebar menu backdrop overlay"
        role="button"
      />

      {/* Side Menu Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-64 max-w-[80vw] bg-white dark:bg-[#05070c] border-l border-slate-200 dark:border-slate-800 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <span className="text-base font-display font-extrabold text-slate-900 dark:text-white">EraOGames</span>
            <div className="flex items-center gap-1.5">
              {/* Compact theme toggler icon button for mobile sidebar */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label="Toggle theme display colors"
              >
                {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-amber-500" />}
              </button>

              <button
                onClick={closeMenu}
                className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label="Close sidebar menu panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-label={`Browse ${link.label} in drawer`}
                  className={`animate-slide-up flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2">
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-2">More</p>
              {trustLinks.map((link, idx2) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`animate-slide-up flex items-center gap-3 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                      isActive ? "bg-indigo-100 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white"
                    }`}
                    style={{ animationDelay: `${0.4 + idx2 * 0.05}s` }}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Bottom branding footnote */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
            Era of Games Portal
          </p>
        </div>
      </div>
    </>
  );
}
