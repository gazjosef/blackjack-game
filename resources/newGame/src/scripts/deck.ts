import { Card } from "./card";
import { Suit } from "./types";

export class Deck {
  private readonly deck: Card[] = [];

  constructor() {
    this.buildDeck();
  }

  private buildDeck(): void {
    const suits: Suit[] = [Suit.SPADES, Suit.HEARTS, Suit.CLUBS, Suit.DIAMONDS];
    const numbers: string[] = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (const suit of suits) {
      const bgcolor = [Suit.SPADES, Suit.CLUBS].includes(suit)
        ? "black"
        : "red";
      for (const cardnum of numbers) {
        const cardValue = parseInt(cardnum) || (cardnum !== "A" ? 10 : 11);
        const card = new Card(suit, suit, bgcolor, cardnum, cardValue);
        this.deck.push(card);
      }
    }
  }

  private getCardValue(cardnum: string): number {
    if (cardnum === "A") return 11;
    const value = parseInt(cardnum);
    return isNaN(value) ? 10 : value;
  }

  shuffle(): void {
    // Fisher-Yates shuffle algorithm
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  draw(): Card {
    // Deal a card
    return this.deck.pop()!;
  }

  getDeck(): Card[] {
    this.shuffle(); // Shuffle the deck before returning
    return this.deck;
  }
}
