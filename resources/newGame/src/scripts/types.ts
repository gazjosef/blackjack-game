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
export interface Hand extends Array<Card> {}

export interface Deck extends Array<Card> {}

export interface Player {
  hand: Hand;
  balance: number;
}

export interface DOMElements {
  dealerHand: HTMLElement | null;
  playerHand: HTMLElement | null;
  dealerValue: HTMLElement | null;
  playerValue: HTMLElement | null;
  message: HTMLElement | null;
  betStake: HTMLElement | null;
  chipStack: HTMLElement | null;
  start: HTMLElement | null;
  increaseBtn: HTMLElement | null;
  decreaseBtn: HTMLElement | null;
  hitBtn: HTMLElement | null;
  standBtn: HTMLElement | null;
  doubleBtn: HTMLElement | null;
  splitBtn: HTMLElement | null;
}

export const text = "Hello String";
