"use strict";
exports.__esModule = true;
exports.UI = void 0;
var game_1 = require("./game");
var UI = /** @class */ (function () {
    function UI() {
        this.game = new game_1.BlackjackGame();
        this.initUI();
    }
    UI.prototype.initUI = function () {
        // Initialize UI elements and event listeners
    };
    UI.prototype.updateUI = function () {
        // Update UI based on game state
    };
    return UI;
}());
exports.UI = UI;
