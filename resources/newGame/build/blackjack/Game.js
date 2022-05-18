"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(deck) {
        this.deck = deck;
        this.showCards = () => {
            console.log(this.deck);
        };
    }
}
exports.Game = Game;
