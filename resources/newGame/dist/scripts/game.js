import { Deck } from "./deck.js";
export class BlackjackGame {
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
    console.log("playersHand before", this.playersHand);
    // Deal logic
    this.playersHand.push(this.deck.draw());
    this.dealersHand.push(this.deck.draw());
    this.playersHand.push(this.deck.draw());

    console.log("playersHand", this.playersHand);
    console.log("deck after", this.deck);
  }
  checkTotal() {
    // Check Total
  }
  takeCard() {
    // Take a card logic
    this.playersHand.push(this.deck.draw());
  }
}
