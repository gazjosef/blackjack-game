// export const $dealerHand = document.getElementById("dealer-hand");
// export const $dealerText = document.getElementById("dealer-value");
// export const $playerHand = document.getElementById("player-hand");
// export const $playerText = document.getElementById("player-value");

export class Hand {
  constructor(value, cards) {
    this.value = value;
    this.cards = cards;
  }

  takeCard() {}

  checkTotal() {}

  reset() {}
}
