import { $deck } from "./script";

export const $chipStack = document.getElementById("chip-stack");
export const $message = document.getElementById("message");
export const $betStake = document.getElementById("bet-stake");

export const $start = document.getElementById("button-deal");
export const $hitBtn = document.getElementById("button-hit");
export const $standBtn = document.getElementById("button-stand");
export const $doubleBtn = document.getElementById("button-double");
const $decreaseBtn = document.getElementById("button-decrease");
const $increaseBtn = document.getElementById("button-increase");

export class Table {
  constructor() {
    this.balance = 1000;
    this.betStake = 25;
  }

  cardOutput(n, x) {
    let hpos = x > 0 ? x * 60 + 0 : 0;

    return `<div class="card ${$deck[n].icon}" style="left: ${hpos}px;">
    <div class="card__top">
      <div class="card__corner suit">
      ${$deck[n].cardnum}
      </div>
    </div>
    <div class="card__content suit"></div>
    <div class="card__bottom">
      <div class="card__corner suit">
      ${$deck[n].cardnum}
      </div>
    </div>
  </div>`;
  }

  clearTable = (balance) => {
    if ($chipStack) {
      $chipStack.innerHTML = balance.toString();
    }
    // if ($dealerText) {
    //   $dealerText.innerHTML = "?";
    // }
    // if ($dealerHand) {
    //   $dealerHand.innerHTML = "";
    // }
    // if ($playerHand) {
    //   $playerHand.innerHTML = "";
    // }
  };

  hideStartButtons = () => {
    if ($start) {
      $start.style.display = "none";
    }
    if ($decreaseBtn) {
      $decreaseBtn.style.display = "none";
    }
    if ($increaseBtn) {
      $increaseBtn.style.display = "none";
    }
  };

  showStartButtons = () => {
    if ($start) {
      $start.style.display = "inline";
    }
    if ($increaseBtn) {
      $increaseBtn.style.display = "inline";
    }
    if ($decreaseBtn) {
      $decreaseBtn.style.display = "inline";
    }
  };

  showInGameButtons = () => {
    if ($hitBtn) {
      $hitBtn.style.display = "inline";
    }
    if ($standBtn) {
      $standBtn.style.display = "inline";
    }
  };

  // CHANGE BET SIZE
  increaseBetSize() {
    if ($betStake) {
      $betStake.innerHTML = (parseInt($betStake.innerHTML) + 5).toString();
    }
  }

  if($increaseBtn) {
    $increaseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      increaseBetSize();
    });
  }

  decreaseBetSize() {
    if ($betStake) {
      $betStake.innerHTML = (parseInt($betStake.innerHTML) - 5).toString();
    }
  }

  if($decreaseBtn) {
    $decreaseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      decreaseBetSize();
    });
  }
}
