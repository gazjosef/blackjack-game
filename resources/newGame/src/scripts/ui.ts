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

  updateUI(): void {
    // Update UI based on game state
  }
}
