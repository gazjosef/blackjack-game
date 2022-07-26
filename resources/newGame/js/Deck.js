export class Deck {
  constructor() {
    this.cardCount = 0;
    this.deck = this.buildDeck();
    this.deck = this.shuffleDeck(this.deck);
  }

  buildDeck() {
    const DECK = [];
    const SUITS = ["spades", "hearts", "clubs", "diams"];
    const NUMB = {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      J: 10,
      Q: 10,
      K: 10,
      A: 11,
    };

    for (let s in SUITS) {
      let suit = SUITS[s][0].toUpperCase();
      const bgcolor = suit === "S" || suit === "C" ? "black" : "red";
      for (let key in NUMB) {
        let card = {
          suit: suit,
          icon: SUITS[s],
          bgcolor: bgcolor,
          cardnum: key,
          cardvalue: parseInt(NUMB[key]),
        };
        DECK.push(card);
      }
    }

    return DECK;
  }

  shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    return deck;
  };
}
