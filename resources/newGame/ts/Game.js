import { Hand } from "./Hand";

export class Blackjack {
  constructor() {
    this.deal = deal;
    this.newDeal = newDeal;
    this.cardAction = cardAction;
  }

  deal() {
    // Card count reshuffle
    for (let x = 0; x < 2; x++) {
      DEALERS_HAND.push(DECK[cardCount]);
      if ($dealerHand) {
        $dealerHand.innerHTML += cardOutput(cardCount, x);
      }
      if (x === 0) {
        if ($dealerHand) {
          $dealerHand.innerHTML +=
            '<div id="cover" class="card card__cover" style="left: 0px"></div>';
        }
      }
      reDeal();
      PLAYERS_HAND.push(DECK[cardCount]);
      if ($playerHand) {
        $playerHand.innerHTML += cardOutput(cardCount, x);
      }
      reDeal();
    }
    // End play if blackjack
    let playervalue = checkTotal(PLAYERS_HAND);
    if (playervalue === 21 && PLAYERS_HAND.length === 2) {
      endPlay();
    }
    console.log(PLAYERS_HAND);
    if ($playerValue) {
      $playerValue.innerHTML = playervalue.toString();
    }
    // Double: Check if value is 9, 10, or 11
    if (
      (checkTotal(PLAYERS_HAND) === 9 ||
        checkTotal(PLAYERS_HAND) === 10 ||
        checkTotal(PLAYERS_HAND) === 11) &&
      PLAYERS_HAND.length === 2
    ) {
      if ($doubleBtn) {
        $doubleBtn.style.display = "inline";
        console.log("Double-down?");
      }
    }
  }
}
