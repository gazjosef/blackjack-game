export class Card {
  constructor(suit, icon, bgcolor, cardnum, cardvalue) {
    this.suit = suit;
    this.icon = icon;
    this.bgcolor = bgcolor;
    this.cardnum = cardnum;
    this.cardvalue = cardvalue;
  }
  static cardOutput(card, index) {
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
