import { Blackjack } from "./blackjack/Blackjack";
import { Deck } from "./blackjack/Deck";

const deck = new Deck();
const game = new Blackjack(deck);

game.showCards();
