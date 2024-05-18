import { Deck } from "./deck.js";
export class BlackjackGame {
  constructor() {
    // Instance
    this.deck = new Deck();
    // Game
    this.dealersHand = [];
    this.dealersValue = 0;
    this.playersHand = [];
    this.playersValue = 0;
    this.balance = 1000;
    this.bet = 50;
    this.cardCount = 0;
    this.hasStarted = false;
    this.hasBlackJack = false;
    this.hasDouble = false;
  }

  startGame() {
    console.log("Start Game");
    this.deck.shuffle();
    this.deal();
    this.hasStarted = true;
    console.log("dealersHand", this.dealersHand);
    console.log("playersHand", this.playersHand);
    // Other game initialization logic
    this.checkTotal();
    this.checkBlackJack();
    this.checkDouble();
  }

  increaseBetSize() {
    console.log("Increase Bet");
    if (this.bet === 200) {
      return this.bet === 200;
    }
    this.bet += 25;
    this.balance -= this.bet;
  }

  decreaseBetSize() {
    console.log("Decrease Bet");
    if (this.bet === 25) {
      return this.bet === 25;
    }
    this.bet -= 25;
    this.balance -= this.bet;
  }

  deal() {
    const numCards = 2;
    const players = [this.dealersHand, this.playersHand];
    for (let i = 0; i < numCards; i++) {
      players.forEach((hand) => {
        hand.push(this.deck.draw());
        this.checkDeck();
      });
      console.log("Dealers Hand", this.dealersHand);
      console.log("Players Hand", this.playersHand);
      // Deal logic
    }
  }

  checkDeck() {
    this.cardCount++;
    if (this.cardCount > 40) {
      console.log("New Deck");
      this.cardCount = 0;
    }
  }

  checkTotal() {
    this.dealersValue = this.dealersHand.reduce(
      (acc, card) => acc + card.cardvalue,
      0
    );
    this.playersValue = this.playersHand.reduce(
      (acc, card) => acc + card.cardvalue,
      0
    );

    console.log("dealersValue", this.dealersValue);
    console.log("playersValue", this.playersValue);
  }

  checkBlackJack() {
    if (this.playersValue === 21 && this.playersHand.length === 2) {
      this.hasBlackJack = true;
      console.log("Has BlackJack");
      this.endPlay();
    } else {
      console.log("Does Not Have BlackJack");
    }
  }

  checkDouble() {
    if (
      this.playersValue === 9 ||
      this.playersValue === 10 ||
      (this.playersValue === 11 && this.playersHand.length === 2)
    ) {
      this.hasDouble = true;
      console.log("Double?");
    } else {
      console.log("not 9,10,11");
    }
  }

  cardAction(action) {
    console.log(action);
    switch (action) {
      case "hit":
        this.playersHand.push(this.deck.draw());
        this.checkTotal();
        break;
      case "stand":
        this.endPlay();
        break;
      case "double":
        this.adjustBetAndBalance(2);
        this.playersHand.push(this.deck.draw());
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
  cardOutput() {}
  endPlay() {
    console.log("End Play");
  }

  checkWinner() {}
}
