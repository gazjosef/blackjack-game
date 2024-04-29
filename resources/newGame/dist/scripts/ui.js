"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
const game_1 = require("./game");
class UI {
    constructor() {
        this.game = new game_1.BlackjackGame();
        this.initUI();
    }
    initUI() {
        // Initialize UI elements and event listeners
    }
    updateUI() {
        // Update UI based on game state
    }
}
exports.UI = UI;
