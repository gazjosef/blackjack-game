import { Deck } from "./deck.js";
export class BlackjackGame {
  constructor() {
    this.deck = new Deck();
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    // Initialization logic
  }
  startGame() {
    this.deck.shuffle();
    // Other game initialization logic
  }
  deal() {
    // Deal logic
  }
  takeCard() {
    // Take a card logic
  }
}
