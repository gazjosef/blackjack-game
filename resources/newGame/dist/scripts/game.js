"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackjackGame = void 0;
const deck_1 = require("./deck");
class BlackjackGame {
    constructor() {
        this.deck = new deck_1.Deck();
        this.dealersHand = [];
        this.playersHand = [];
        this.balance = 1000;
        // Initialization logic
    }
    startGame() {
        this.deck.shuffle();
        // Other game initialization logic
    }
    deal() {
        // Deal logic
    }
    takeCard() {
        // Take a card logic
    }
}
exports.BlackjackGame = BlackjackGame;
