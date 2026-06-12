"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoIcon, SearchIcon, MenuIcon, CloseIcon, HomeIcon, GridIcon, CategoryIcon } from "./Icons";

const navLinks = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Games", href: "/games", icon: GridIcon },
  { label: "Categories", href: "/category/all", icon: CategoryIcon },
];

const rotations = ["-1deg", "0.5deg", "-0.5deg"];

function SunIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfbf7] dark:bg-[#18181c] border-b-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Link */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" style={{ transform: "rotate(-0.5deg)" }}>
              <LogoIcon className="w-8 h-8 text-[#ff4d4d] transition-transform duration-200 group-hover:scale-110" />
              <span className="text-lg md:text-xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] tracking-tight">
                EraOGames
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1" style={{ transform: "rotate(0.5deg)" }}>
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative flex items-center gap-2 px-4 py-2 text-sm font-hand font-bold transition-all duration-150 text-[#2d2d2d] dark:text-[#fdfbf7] hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b]"
                    style={{ transform: `rotate(${rotations[i]})` }}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#ff4d4d] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Icons block */}
            <div className="flex items-center gap-1.5">
              {/* Search Toggle Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#2d2d2d] dark:text-[#fdfbf7] hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b] transition-colors duration-150"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="flex p-2 text-[#2d2d2d] dark:text-[#fdfbf7] hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b] transition-colors duration-150"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5 text-[#ffeb3b]" />}
              </button>

              {/* Hamburger Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-[#2d2d2d] dark:text-[#fdfbf7] hover:text-[#ff4d4d] dark:hover:text-[#ff6b6b] transition-colors duration-150"
                aria-label="Menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search Box Form */}
          {searchOpen && (
            <div className="pb-4 md:pb-5">
              <form onSubmit={handleSearchSubmit} className="relative" style={{ transform: "rotate(-0.5deg)" }}>
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d2d2d]/40 dark:text-[#fdfbf7]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games & press Enter..."
                  className="sketch-input pl-12"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu Sidebar & Backdrop */}
      {/* Backdrop Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#2d2d2d]/30 dark:bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Side Menu Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-64 max-w-[80vw] bg-[#fdfbf7] dark:bg-[#18181c] border-l-[3px] border-[#2d2d2d] dark:border-[#fdfbf7] z-50 p-6 flex flex-col justify-between shadow-sketch md:hidden transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          borderRadius: "15px 0px 0px 15px / 255px 0px 0px 225px",
        }}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#e5e0d8] dark:border-[#44444a] pb-4 mb-6">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <LogoIcon className="w-7 h-7 text-[#ff4d4d]" />
              <span className="text-lg font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7]">
                EraOGames
              </span>
            </Link>
            <button
              onClick={closeMenu}
              className="w-8 h-8 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center text-[#2d2d2d] dark:text-[#fdfbf7] active:translate-y-[2px]"
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              aria-label="Close menu"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-3">
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-hand font-bold border-2 transition-all duration-150 ${
                    isActive
                      ? "bg-[#ff4d4d] text-white border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm"
                      : "bg-white dark:bg-[#242429] text-[#2d2d2d] dark:text-[#fdfbf7] border-transparent hover:bg-[#2d2d2d]/5 dark:hover:bg-white/5"
                  }`}
                  style={{
                    borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                    transform: `rotate(${i % 2 === 0 ? "-1.5deg" : "1deg"})`,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Bottom: Theme Switcher Toggle */}
        <div className="border-t-2 border-dashed border-[#e5e0d8] dark:border-[#44444a] pt-4">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch text-sm font-hand font-bold uppercase active:translate-y-[2px] text-[#2d2d2d] dark:text-[#fdfbf7]"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          >
            {theme === "light" ? (
              <>
                <MoonIcon className="w-4.5 h-4.5" />
                Switch to Dark Mode
              </>
            ) : (
              <>
                <SunIcon className="w-4.5 h-4.5 text-[#ffeb3b]" />
                Switch to Light Mode
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
