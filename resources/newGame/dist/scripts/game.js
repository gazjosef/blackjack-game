import { Deck } from "./deck.js";
export class BlackjackGame {
  constructor() {
    this.deck = new Deck();
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    this.bet = 50;
  }

  deal() {
    this.deck.shuffle();
    console.log("deck before", this.deck);
    console.log("playersHand before", this.playersHand);
    // Deal logic
    this.playersHand.push(this.deck.draw());
    this.dealersHand.push(this.deck.draw());
    this.playersHand.push(this.deck.draw());

    console.log("playersHand", this.playersHand);
    console.log("deck after", this.deck);
  }

  cardAction(action) {
    console.log(action);
    switch (action) {
      case "hit":
        this.takeCard();
        break;

      case "double":
        this.adjustBetAndBalance(2);
        this.takeCard();
        break;

      // case "split":
      //   this.splitCard();
      //   break;

      default:
        console.log("Unknown action:", action);
    }
  }

  endplay() {
    let dealervalue = 0;

    this.dealersHand.forEach((card) => {
      dealervalue += card.cardValue;
    });
    while (dealervalue < 17) {
      this.dealersHand.push(this.deck.draw());
      // DEALERS_HAND.push(DECK[cardCount]);
      // $dealerHand.innerHTML += cardOutput(cardCount, DEALERS_HAND.length - 1);
      // reDeal();
      // dealervalue = checkTotal(DEALERS_HAND);
      // $dealerValue.innerHTML = dealervalue;
    }
  }

  checkTotal() {
    // Check Total
  }
  takeCard() {
    // Take a card logic
    this.playersHand.push(this.deck.draw());
  }
}
