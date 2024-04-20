export type Card = {
  suit: string;
  icon: string;
  bgcolor: string;
  cardnum: string;
  cardvalue: number;
};

export class NewDeck {
  static cardCount = 0;

  static buildDeck(): Card[] {
    const suits = ["spades", "hearts", "clubs", "diams"];
    const numbers: Record<string, number> = {
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

    const deck = suits.flatMap((suit) => {
      const bgcolor =
        suit[0].toUpperCase() === "S" || suit[0].toUpperCase() === "C"
          ? "black"
          : "red";
      return Object.entries(numbers).map(([cardnum, cardvalue]) => ({
        suit: suit[0].toUpperCase(),
        icon: suit,
        bgcolor,
        cardnum,
        cardvalue,
      }));
    });

    return deck;
  }

  static shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
}
