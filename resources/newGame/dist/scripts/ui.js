import { BlackjackGame } from "./game.js";
import { Card } from "./card.js";
export class UI {
  constructor(game) {
    // Instance
    this.game = game || new BlackjackGame();
    // Dealer / Player
    this.$dealerHand = document.getElementById("dealer-hand");
    this.$playerHand = document.getElementById("player-hand");
    this.$dealerValue = document.getElementById("dealer-value");
    this.$playerValue = document.getElementById("player-value");
    // Game
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
    this.initUI();
  }
  initUI() {
    if (!this.game) {
      return;
    } else {
      this.updateUI();
    }
    if (this.$start) {
      this.$start.addEventListener("click", () => {
        if (!this.game.hasStarted) {
          this.game.startGame();
          this.clearTable();
          this.updateUI();
        }
        if (this.game.hasDouble) {
          console.log("Has double???");
          this.toggleButtonDisplay([this.$doubleBtn], true);
        }
      });
    }
    if (this.$increaseBtn) {
      this.$increaseBtn.addEventListener("click", () => {
        this.game.increaseBetSize();
        this.updateBalance();
      });
    }
    if (this.$decreaseBtn) {
      this.$decreaseBtn.addEventListener("click", () => {
        this.game.decreaseBetSize();
        this.updateBalance();
      });
    }
    if (this.$hitBtn) {
      this.$hitBtn.addEventListener("click", () => {
        this.game.cardAction("hit");
        this.toggleButtonDisplay([this.$doubleBtn], false);
        this.updateUI();
      });
    }
    if (this.$standBtn) {
      this.$standBtn.addEventListener("click", () => {
        this.game.cardAction("stand");
        this.checkResult();
      });
    }
    if (this.$doubleBtn) {
      this.$doubleBtn.addEventListener("click", () => {
        this.game.cardAction("double");
        if (this.$playerValue) {
          this.$playerValue.innerHTML = this.game.playersValue.toString();
        }
        this.checkResult();
      });
    }
  }
  updateBalance() {
    if (this.$betStake) {
      this.$betStake.innerHTML = this.game.bet.toString();
    }
    if (this.$chipStack) {
      this.$chipStack.innerHTML = this.game.balance.toString();
    }
  }
  updateUI() {
    if (this.$playerHand) {
      this.$playerHand.innerHTML = this.game.playersHand
        .map((card, index) => Card.cardOutput(card, index))
        .join("");
    }
    if (this.$playerValue) {
      // this.$playerValue.innerHTML = this.game.playersValue.toString();
      this.$playerValue.innerHTML = this.game.playersValue.toString();
    }
    if (this.$dealerHand) {
      this.$dealerHand.innerHTML = this.game.dealersHand
        .map((card, index) => Card.cardOutput(card, index))
        .join("");
    }
    if (this.$dealerValue) {
      this.$dealerValue.innerHTML = this.game.dealersValue.toString();
    }
  }
  clearTable() {
    this.clearInnerHtml(
      this.$dealerHand,
      this.$dealerValue,
      this.$playerHand,
      this.$playerValue
    );
    this.toggleButtonDisplay(
      [this.$start, this.$decreaseBtn, this.$increaseBtn],
      false
    );
    this.toggleButtonDisplay([this.$hitBtn, this.$standBtn], true);
  }
  checkResult() {
    if (this.game.hasFinished) {
      if (this.$message) {
        this.$message.innerHTML = this.game.message;
      }
    }
    this.toggleButtonDisplay(
      [this.$hitBtn, this.$standBtn, this.$doubleBtn],
      false
    );
    this.toggleButtonDisplay(
      [this.$start, this.$decreaseBtn, this.$increaseBtn],
      true
    );
  }
  clearInnerHtml(...elements) {
    elements.forEach((element) => {
      if (element) {
        element.innerHTML = "";
      }
    });
  }
  toggleButtonDisplay(buttons, isVisible) {
    buttons.forEach((button) => {
      if (button) {
        button.style.display = isVisible ? "inline" : "none";
      }
    });
  }
}
