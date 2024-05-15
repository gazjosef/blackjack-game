import { Card } from "./card.js";
import { Suit } from "./types.js";
export class Deck {
  constructor() {
    this.deck = [];
    this.buildDeck();
  }
  buildDeck() {
    const suits = [Suit.SPADES, Suit.HEARTS, Suit.CLUBS, Suit.DIAMONDS];
    const numbers = [
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
  shuffle() {
    // Fisher-Yates shuffle algorithm
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
  draw() {
    // Deal a card
    return this.deck.pop();
  }
  getDeck() {
    this.shuffle(); // Shuffle the deck before returning
    return this.deck;
  }
}
