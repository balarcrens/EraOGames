const fs = require('fs');
const path = require('path');

const FEED_URL = 'https://gamemonetize.com/feed.php?format=0&links=0&page=1';
const OUTPUT_FILE = path.join(__dirname, '../data/games.ts');

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&bull;/g, "•")
    .replace(/&ndash;/g, "-")
    .replace(/&nbsp;/g, " ")
    .replace(/[\s\n\r]+/g, " ")
    .trim();
}

function mapCategory(feedCategory, tagsString) {
  const cat = (feedCategory || "").toLowerCase().trim();
  
  if (cat === "puzzle" || cat === "bejeweled") return "Puzzle";
  if (cat === "shooting" || cat === "action") return "Action";
  if (cat === "racing") return "Racing";
  if (cat === "sports" || cat === "soccer") return "Sports";
  if (cat === "multiplayer" || cat === "2 player" || cat === ".io") return "Multiplayer";
  if (cat === "adventure" || cat === "3d" || cat === "boys") return "Adventure";
  
  // Tag-based checks if it's still uncategorized or "Arcade" but tags suggest otherwise
  const tags = (tagsString || "").toLowerCase();
  if (tags.includes("puzzle") || tags.includes("matching")) return "Puzzle";
  if (tags.includes("shoot") || tags.includes("gun") || tags.includes("action") || tags.includes("zombie")) return "Action";
  if (tags.includes("race") || tags.includes("driving") || tags.includes("car")) return "Racing";
  if (tags.includes("sport") || tags.includes("soccer") || tags.includes("football")) return "Sports";
  if (tags.includes("multiplayer") || tags.includes("2 player") || tags.includes("2-player")) return "Multiplayer";
  if (tags.includes("adventure") || tags.includes("rpg")) return "Adventure";
  
  return "Arcade";
}

async function run() {
  console.log(`Fetching games feed from ${FEED_URL}...`);
  
  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const rawGames = await res.json();
    console.log(`Fetched ${rawGames.length} games. Processing...`);

    const usedSlugs = new Set();
    const mappedGames = [];

    for (const raw of rawGames) {
      if (!raw.id || !raw.title || !raw.url) {
        continue;
      }

      const title = cleanText(raw.title);
      let slug = slugify(title);
      if (!slug) slug = 'game';
      
      let finalSlug = slug;
      let counter = 2;
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${slug}-${counter++}`;
      }
      usedSlugs.add(finalSlug);

      const hVal = hash(raw.id);
      const rating = Number((4.0 + (hVal % 11) / 10).toFixed(1)); // 4.0 - 5.0
      const plays = 10000 + (hVal % 490001); // 10,000 - 500,000

      const tags = raw.tags
        ? raw.tags.split(',').map(t => cleanText(t)).filter(Boolean)
        : [];

      const mapped = {
        id: raw.id.trim(),
        title: title,
        slug: finalSlug,
        category: mapCategory(raw.category, raw.tags),
        thumbnail: raw.thumb ? raw.thumb.trim() : "",
        embedUrl: raw.url.trim(),
        description: cleanText(raw.description),
        instructions: cleanText(raw.instructions),
        rating: rating,
        plays: plays,
        width: raw.width ? raw.width.trim() : "800",
        height: raw.height ? raw.height.trim() : "600",
        tags: tags
      };

      mappedGames.push(mapped);
    }

    console.log(`Successfully mapped ${mappedGames.length} games.`);
    
    // Sort games by plays descending by default
    mappedGames.sort((a, b) => b.plays - a.plays);

    const tsContent = `import type { Game } from "@/types";

export const categories = [
  { name: "Action" as const },
  { name: "Racing" as const },
  { name: "Puzzle" as const },
  { name: "Adventure" as const },
  { name: "Multiplayer" as const },
  { name: "Sports" as const },
  { name: "Arcade" as const },
];

export const games: Game[] = ${JSON.stringify(mappedGames, null, 2)};
`;

    console.log(`Writing data to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
    console.log('Done!');
  } catch (err) {
    console.error('Error during fetch-games:', err);
    process.exit(1);
  }
}

run();
