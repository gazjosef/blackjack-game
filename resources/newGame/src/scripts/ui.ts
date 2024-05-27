import { BlackjackGame } from "./game";
import { Card } from "./card";

export class UI {
  // Instance
  private game: BlackjackGame;

  // Dealer / Player
  private $dealerHand: HTMLElement | null;
  private $playerHand: HTMLElement | null;
  private $dealerValue: HTMLElement | null;
  private $playerValue: HTMLElement | null;
  // Game
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

  constructor(game?: BlackjackGame) {
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

  private initUI(): void {
    if (!this.game) {
      return;
    } else {
      this.updateUI();
    }

    if (this.$start) {
      this.$start.addEventListener("click", async () => {
        if (!this.game.hasStarted) {
          this.clearTable();
          this.game.startGame();
          // await this.dealCardsWithDelay();
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
      this.$hitBtn.addEventListener("click", async () => {
        this.game.cardAction("hit");
        this.toggleButtonDisplay([this.$doubleBtn], false);
        // await this.dealCardsWithDelay();
        this.updateUI();
      });
    }
    if (this.$standBtn) {
      this.$standBtn.addEventListener("click", async () => {
        this.game.cardAction("stand");
        // await this.dealCardsWithDelay();
        this.checkResult();
      });
    }
    if (this.$doubleBtn) {
      this.$doubleBtn.addEventListener("click", async () => {
        this.game.cardAction("double");
        if (this.$playerValue) {
          this.$playerValue.innerHTML = this.game.playersValue.toString();
        }
        this.checkResult();
      });
    }
  }

  private updatePlayerHand() {
    if (this.$playerHand) {
      this.$playerHand.innerHTML = this.game.playersHand
        .map((card, index) => Card.cardOutput(card, index))
        .join("");
    }
    if (this.$playerValue) {
      this.$playerValue.innerHTML = this.game.playersValue.toString();
    }
  }

  private updateDealerHand() {
    if (this.$dealerHand) {
      this.$dealerHand.innerHTML = this.game.dealersHand
        .map((card, index) => Card.cardOutput(card, index))
        .join("");
    }
    if (this.$dealerValue) {
      this.$dealerValue.innerHTML = this.game.dealersValue.toString();
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
    this.updatePlayerHand();
    this.updateDealerHand();
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
}
