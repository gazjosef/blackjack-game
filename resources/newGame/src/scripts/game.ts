import { Card } from "./card";
import { Deck } from "./deck";
import { UI } from "./ui";

export class BlackjackGame {
  // Instance
  deck: Deck;
  // Game
  dealersHand: Card[];
  playersHand: Card[];
  balance: number;
  bet: number;
  cardCount: number;
  hasStarted: boolean;

  constructor() {
    // Instance
    this.deck = new Deck();
    // Game
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    this.bet = 50;
    this.cardCount = 0;
    this.hasStarted = false;
  }

  startGame() {
    console.log("Start Game");
    console.log("Deck", this.deck);
    this.deck.shuffle();
    this.hasStarted = true;
    // Other game initialization logic
  }

  increaseBetSize() {
    console.log("Increase Bet");
    this.bet += 25;
    this.balance -= this.bet;
  }

  decreaseBetSize() {
    console.log("Decrease Bet");
    this.bet += 25;
    this.balance -= this.bet;
  }

  deal() {
    const numCards = 2;
    const players = [this.dealersHand, this.playersHand];

    for (let i = 0; i < numCards; i++) {
      players.forEach((hand) => {
        hand.push(this.deck.draw());
        this.checkDeck();
      });

      console.log("Dealers Hand", this.dealersHand);
      console.log("Players Hand", this.playersHand);

      // Deal logic
    }
  }

  checkDeck() {
    this.cardCount++;
    if (this.cardCount > 40) {
      console.log("New Deck");
      this.cardCount = 0;
    }
  }

  checkTotal() {}

  cardAction(action: string) {
    console.log(action);
    switch (action) {
      case "hit":
        this.playersHand.push(this.deck.draw());
        break;

      case "stand":
        this.endPlay();
        break;

      case "double":
        this.adjustBetAndBalance(2);
        this.playersHand.push(this.deck.draw());
        break;

      default:
        console.log("Unknown action:", action);
    }
  }

  private adjustBetAndBalance(factor: number) {
    this.bet *= factor;
    this.balance -= this.bet;
  }

  cardOutput() {}

  endPlay() {
    console.log("End Play");
  }
}
