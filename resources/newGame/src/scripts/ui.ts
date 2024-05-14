import { BlackjackGame } from "./game";

export class UI {
  // Instant
  private game: BlackjackGame;
  // Game
  private $dealerHand: HTMLElement | null;
  private $playerHand: HTMLElement | null;
  private $dealerValue: HTMLElement | null;
  private $playerValue: HTMLElement | null;
  private $message: HTMLElement | null;
  private $betStake: HTMLElement | null;
  private $chipStack: HTMLElement | null;
  // Buttons
  private $start: HTMLElement | null;
  private $increaseBtn: HTMLElement | null;
  private $decreaseBtn: HTMLElement | null;
  private $hitBtn: HTMLElement | null;
  private $standBtn: HTMLElement | null;
  private $doubleBtn: HTMLElement | null;
  // private $splitBtn: HTMLElement | null;

  constructor() {
    // Instant
    this.game = new BlackjackGame();
    // Game
    this.$dealerHand = document.getElementById("dealer-hand");
    this.$playerHand = document.getElementById("player-hand");
    this.$dealerValue = document.getElementById("dealer-value");
    this.$playerValue = document.getElementById("player-value");
    this.$message = document.getElementById("message");
    this.$betStake = document.getElementById("bet-stake");
    this.$chipStack = document.getElementById("chip-stack");
    this.$start = document.getElementById("button-deal");
    // Buttons
    this.$increaseBtn = document.getElementById("button-increase");
    this.$decreaseBtn = document.getElementById("button-decrease");
    this.$hitBtn = document.getElementById("button-hit");
    this.$standBtn = document.getElementById("button-stand");
    this.$doubleBtn = document.getElementById("button-double");
    // this.$splitBtn = document.getElementById("button-split");

    this.initUI();
  }

  private initUI(): void {
    this.setupButton(this.$start, this.game.startGame);
    this.setupButton(this.$increaseBtn, this.game.increaseBetSize);
    this.setupButton(this.$decreaseBtn, this.game.decreaseBetSize);
    this.setupButton(this.$hitBtn, () => this.game.cardAction("hit"));
    this.setupButton(this.$standBtn, () => this.game.cardAction("stand"));
    this.setupButton(this.$doubleBtn, () => this.game.cardAction("double"));
  }

  private setupButton(button: HTMLElement | null, action: () => void): void {
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        action();
      });
    }
  }

  clearTable() {}

  updateUI(): void {
    // Update UI based on game state
  }
}
