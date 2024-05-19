export enum Suit {
  SPADES = "spades",
  HEARTS = "hearts",
  CLUBS = "clubs",
  DIAMONDS = "diams",
}

export interface Card {
  suit: Suit;
  icon: string;
  bgcolor: string;
  cardnum: string;
  cardvalue: number;
}
export type Hand = Card[];
export type Deck = Card[];

export interface Player {
  hand: Hand;
  balance: number;
}

export interface DOMElements {
  dealerHand?: HTMLElement;
  playerHand?: HTMLElement;
  dealerValue?: HTMLElement;
  playerValue?: HTMLElement;
  message?: HTMLElement;
  betStake?: HTMLElement;
  chipStack?: HTMLElement;
  start?: HTMLElement;
  increaseBtn?: HTMLElement;
  decreaseBtn?: HTMLElement;
  hitBtn?: HTMLElement;
  standBtn?: HTMLElement;
  doubleBtn?: HTMLElement;
  splitBtn?: HTMLElement;
}
