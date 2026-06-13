import { notFound } from "next/navigation";
import { games } from "@/data/games";
import GameDetailClient from "./GameDetailClient";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) return { title: "Game Not Found - EraOGames" };
  return {
    title: `${game.title} - Play Free Online | EraOGames`,
    description: `Play ${game.title} instantly in your browser. ${game.description} Part of the free OG Era Games & classic Era of Games.`,
    openGraph: {
      title: `${game.title} - EraOGames`,
      description: game.description,
      images: [{ url: game.thumbnail }],
    },
  };
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) notFound();

  const related = games.filter((g) => g.category === game.category && g.id !== game.id).slice(0, 5);

  // Schema for VideoGame / SoftwareApplication
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": game.title,
    "description": game.description,
    "image": game.thumbnail,
    "operatingSystem": "Any browser (Windows, macOS, Linux, iOS, Android)",
    "applicationCategory": "GameApplication",
    "genre": game.category,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating.toString(),
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": Math.max(10, Math.round(game.plays * 0.02)).toString(),
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "category": "Free",
    },
  };

  // Schema for Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eraogames.vercel.app/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Games",
        "item": "https://eraogames.vercel.app/games/",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": game.category,
        "item": `https://eraogames.vercel.app/category/${game.category.toLowerCase()}/`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": game.title,
        "item": `https://eraogames.vercel.app/game/${game.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GameDetailClient game={game} related={related} />
    </>
  );
}
