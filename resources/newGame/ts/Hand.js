export class Hand {
  constructor(name, height, width) {
    this.name = name;
    this.cards = [];
    // this.height = height;
    // this.width = width;
  }

  takeCard() {}

  checkAce(arr) {
    let rValue = 0;
    let aceAdjust = false;
    for (let i in arr) {
      if (arr[i].cardnum === "A" && !aceAdjust) {
        aceAdjust = true;
        rValue = rValue + 10;
      }
      rValue = rValue + arr[i].cardvalue;
    }
    if (aceAdjust && rValue > 21) {
      rValue = rValue - 10;
    }
    return rValue;
  }

  reset() {
    this.cards = null;
  }
}

let hand = new Hand("Gaz");
hand.cards.push("cards");
console.log("hand", hand.cards);
hand.reset();
console.log("hand", hand.cards);
