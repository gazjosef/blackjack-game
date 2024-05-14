import { Card } from "./card";
import { Deck } from "./deck";
import { UI } from "./ui";

export class BlackjackGame {
  // Instant
  deck: Deck;
  // Game
  dealersHand: Card[];
  playersHand: Card[];
  balance: number;
  bet: number;

  constructor() {
    // Instant
    this.deck = new Deck();
    // Game
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    this.bet = 50;
  }

  startGame() {
    this.deck.shuffle();
    // Other game initialization logic
  }

  cardOutput() {}

  cardAction(action: string) {
    console.log(action);
    switch (action) {
      case "hit":
        this.takeCard();
        break;

      case "double":
        this.adjustBetAndBalance(2);
        this.takeCard();
        break;

      default:
        console.log("Unknown action:", action);
    }
  }

  private adjustBetAndBalance(factor: number) {
    this.bet *= factor;
    this.balance -= this.bet;
  }

  takeCard() {}
  checkTotal() {}
  endPlay() {}
  increaseBetSize() {}
  decreaseBetSize() {}

  deal() {
    // Deal logic
  }
}
