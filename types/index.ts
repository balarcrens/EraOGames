export interface Game {
  id: string;
  title: string;
  slug: string;
  category: GameCategory;
  thumbnail: string;
  embedUrl: string;
  description: string;
  instructions: string;
  rating: number;
  plays: number;
}

export type GameCategory =
  | "Action"
  | "Racing"
  | "Puzzle"
  | "Adventure"
  | "Multiplayer"
  | "Sports"
  | "Arcade";

export interface NavLink {
  label: string;
  href: string;
}

export interface Category {
  name: GameCategory;
}
