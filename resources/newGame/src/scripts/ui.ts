import { BlackjackGame } from "./game";

export class UI {
  private game: BlackjackGame;
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
    this.game = new BlackjackGame();
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

  private cardAction(action: string) {
    // Implement card action logic here
  }

  clearTable() {}

  updateUI(): void {
    // Update UI based on game state
  }
}
