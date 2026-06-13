import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EraOGames - Play Free Online Games | OG Era Games & Era of Games",
  description:
    "Play thousands of free browser games instantly at EraOGames - the ultimate Era of Games. Enjoy classic OG era games, HTML5 puzzle, racing, action & arcade games. No downloads, no installs, pure instant fun!",
  keywords: "EraOGames, OG Era Games, Era of Games, free online games, HTML5 games, play free games, browser games, instant play games, retro games, classic games portal, play games online, free browser games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EraOGames",
    "alternateName": ["OG Era Games", "Era of Games"],
    "url": "https://www.eraogames.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.eraogames.com/games?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080b11] text-[#0f172a] dark:text-[#f3f4f6] transition-colors duration-300" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
