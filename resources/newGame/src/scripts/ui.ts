import { BlackjackGame } from "./game";

export class UI {
  private game: BlackjackGame;

  constructor() {
    this.game = new BlackjackGame();
    this.initUI();
  }

  private initUI(): void {
    // Initialize UI elements and event listeners
  }

  startGame() {
    // Other game initialization logic
  }

  clearTable() {}

  updateUI(): void {
    // Update UI based on game state
  }
}
