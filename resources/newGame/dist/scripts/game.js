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
    this.hasFinished = false;
    this.hasBlackJack = false;
    this.hasDouble = false;
    this.message = "";
  }
  startGame() {
    console.log("Start Game");
    this.deck.shuffle();
    this.deal();
    this.hasStarted = true;
    this.checkTotal();
    this.checkBlackJack();
    this.checkDouble();
    console.log("dealersHand", this.dealersHand);
    console.log("playersHand", this.playersHand);
  }
  increaseBetSize() {
    console.log("Increase Bet");
    // MAX BET: $200
    if (this.bet >= 200) {
      return;
    }
    this.bet += 25;
    this.balance -= 25;
  }
  decreaseBetSize() {
    console.log("Decrease Bet");
    // MIN BET: $25
    if (this.bet <= 25) {
      return;
    }
    this.bet -= 25;
    this.balance -= 25;
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
  checkTotal() {
    this.dealersValue = this.dealersHand.reduce(
      (acc, card) => acc + card.cardvalue,
      0
    );
    this.playersValue = this.playersHand.reduce(
      (acc, card) => acc + card.cardvalue,
      0
    );
    if (this.playersValue > 21) {
      console.log("Bust");
      this.endPlay();
    }
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
      (this.playersValue === 9 ||
        this.playersValue === 10 ||
        this.playersValue === 11) &&
      this.playersHand.length === 2
    ) {
      this.hasDouble = true;
      console.log("Double?");
    } else {
      console.log("not 9,10,11");
    }
  }
  checkAce(cards) {
    let totalValue = 0;
    let hasAce = false;
    // Calculate the total value and check for aces
    for (const card of cards) {
      totalValue += card.cardvalue;
      if (card.cardnum === "A") {
        hasAce = true;
      }
    }
    // Adjust for the ace if the total value is over 21
    if (hasAce && totalValue + 10 <= 21) {
      totalValue += 10;
    }
    return totalValue;
  }
  //   cardOutput() {}
  endPlay() {
    console.log("End Play");
    this.hasFinished = true;
    while (this.dealersValue < 17) {
      console.log("Less than 17");
      const card = this.deck.draw();
      if (card) {
        this.dealersHand.push(card);
        this.dealersValue += card.cardvalue;
      } else {
        console.error("Deck is empty, cannot draw more cards.");
        break;
      }
    }
    this.checkWinner();
  }
  checkWinner() {
    console.log("checkWinner: dealersValue", this.dealersValue);
    console.log("checkWinner: playersValue", this.playersValue);
    if (
      (this.playersValue < 22 && this.dealersValue < this.playersValue) ||
      (this.dealersValue > 21 && this.playersValue < 22)
    ) {
      console.log("You Won");
      this.message = "Yon Won";
    } else if (this.playersValue > 21) {
      console.log("You Lost");
      this.message = "You Lost";
    } else if (this.playersValue === this.dealersValue) {
      console.log("Push");
      this.message = "Push";
    } else {
      console.log("You Lost");
      this.message = "You Lost";
    }
  }
}
