import { Deck } from "./deck.js";
import { BlackjackGame } from "./game.js";
export class UI {
  constructor() {
    this.deck = new Deck();
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
  initUI() {
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
  startGame() {
    // Other game initialization logic
    this.game.deal();
    this.updatePlayersHand();
  }

  updatePlayersHand() {
    // Clear previous content
    this.$playerHand.innerHTML = "";
    // Loop through each card in the player's hand and create HTML elements to display them
    this.game.playersHand.forEach((card) => {
      console.log(card);
      // const cardElement = document.createElement("div");
      // cardElement.textContent = card; // Assuming card is a string representation of the card
      // this.$playerHand.appendChild(cardElement);
    });
  }
  increaseBetSize() {}
  decreaseBetSize() {}
  cardAction(action) {
    // Implement card action logic here
  }
  clearTable() {}
  updateUI() {
    // Update UI based on game state
  }
}
