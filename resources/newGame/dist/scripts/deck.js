"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const card_1 = require("./card");
const types_1 = require("./types");
class Deck {
    constructor() {
        this.deck = [];
        this.buildDeck();
    }
    buildDeck() {
        const suits = [types_1.Suit.SPADES, types_1.Suit.HEARTS, types_1.Suit.CLUBS, types_1.Suit.DIAMONDS];
        const numbers = [
            "A",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K",
        ];
        for (const suit of suits) {
            const bgcolor = [types_1.Suit.SPADES, types_1.Suit.CLUBS].includes(suit)
                ? "black"
                : "red";
            for (const cardnum of numbers) {
                const cardValue = parseInt(cardnum) || (cardnum !== "A" ? 10 : 11);
                const card = new card_1.Card(suit, suit, bgcolor, cardnum, cardValue);
                this.deck.push(card);
            }
        }
    }
    shuffle() {
        // Shuffle logic
    }
    deal() {
        // Deal a card
        return this.deck.pop();
    }
}
exports.Deck = Deck;
