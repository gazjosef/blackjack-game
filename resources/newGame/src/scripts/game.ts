import { Deck } from "./deck";

export class BlackjackGame {
  deck: Deck;
  dealersHand: any[]; // Adjust the type as needed
  playersHand: any[]; // Adjust the type as needed
  balance: number;
  bet: number;

  constructor() {
    this.deck = new Deck();
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    this.bet = 50;
  }

  deal() {
    this.deck.shuffle();
    console.log("deck before", this.deck);
    // Deal logic
    this.playersHand.push(this.deck.draw());
    this.dealersHand.push(this.deck.draw());
    this.playersHand.push(this.deck.draw());
    console.log("deck after", this.deck);
  }

  checkTotal() {
    // Check Total
  }

  takeCard() {
    // Take a card logic
  }
}
