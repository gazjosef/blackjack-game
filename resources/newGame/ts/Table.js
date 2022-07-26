export const $chipStack = document.getElementById("chip-stack");
export const $message = document.getElementById("message");
export const $betStake = document.getElementById("bet-stake");
export const $dealerHand = document.getElementById("dealer-hand");
export const $dealerText = document.getElementById("dealer-value");
export const $playerHand = document.getElementById("player-hand");
export const $playerText = document.getElementById("player-value");
export const $start = document.getElementById("button-deal");
export const $hitBtn = document.getElementById("button-hit");
export const $standBtn = document.getElementById("button-stand");
export const $doubleBtn = document.getElementById("button-double");

const $decreaseBtn = document.getElementById("button-decrease");
const $increaseBtn = document.getElementById("button-increase");

export const clearTable = (balance) => {
  if ($chipStack) {
    $chipStack.innerHTML = balance.toString();
  }
  if ($dealerText) {
    $dealerText.innerHTML = "?";
  }
  if ($dealerHand) {
    $dealerHand.innerHTML = "";
  }
  if ($playerHand) {
    $playerHand.innerHTML = "";
  }
};

export const hideStartButtons = () => {
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

export const showStartButtons = () => {
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

export const showInGameButtons = () => {
  if ($hitBtn) {
    $hitBtn.style.display = "inline";
  }
  if ($standBtn) {
    $standBtn.style.display = "inline";
  }
};

// CHANGE BET SIZE
function increaseBetSize() {
  if ($betStake) {
    $betStake.innerHTML = (parseInt($betStake.innerHTML) + 5).toString();
  }
}

if ($increaseBtn) {
  $increaseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    increaseBetSize();
  });
}

function decreaseBetSize() {
  if ($betStake) {
    $betStake.innerHTML = (parseInt($betStake.innerHTML) - 5).toString();
  }
}

if ($decreaseBtn) {
  $decreaseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    decreaseBetSize();
  });
}
