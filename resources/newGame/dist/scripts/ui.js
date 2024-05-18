import { BlackjackGame } from "./game.js";
export class UI {
  constructor(game) {
    // Instance
    this.game = game || new BlackjackGame();
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
    this.initUI();
  }
  initUI() {
    if (!this.game) {
      return;
    } else {
      console.log(this.game);
      this.updateUI();
    }

    if (this.$start) {
      this.$start.addEventListener("click", () => {
        if (!this.game.hasStarted) {
          this.game.startGame();
          this.clearTable();
          this.updateUI();
          //   this.$playerHand.innerHTML = this.game.playerHand;
          //   this.$playerValue.innerHTML = this.game.playerValue;
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
      this.$hitBtn.addEventListener("click", () => this.game.cardAction("hit"));
    }
    if (this.$standBtn) {
      this.$standBtn.addEventListener("click", () =>
        this.game.cardAction("stand")
      );
    }
    if (this.$doubleBtn) {
      this.$doubleBtn.addEventListener("click", () =>
        this.game.cardAction("double")
      );
    }
  }

  updateBalance() {
    this.$betStake.innerHTML = this.game.bet.toString();
    this.$chipStack.innerHTML = this.game.balance.toString();
  }

  updateUI() {
    this.$betStake.innerHTML = this.game.bet.toString();
    this.$chipStack.innerHTML = this.game.balance.toString();
    // this.$playerHand.innerHTML = this.game.getPlayerHandString();
    // this.$playerValue.innerHTML = "Working";
    this.$playerValue.innerHTML = this.game.playersValue.toString();
    // this.$playerValue.innerHTML = this.game.getPlayerValue().toString();
    // console.log("getPlayerValue", this.game.getPlayerValue());
  }

  clearTable() {
    this.setInnerHTML(this.$dealerValue, "?");
    this.clearInnerHtml(this.$dealerHand, this.$playerHand);
    this.toggleButtonDisplay(
      [this.$start, this.$decreaseBtn, this.$increaseBtn],
      false
    );
    this.toggleButtonDisplay([this.$hitBtn, this.$standBtn], true);
  }
  setInnerHTML(element, content) {
    if (element) {
      element.innerHTML = content;
    }
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
