"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blackjack = void 0;
class Blackjack {
    constructor(deck) {
        this.deck = deck;
        this.showCards = () => {
            console.log(this.deck);
        };
    }
}
exports.Blackjack = Blackjack;
