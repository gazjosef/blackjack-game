import { Suit } from "./types";

export class Card {
  constructor(
    public suit: Suit,
    public icon: string,
    public bgcolor: string,
    public cardnum: string,
    public cardvalue: number
  ) {}

  static cardOutput(card: Card, index: number): string {
    const hpos = index > 0 ? index * 60 + 0 : 0;

    return `<div class="card ${card.icon}" style="left: ${hpos}px;">
    <div class="card__top">
        <div class="card__corner suit">
        ${card.cardnum}
        </div>
    </div>
    <div class="card__content suit"></div>
    <div class="card__bottom">
        <div class="card__corner suit">
        ${card.cardnum}
        </div>
    </div>
    </div>`;
  }
}
