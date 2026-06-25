import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EraOGames - Play Free Online Games | OG Era Games & Era of Games",
  description:
    "Play thousands of free browser games instantly at EraOGames - the ultimate Era of Games. Enjoy classic OG era games, HTML5 puzzle, racing, action & arcade games. No downloads, no installs, pure instant fun!",
  keywords: "EraOGames, OG Era Games, Era of Games, free online games, HTML5 games, play free games, browser games, instant play games, retro games, classic games portal, play games online, free browser games",
  metadataBase: new URL("https://eraogames.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EraOGames - Play Free Online Games | OG Era Games & Era of Games",
    description:
      "Play thousands of free browser games instantly at EraOGames - the ultimate Era of Games. Enjoy classic OG era games, HTML5 puzzle, racing, action & arcade games. No downloads, no installs, pure instant fun!",
    url: "https://eraogames.vercel.app/",
    siteName: "EraOGames",
    images: [
      {
        url: "/ogimage.jpg",
        width: 1200,
        height: 630,
        alt: "EraOGames - Play Free Online Games | OG Era Games & Era of Games",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EraOGames - Play Free Online Games | OG Era Games & Era of Games",
    description:
      "Play thousands of free browser games instantly at EraOGames - the ultimate Era of Games. Enjoy classic OG era games, HTML5 puzzle, racing, action & arcade games. No downloads, no installs, pure instant fun!",
    images: ["/ogimage.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "t9pzP0GXj476u1sX0nbYPBOzg6DBHjaIdiVMJHtBa_w",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EraOGames",
    "alternateName": ["OG Era Games", "Era of Games"],
    "url": "https://eraogames.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://eraogames.vercel.app/games?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EraOGames",
    "alternateName": ["OG Era Games", "Era of Games"],
    "url": "https://eraogames.vercel.app",
    "description": "Play thousands of free browser games instantly. No downloads, no installations. Premium browser-based gaming on any device.",
    "foundingDate": "2025",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@eraogames.com",
      "contactType": "customer support"
    },
    "sameAs": [
      "https://twitter.com/eraogames"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K5QVMGRJ');`,
          }}
        />
        {/* End Google Tag Manager */}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DD9LZKTX7H"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DD9LZKTX7H');
          `}
        </Script>
        {/* End Google tag */}
      </head>
      <body className="min-h-screen flex flex-col text-[#0f172a] dark:text-[#f3f4f6] transition-colors duration-300" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K5QVMGRJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2183588307448884"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
