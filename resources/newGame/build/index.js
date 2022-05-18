"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blackjack_1 = require("./blackjack/Blackjack");
const Deck_1 = require("./blackjack/Deck");
const deck = new Deck_1.Deck();
const game = new Blackjack_1.Blackjack(deck);
game.showCards();
