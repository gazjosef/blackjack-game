// Arrays

const deck: any = [];
let dealerHand: Array<Object> = [];
let playerHand: Array<Object> = [];

const suits = ["spades", "hearts", "clubs", "diams"];
const numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Game Status

let cardCount: number = 0;
let mydollars: number = 1000;
let endplay: boolean = false;

// Dom Elements

const message = document.getElementById("message");
const output = document.getElementById("output");
const dealerHolder = document.getElementById("dealerHolder");
const playerHolder = document.getElementById("playerHolder");
const pValue = document.getElementById("pValue");
const dValue = document.getElementById("dValue");
const chipStack = document.getElementById("dollars");
const myBet = <HTMLInputElement>document.getElementById("mybet");

// Event listeners

document.getElementById("mybet").addEventListener("change", changeBetSize);

function changeBetSize() {
  if (this.value < 0) {
    this.value = 0;
  }
  if (this.value > mydollars) {
    this.value = mydollars;
  }
  message.innerHTML = "Bet changed to $" + this.value;
}

// Build deck of cards

for (let s in suits) {
  let suit = suits[s][0].toUpperCase();
  const bgcolor = suit === "S" || suit === "C" ? "black" : "red";
  for (let n in numb) {
    const cardValue = n > 9 ? 10 : parseInt(n) + 1;
    let card = {
      suit: suit,
      icon: suits[s],
      bgcolor: bgcolor,
      cardnum: numb[n],
      cardvalue: cardValue
    };
    deck.push(card);
  }
}

// Start Game

function Start() {
  shuffleDeck(deck);
  newDeal();
  document.getElementById("start").style.display = "none";
  chipStack.innerHTML = mydollars.toString();
}

// Shuffle Deck

function shuffleDeck(array: Array<object>) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// New Deal

function newDeal() {
  dValue.innerHTML = "?";
  playerHand = [];
  dealerHand = [];
  dealerHolder.innerHTML = "";
  playerHolder.innerHTML = "";

  let betvalue: any = myBet.value;
  mydollars = mydollars - betvalue;

  document.getElementById("dollars").innerHTML = mydollars.toString();
  document.getElementById("myactions").style.display = "block";
  message.innerHTML = "Current bet is $" + betvalue;
  myBet.disabled = true;
  deal();
  document.getElementById("start").style.display = "none";
  document.getElementById("decrease").style.display = "none";
  document.getElementById("increase").style.display = "none";
}

// Deal

function deal() {
  console.log(deck);

  // Card count reshuffle
  for (let x = 0; x < 2; x++) {
    dealerHand.push(deck[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x === 0) {
      dealerHolder.innerHTML += '<div id="cover" style="left: 100px"></div>';
    }
    reDeal();
    playerHand.push(deck[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, x);
    reDeal();
  }

  // End play if blackjack
  let playervalue = checktotal(playerHand);
  if (playervalue === 21 && playerHand.length === 2) {
    endPlay();
  }
  console.log(playerHand);
  pValue.innerHTML = playervalue.toString();

  // Double: Check if value is 9, 10, or 11
  if (
    (checktotal(playerHand) === 9 ||
      checktotal(playerHand) === 10 ||
      checktotal(playerHand) === 11) &&
    playerHand.length === 2
  ) {
    document.getElementById("btndouble").style.display = "inline";
    console.log("Double-down?");
  }
}

// Re-Deal

function reDeal() {
  cardCount++;
  if (cardCount > 40) {
    console.log("New Deck");
    shuffleDeck(deck);
    cardCount = 0;
    message.innerHTML = "New Shuffle";
  }
}

// Card Output

function cardOutput(n, x) {
  let hpos = x > 0 ? x * 60 + 100 : 100;
  return (
    '<div class="icard ' +
    deck[n].icon +
    '" style="left:' +
    hpos +
    'px;">  <div class="top-card suit">' +
    deck[n].cardnum +
    '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' +
    deck[n].cardnum +
    "<br></div> </div>"
  );
}

// Card Action

function cardAction(a) {
  console.log(a);
  switch (a) {
    case "hit":
      takeCard(); // add new card to players hand
      document.getElementById("btndouble").style.display = "none";
      break;
    case "hold":
      endPlay(); //Playout and calculate
      break;
    case "double":
      let betvalue = parseInt(myBet.value);
      if (mydollars - betvalue < 0) {
        betvalue = betvalue + mydollars;
        mydollars = 0;
      } else {
        mydollars = mydollars - betvalue;
        betvalue = betvalue * 2;
      }
      document.getElementById("dollars").innerHTML = mydollars.toString();
      document.getElementById("mybet").value = betvalue;
      // double current bet, remove value from mydollars
      takeCard(); // add new card to players hand
      endPlay(); //Playout and calculate
      break;
    case "split":
      splitCard(); //Split cards into two hands
      break;
    default:
      console.log("done");
      endPlay(); //Playout and calculate
  }
}

// Take Card

function takeCard() {
  playerHand.push(deck[cardCount]);
  playerHolder.innerHTML += cardOutput(cardCount, playerHand.length - 1);
  reDeal();
  let rValu = checktotal(playerHand);
  pValue.innerHTML = rValu.toString();
  if (rValu > 21) {
    message.innerHTML = "Busted!";
    endPlay();
  }
}

// Split Card

function splitCard() {
  playerHolder.innerHTML = cardOutput(cardCount - 3, 0);
  document.getElementById("player1").style.display = "block";
}

// End Play

function endPlay() {
  endplay = true;
  document.getElementById("cover").style.display = "none";
  document.getElementById("myactions").style.display = "none";
  document.getElementById("start").style.display = "inline";
  // document.getElementById("increase").style.display = "inline";
  // document.getElementById("decrease").style.display = "inline";
  myBet.disabled = false;
  message.innerHTML = "Game Over<br>";
  let payoutJack = 1;

  let dealervalue = checktotal(dealerHand);
  dValue.innerHTML = dealervalue.toString();

  while (dealervalue < 17) {
    dealerHand.push(deck[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, dealerHand.length - 1);
    reDeal();
    dealervalue = checktotal(dealerHand);
    dValue.innerHTML = dealervalue.toString();
  }

  // Who won?

  let playervalue = checktotal(playerHand);
  if (playervalue === 21 && playerHand.length === 2) {
    message.innerHTML = "Blackjack<br>";
    payoutJack = 1.5;
  }

  let betvalue = parseInt(myBet.value) * payoutJack;

  if (
    (playervalue < 22 && dealervalue < playervalue) ||
    (dealervalue > 21 && playervalue < 22)
  ) {
    message.innerHTML +=
      '<span style="color: green;">You WIN! You won $' + betvalue + "</span>";
    mydollars = mydollars + betvalue * 2;
  } else if (playervalue > 21) {
    message.innerHTML +=
      '<span style="color: red;">Dealer Wins! You lost $' +
      betvalue +
      "</span>";
  } else if (playervalue === dealervalue) {
    message.innerHTML += '<span style="color: blue;">Push</span>';
    mydollars = mydollars + betvalue;
  } else {
    message.innerHTML +=
      '<span style="color: red;">Dealer Wins! You lost $' +
      betvalue +
      "</span>";
  }
  pValue.innerHTML = playervalue.toString();
  chipStack.innerHTML = mydollars.toString();
}

// Check Total

function checktotal(arr) {
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

function outputCard() {
  output.innerHTML +=
    "<span style='color:" +
    deck[cardCount].bgcolor +
    "'>" +
    deck[cardCount].cardnum +
    "&" +
    deck[cardCount].icon +
    ";</span>  ";
}