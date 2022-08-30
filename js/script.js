////////////////////////////////////////
//* 0. TABLE OF CONTENTS
////////////////////////////////////////

// 1. Variables
// 2. Build Deck of Cards
// 3. Shuffle Deck
// 4. Clear Table
// 5. Deal
// 6. New Deal
// 7. Start Game
// 8. ReDeal
// 9. Card Output
// 10. Card Action
// 11. Take Card
// 12. End Play

////////////////////////////////////////
//* 1. VARIABLES
////////////////////////////////////////

// -- GAME STATUS

let cardCount = 0;
let balance = 1000;

// -- ARRAYS

let DEALERS_HAND = [];
let PLAYERS_HAND = [];

const DECK = [];
const SUITS = ["spades", "hearts", "clubs", "diams"];
const NUMB = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// -- DOM ELEMENTS

const $dealerHand = document.getElementById("dealer-hand");
const $playerHand = document.getElementById("player-hand");
const $dealerValue = document.getElementById("dealer-value");
const $playerValue = document.getElementById("player-value");

const $message = document.getElementById("message");
const $betStake = document.getElementById("bet-stake");
const $chipStack = document.getElementById("chip-stack");

// -- Buttons
const $start = document.getElementById("button-deal");
const $increaseBtn = document.getElementById("button-increase");
const $decreaseBtn = document.getElementById("button-decrease");

const $hitBtn = document.getElementById("button-hit");
const $standBtn = document.getElementById("button-stand");
const $doubleBtn = document.getElementById("button-double");
const $splitBtn = document.getElementById("button-split");

// -- Event Listeners
$start.addEventListener("click", (e) => {
  e.preventDefault();
  Start();
});

$increaseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  increaseBetSize();
});

$decreaseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  decreaseBetSize();
});

$hitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cardAction("hit");
});

$standBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cardAction("stand");
});

$doubleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cardAction("double");
});

////////////////////////////////////////
//* 2. BUILD DECK OF CARDS
////////////////////////////////////////

for (let s in SUITS) {
  let suit = SUITS[s][0].toUpperCase();
  const bgcolor = suit === "S" || suit === "C" ? "black" : "red";
  for (let n in NUMB) {
    const cardValue = n > 9 ? 10 : parseInt(n) + 1;
    let card = {
      suit: suit,
      icon: SUITS[s],
      bgcolor: bgcolor,
      cardnum: NUMB[n],
      cardvalue: cardValue,
    };
    DECK.push(card);
  }
}

////////////////////////////////////////
//* 3. SHUFFLE DECK
////////////////////////////////////////

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}

////////////////////////////////////////
//* 4. START GAME
////////////////////////////////////////

function Start() {
  shuffleDeck(DECK);
  newDeal();
}

////////////////////////////////////////
//* 5. CLEAR TABLE
////////////////////////////////////////

function clearTable() {
  PLAYERS_HAND = [];
  DEALERS_HAND = [];

  $chipStack.innerHTML = balance;

  $dealerValue.innerHTML = "?";

  $dealerHand.innerHTML = "";
  $playerHand.innerHTML = "";

  $start.style.display = "none";
  $decreaseBtn.style.display = "none";
  $increaseBtn.style.display = "none";

  $hitBtn.style.display = "inline";
  $standBtn.style.display = "inline";
}

////////////////////////////////////////
//* 6. DEAL
////////////////////////////////////////

function deal() {
  // Card count reshuffle
  for (let x = 0; x < 2; x++) {
    DEALERS_HAND.push(DECK[cardCount]);
    $dealerHand.innerHTML += cardOutput(cardCount, x);
    if (x === 0) {
      $dealerHand.innerHTML +=
        '<div id="cover" class="card card__cover" style="left: 0px"></div>';
    }
    reDeal();
    PLAYERS_HAND.push(DECK[cardCount]);
    $playerHand.innerHTML += cardOutput(cardCount, x);
    reDeal();
  }

  // End play if blackjack
  let playervalue = checkTotal(PLAYERS_HAND);
  if (playervalue === 21 && PLAYERS_HAND.length === 2) {
    endPlay();
  }
  console.log(PLAYERS_HAND);
  $playerValue.innerHTML = playervalue;

  // Double: Check if value is 9, 10, or 11
  if (
    (checkTotal(PLAYERS_HAND) === 9 ||
      checkTotal(PLAYERS_HAND) === 10 ||
      checkTotal(PLAYERS_HAND) === 11) &&
    PLAYERS_HAND.length === 2
  ) {
    $doubleBtn.style.display = "inline";
    console.log("Double-down?");
  }

  // // Split: Check for Pairs

  // if (PLAYERS_HAND[0].cardnum === PLAYERS_HAND[1].cardnum) {
  //   playerHolder2.innerHTML += cardOutput(cardCount - 1, 0);
  //   document.getElementById('btnsplit').style.display = 'inline';
  //   console.log('Split cards?');
  // }
}

////////////////////////////////////////
//* 7. NEW DEAL
////////////////////////////////////////

function newDeal() {
  clearTable();

  let betvalue = $betStake.innerHTML;
  balance = balance - betvalue;
  $chipStack.innerHTML = balance;
  $message.innerHTML = `Current bet is $${betvalue}`;

  deal();
}

////////////////////////////////////////
//* 8. RE-DEAL
////////////////////////////////////////

function reDeal() {
  cardCount++;
  if (cardCount > 40) {
    console.log("New Deck");
    shuffleDeck(DECK);
    cardCount = 0;
    $message.innerHTML = "New Shuffle";
  }
}

////////////////////////////////////////
//* 9. CARD OUTPUT
////////////////////////////////////////

function cardOutput(n, x) {
  let hpos = x > 0 ? x * 60 + 0 : 0;

  return `<div class="card ${DECK[n].icon}" style="left: ${hpos}px;">
    <div class="card__top">
      <div class="card__corner suit">
      ${DECK[n].cardnum}
      </div>
    </div>
    <div class="card__content suit"></div>
    <div class="card__bottom">
      <div class="card__corner suit">
      ${DECK[n].cardnum}
      </div>
    </div>
  </div>`;
}

////////////////////////////////////////
//* 10. CARD ACTION
////////////////////////////////////////

function cardAction(a) {
  console.log(a);
  switch (a) {
    case "hit":
      takeCard();
      $doubleBtn.style.display = "none";
      break;

    case "hold":
      endPlay();
      break;

    case "double":
      let betvalue = parseInt($betStake.innerHTML);
      if (balance - betvalue < 0) {
        betvalue = betvalue + balance;
        balance = 0;
      } else {
        balance = balance - betvalue;
        betvalue = betvalue * 2;
      }
      $chipStack.innerHTML = balance;
      $betStake.innerHTML = betvalue;
      takeCard();
      endPlay();
      break;

    case "split":
      splitCard();
      break;

    default:
      console.log("done");
      endPlay();
  }
}

////////////////////////////////////////
//* 11. TAKE CARD
////////////////////////////////////////

function takeCard() {
  PLAYERS_HAND.push(DECK[cardCount]);

  $playerHand.innerHTML += cardOutput(cardCount, PLAYERS_HAND.length - 1);

  reDeal();

  let rValu = checkTotal(PLAYERS_HAND);

  $playerValue.innerHTML = rValu;

  if (rValu > 21) {
    $message.innerHTML = "Busted!";
    endPlay();
  }
}

////////////////////////////////////////
//* 12. END PLAY
////////////////////////////////////////

function endPlay() {
  // endplay = true;
  document.getElementById("cover").style.display = "none";

  $hitBtn.style.display = "none";
  $standBtn.style.display = "none";
  $doubleBtn.style.display = "none";
  $splitBtn.style.display = "none";

  $start.style.display = "inline";
  $increaseBtn.style.display = "inline";
  $decreaseBtn.style.display = "inline";

  $message.innerHTML = "Game Over<br>";
  let payoutJack = 1;

  let dealervalue = checkTotal(DEALERS_HAND);
  $dealerValue.innerHTML = dealervalue;

  while (dealervalue < 17 && PLAYERS_HAND.length > 2) {
    DEALERS_HAND.push(DECK[cardCount]);
    $dealerHand.innerHTML += cardOutput(cardCount, DEALERS_HAND.length - 1);
    reDeal();
    dealervalue = checkTotal(DEALERS_HAND);
    $dealerValue.innerHTML = dealervalue;
  }

  // WHO wON?

  let playervalue = checkTotal(PLAYERS_HAND);

  if (playervalue === 21 && PLAYERS_HAND.length === 2) {
    $message.innerHTML = "Blackjack<br>";
    payoutJack = 1.5;
  }

  let betvalue = parseInt($betStake.innerHTML) * payoutJack;

  // MESSAGE
  if (
    (playervalue < 22 && dealervalue < playervalue) ||
    (dealervalue > 21 && playervalue < 22)
  ) {
    $message.innerHTML += `You WIN! You won $${betvalue}`;
    balance = balance + betvalue * 2;
  } else if (playervalue > 21) {
    $message.innerHTML += `Dealer Wins! You lost $${betvalue}`;
  } else if (playervalue === dealervalue) {
    $message.innerHTML += `Push`;
    balance = balance + betvalue;
  } else {
    $message.innerHTML += `Dealer Wins! You lost $${betvalue}`;
  }
  $playerValue.innerHTML = playervalue;
  $chipStack.innerHTML = balance;
}

// 13. CHECK TOTAL

function checkTotal(arr) {
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

// CHANGE BET SIZE

function increaseBetSize() {
  $betStake.innerHTML = parseInt($betStake.innerHTML) + 5;
}

function decreaseBetSize() {
  $betStake.innerHTML = parseInt($betStake.innerHTML) - 5;
}
