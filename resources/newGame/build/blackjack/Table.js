"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
class Table {
    constructor(deck) {
        this.deck = deck;
        this.showCards = () => {
            console.log(this.deck);
        };
    }
}
exports.Table = Table;
