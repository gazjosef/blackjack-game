import { Hand, DOMElements } from "./types";
import { Deck } from "./deck";

export class BlackjackGame {
  deck: Deck;
  dealersHand: Hand;
  playersHand: Hand;
  balance: number;
  bet: number;

  private $dealerHand: HTMLElement | null;
  private $playerHand: HTMLElement | null;
  private $dealerValue: HTMLElement | null;
  private $playerValue: HTMLElement | null;
  private $message: HTMLElement | null;
  private $betStake: HTMLElement | null;
  private $chipStack: HTMLElement | null;
  private $start: HTMLElement | null;
  private $increaseBtn: HTMLElement | null;
  private $decreaseBtn: HTMLElement | null;
  private $hitBtn: HTMLElement | null;
  private $standBtn: HTMLElement | null;
  private $doubleBtn: HTMLElement | null;
  private $splitBtn: HTMLElement | null;

  constructor() {
    this.deck = new Deck();
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    this.bet = 50;

    this.$dealerHand = document.getElementById("dealer-hand");
    this.$playerHand = document.getElementById("player-hand");
    this.$dealerValue = document.getElementById("dealer-value");
    this.$playerValue = document.getElementById("player-value");
    this.$message = document.getElementById("message");
    this.$betStake = document.getElementById("bet-stake");
    this.$chipStack = document.getElementById("chip-stack");
    this.$start = document.getElementById("button-deal");
    this.$increaseBtn = document.getElementById("button-increase");
    this.$decreaseBtn = document.getElementById("button-decrease");
    this.$hitBtn = document.getElementById("button-hit");
    this.$standBtn = document.getElementById("button-stand");
    this.$doubleBtn = document.getElementById("button-double");
    this.$splitBtn = document.getElementById("button-split");

    this.initUI();
  }
  private initUI(): void {
    if (this.$start) {
      this.$start.addEventListener("click", (e) => {
        e.preventDefault();
        this.startGame();
      });
    }

    if (this.$increaseBtn) {
      this.$increaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.increaseBetSize();
      });
    }

    if (this.$decreaseBtn) {
      this.$decreaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.decreaseBetSize();
      });
    }

    if (this.$hitBtn) {
      this.$hitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.cardAction("hit");
      });
    }

    if (this.$standBtn) {
      this.$standBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.cardAction("stand");
      });
    }

    if (this.$doubleBtn) {
      this.$doubleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.cardAction("double");
      });
    }
  }

  private startGame() {
    // Other game initialization logic
  }

  private increaseBetSize() {}

  private decreaseBetSize() {}

  clearTable() {}

  updateUI(): void {
    // Update UI based on game state
  }

  deal() {
    this.deck.shuffle();
    console.log("deck before", this.deck);
    // Deal logic
    this.playersHand.push(this.deck.draw());
    this.dealersHand.push(this.deck.draw());
    this.playersHand.push(this.deck.draw());
    this.dealersHand.push(this.deck.draw());
    console.log("deck after", this.deck);
  }

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

  endplay() {
    let dealervalue = 0;

    // this.dealersHand.forEach((card) => {
    //   dealervalue += card.cardValue;
    // });
    while (dealervalue < 17) {
      this.dealersHand.push(this.deck.draw());
    }
  }

  checkTotal() {
    // Check Total
  }

  takeCard() {
    // Take a card logic
  }

  private adjustBetAndBalance(factor: number) {
    this.bet *= factor;
    this.balance -= this.bet;
  }
}
