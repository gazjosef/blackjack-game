import { Deck } from "./deck.js";
export class BlackjackGame {
  constructor() {
    this.deck = new Deck();
    this.dealersHand = [];
    this.playersHand = [];
    this.balance = 1000;
    this.bet = 50;
    this.cardCount = 0;
    this.hasStarted = false;
    this.hasFinished = false;
    this.hasBlackJack = false;
    this.hasDouble = false;
    this.message = "";
  }
  startGame() {
    console.log("Start Game");
    this.resetGame();
    this.deck.shuffle();
    this.hasStarted = true;
    this.dealInitialCards();
    this.checkInitialConditions();
    // this.updateGameState();
  }
  increaseBetSize() {
    if (this.bet < 200) {
      // Ensure bet does not exceed the maximum allowed
      this.adjustBet(25);
    }
    console.log("Increase Bet", this.bet);
  }
  decreaseBetSize() {
    if (this.bet > 25) {
      // Ensure bet does not go below the minimum allowed
      this.adjustBet(-25);
    }
    console.log("Decrease Bet", this.bet);
  }
  adjustBet(amount) {
    if (this.balance >= amount) {
      this.bet += amount;
      console.log(
        "Adjusted bet by",
        amount,
        "new bet:",
        this.bet,
        "new balance:",
        this.balance
      );
    }
  }
  dealInitialCards() {
    const numCards = 2;
    const players = [this.dealersHand, this.playersHand];
    for (let i = 0; i < numCards; i++) {
      for (const hand of players) {
        hand.push(this.deck.draw());
        this.checkDeck();
      }
      console.log("Dealers Hand", this.dealersHand);
      console.log("Players Hand", this.playersHand);
    }
  }

  dealCard(hand) {
    hand.push(this.deck.draw());
    this.checkDeck();
  }

  checkDeck() {
    this.cardCount++;
    if (this.cardCount > 40) {
      console.log("New Deck");
      this.cardCount = 0;
    }
  }

  cardAction(action) {
    console.log(action);
    switch (action) {
      case "hit":
        this.dealCard(this.playersHand);
        this.updateGameState();
        break;
      case "stand":
        this.endPlay();
        break;
      case "double":
        this.adjustBetAndBalance(2);
        this.dealCard(this.playersHand);
        this.endPlay();
        break;
      default:
        console.log("Unknown action:", action);
    }
  }

  adjustBetAndBalance(factor) {
    this.bet *= factor;
    this.balance -= this.bet;
  }

  checkInitialConditions() {
    this.hasBlackJack =
      this.playersValue === 21 && this.playersHand.length === 2;

    if (this.hasBlackJack) {
      this.hasFinished = true;
      return this.checkWinner();
    }

    this.hasDouble =
      [9, 10, 11].includes(this.playersValue) && this.playersHand.length === 2;
    if (this.hasBlackJack) {
      console.log("Has BlackJack");
      this.endPlay();
    }
  }

  get playersValue() {
    return this.calculateHandValue(this.playersHand);
  }

  get dealersValue() {
    return this.calculateHandValue(this.dealersHand);
  }

  calculateHandValue(hand) {
    let totalValue = hand.reduce((acc, card) => acc + card.cardvalue, 0);
    const hasAce = hand.some((card) => card.cardnum === "A");
    if (hasAce && totalValue + 10 <= 21) {
      totalValue += 10;
    }
    return totalValue;
  }

  updateGameState() {
    if (this.playersValue >= 21) {
      this.hasFinished = true;
      this.checkWinner();
    }
  }

  endPlay() {
    while (this.dealersValue < 17) {
      this.dealCard(this.dealersHand);
    }
    this.hasFinished = true;
    this.checkWinner();
    this.hasStarted = false;
  }

  checkWinner() {
    console.log("Checking winner...");
    if (
      this.playersValue > 21 ||
      (this.dealersValue <= 21 && this.dealersValue > this.playersValue)
    ) {
      this.message = "You Lost";
      this.balance -= this.bet;
    } else if (this.playersValue === this.dealersValue) {
      this.message = "Push";
      this.balance += this.bet;
    } else {
      this.message = "You Won";
      this.balance += this.bet * 2;
    }
    console.log(this.message);
    console.log("Balance:", this.balance);
  }

  resetGame() {
    this.dealersHand = [];
    this.playersHand = [];
    this.cardCount = 0;
    this.hasFinished = false;
    this.hasBlackJack = false;
    this.hasDouble = false;
    this.message = "";
  }
}
