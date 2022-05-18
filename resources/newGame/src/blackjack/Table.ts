import { Deck } from "./Deck";

export class Table {
  constructor(public deck: Deck) {}

  showCards = () => {
    console.log(this.deck);
  };

  // Clear Table
}
