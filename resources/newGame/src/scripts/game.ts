import { Card } from "./card";
import { Deck } from "./deck";

export class BlackjackGame {
  deck: Deck;
  dealersHand: Card[];
  playersHand: Card[];
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

  private $increaseBtn!: HTMLElement | null;
  private $decreaseBtn!: HTMLElement | null;
  private $hitBtn!: HTMLElement | null;
  private $standBtn!: HTMLElement | null;
  private $doubleBtn!: HTMLElement | null;

  constructor() {
    this.deck = new Deck();
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    this.bet = 50;

    // DOM Elements
    this.$dealerHand = document.getElementById("dealer-hand");
    this.$playerHand = document.getElementById("player-hand");
    this.$dealerValue = document.getElementById("dealer-value");
    this.$playerValue = document.getElementById("player-value");
    this.$message = document.getElementById("message");
    this.$betStake = document.getElementById("bet-stake");
    this.$chipStack = document.getElementById("chip-stack");
    this.$start = document.getElementById("button-deal");

    this.initUI();
  }

  private initUI(): void {
    this.addButtonEventListener(this.$start, () => this.startGame());
    this.addButtonEventListener(this.$increaseBtn, () =>
      this.increaseBetSize()
    );
    this.addButtonEventListener(this.$decreaseBtn, () =>
      this.decreaseBetSize()
    );
    this.addButtonEventListener(this.$hitBtn, () => this.cardAction("hit"));
    this.addButtonEventListener(this.$standBtn, () => this.cardAction("stand"));
    this.addButtonEventListener(this.$doubleBtn, () =>
      this.cardAction("double")
    );
  }

  private addButtonEventListener(
    button: HTMLElement | null,
    callback: () => void
  ): void {
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        callback();
      });
    }
  }

  startGame() {
    this.deck.shuffle();
    // Other game initialization logic
  }

  // CLEAR TABLES

  clearTable() {
    this.playersHand = [];
    this.dealersHand = [];

    this.setInnerHTML(this.$chipStack, this.balance.toString());
    this.setInnerHTML(this.$dealerValue, "?");
    this.clearInnerHtml(this.$dealerHand, this.$playerHand);
    this.toggleButtonDisplay(
      [this.$start, this.$decreaseBtn, this.$increaseBtn],
      false
    );
    this.toggleButtonDisplay([this.$hitBtn, this.$standBtn], true);
  }

  private setInnerHTML(element: HTMLElement | null, content: string) {
    if (element) {
      element.innerHTML = content;
    }
  }

  private clearInnerHtml(...elements: (HTMLElement | null)[]) {
    elements.forEach((element) => {
      if (element) {
        element.innerHTML = "";
      }
    });
  }

  private toggleButtonDisplay(
    buttons: (HTMLElement | null)[],
    isVisible: boolean
  ) {
    buttons.forEach((button) => {
      if (button) {
        button.style.display = isVisible ? "inline" : "none";
      }
    });
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
