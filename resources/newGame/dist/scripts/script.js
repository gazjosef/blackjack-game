import { BlackjackGame } from "./game.js";
import { UI } from "./ui.js";

const game = new BlackjackGame();
const ui = new UI(game);
console.log("Hello World");
