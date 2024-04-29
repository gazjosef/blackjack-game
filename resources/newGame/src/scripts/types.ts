// Enum for Card Suits
export enum Suit {
  SPADES = "spades",
  HEARTS = "hearts",
  CLUBS = "clubs",
  DIAMONDS = "diams",
}

// Card Interface
export interface Card {
  suit: Suit;
  icon: string;
  bgcolor: string;
  cardnum: string;
  cardvalue: number;
}
