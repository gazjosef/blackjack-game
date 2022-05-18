import { Deck } from "../blackjack/Deck";

export class Blackjack {
  constructor(public deck: Deck) {}

  showCards = () => {
    console.log(this.deck);
  };
}
