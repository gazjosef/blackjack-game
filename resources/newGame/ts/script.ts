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
// 1. VARIABLES

// -- GAME STATUS

let cardCount = 0;
let balance = 1000;

// -- ARRAYS

let DEALERS_HAND: {}[] = [];
let PLAYERS_HAND: {}[] = [];

const DECK: any = [];
const SUITS: string[] = ["spades", "hearts", "clubs", "diams"];
const NUMB = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const NUMB2: any = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 11,
};

// -- DOM ELEMENTS

const $dealerHand = document.getElementById("dealer-hand");
const $playerHand = document.getElementById("player-hand");
const $dealerValue = document.getElementById("dealer-value");
const $playerValue = document.getElementById("player-value");

const $cover = document.getElementById("cover");
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

if ($start) {
  $start.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    Start();
  });
}

if ($increaseBtn) {
  $increaseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    increaseBetSize();
  });
}

if ($decreaseBtn) {
  $decreaseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    decreaseBetSize();
  });
}

if ($hitBtn) {
  $hitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cardAction("hit");
  });
}

if ($standBtn) {
  $standBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cardAction("stand");
  });
}

if ($doubleBtn) {
  $doubleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cardAction("double");
  });
}

////////////////////////////////////////
// 2. BUILD DECK OF CARDS
type Card = {
  suit: string;
  icon?: string;
  bgcolor: string;
  cardnum?: string;
  cardvalue: number;
};

for (let s in SUITS) {
  let suit = SUITS[s][0].toUpperCase();
  const bgcolor = suit === "S" || suit === "C" ? "black" : "red";
  for (let key in NUMB2) {
    // let cardValue = 9;
    // if (isNaN(n)) {
    //   cardValue = parseInt(n) + 1;
    // } else {
    //   cardValue = 10;
    // }
    let card: Card = {
      suit: suit,
      icon: SUITS[s],
      bgcolor: bgcolor,
      cardnum: key,
      cardvalue: parseInt(NUMB2[key]),
    };
    DECK.push(card);
  }
}

////////////////////////////////////////
// 3. SHUFFLE DECK

function shuffleDeck(deck: typeof DECK) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}

////////////////////////////////////////
// 4. START GAME

function Start() {
  shuffleDeck(DECK);
  console.log(DECK);
  newDeal();
}

////////////////////////////////////////
// 5. CLEAR TABLE

function clearTable(): void {
  PLAYERS_HAND = [];
  DEALERS_HAND = [];

  if ($chipStack) {
    $chipStack.innerHTML = balance.toString();
  }

  if ($dealerValue) {
    $dealerValue.innerHTML = "?";
  }

  if ($dealerHand) {
    $dealerHand.innerHTML = "";
  }

  if ($playerHand) {
    $playerHand.innerHTML = "";
  }

  if ($start) {
    $start.style.display = "none";
  }

  if ($decreaseBtn) {
    $decreaseBtn.style.display = "none";
  }

  if ($increaseBtn) {
    $increaseBtn.style.display = "none";
  }

  if ($hitBtn) {
    $hitBtn.style.display = "inline";
  }

  if ($standBtn) {
    $standBtn.style.display = "inline";
  }
}

////////////////////////////////////////
// 6. DEAL

function deal() {
  // Card count reshuffle
  for (let x = 0; x < 2; x++) {
    DEALERS_HAND.push(DECK[cardCount]);

    if ($dealerHand) {
      $dealerHand.innerHTML += cardOutput(cardCount, x);
    }

    if (x === 0) {
      if ($dealerHand) {
        $dealerHand.innerHTML +=
          '<div id="cover" class="card card__cover" style="left: 0px"></div>';
      }
    }

    reDeal();

    PLAYERS_HAND.push(DECK[cardCount]);

    if ($playerHand) {
      $playerHand.innerHTML += cardOutput(cardCount, x);
    }

    reDeal();
  }

  // End play if blackjack
  let playervalue = checkTotal(PLAYERS_HAND);
  if (playervalue === 21 && PLAYERS_HAND.length === 2) {
    endPlay();
  }
  console.log(PLAYERS_HAND);

  if ($playerValue) {
    $playerValue.innerHTML = playervalue.toString();
  }

  // Double: Check if value is 9, 10, or 11
  if (
    (checkTotal(PLAYERS_HAND) === 9 ||
      checkTotal(PLAYERS_HAND) === 10 ||
      checkTotal(PLAYERS_HAND) === 11) &&
    PLAYERS_HAND.length === 2
  ) {
    if ($doubleBtn) {
      $doubleBtn.style.display = "inline";
      console.log("Double-down?");
    }
  }
}

////////////////////////////////////////
// 7. NEW DEAL

function newDeal() {
  clearTable();

  if ($betStake && $chipStack && $message) {
    let betvalue = $betStake.innerHTML;
    balance = balance - parseInt(betvalue);
    $chipStack.innerHTML = balance.toString();
    $message.innerHTML = `Current bet is $${betvalue}`;
  }

  deal();
}

////////////////////////////////////////
// 8. RE-DEAL

function reDeal() {
  cardCount++;
  if (cardCount > 40 && $message) {
    console.log("New Deck");
    shuffleDeck(DECK);
    cardCount = 0;
    $message.innerHTML = "New Shuffle";
  }
}

////////////////////////////////////////
// 9. CARD OUTPUT

function cardOutput(n: number, x: number) {
  let hpos = x > 0 ? x * 60 + 0 : 0;

  if (DECK[n].icon) {
  }
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
// 10. CARD ACTION

function cardAction(a: any) {
  console.log(a);
  switch (a) {
    case "hit":
      takeCard();
      if ($doubleBtn) {
        $doubleBtn.style.display = "none";
      }
      break;

    case "hold":
      endPlay();
      break;

    case "double":
      if ($betStake) {
        let betvalue = parseInt($betStake.innerHTML);

        if (balance - betvalue < 0) {
          betvalue = betvalue + balance;
          balance = 0;
        } else {
          balance = balance - betvalue;
          betvalue = betvalue * 2;
        }

        if ($chipStack) {
          $chipStack.innerHTML = balance.toString();
        }

        if ($betStake) {
          $betStake.innerHTML = betvalue.toString();
        }
      }
      takeCard();
      endPlay();
      break;

    // case "split":
    //   splitCard();
    //   break;

    default:
      console.log("done");
      endPlay();
  }
}

////////////////////////////////////////
// 11. TAKE CARD

function takeCard() {
  PLAYERS_HAND.push(DECK[cardCount]);

  if ($playerHand) {
    $playerHand.innerHTML += cardOutput(cardCount, PLAYERS_HAND.length - 1);
  }

  reDeal();

  let rValu = checkTotal(PLAYERS_HAND);

  if ($playerValue) {
    $playerValue.innerHTML = rValu.toString();
  }

  if (rValu > 21) {
    if ($message) {
      $message.innerHTML = "Busted!";
    }
    endPlay();
  }
}

////////////////////////////////////////
// 12. END PLAY

function endPlay() {
  //   endplay = true;
  if ($cover) {
    $cover.style.display = "none";
  }

  if ($start) {
    $start.style.display = "inline";
  }

  if ($increaseBtn) {
    $increaseBtn.style.display = "inline";
  }

  if ($decreaseBtn) {
    $decreaseBtn.style.display = "inline";
  }

  if ($message) {
    $message.innerHTML = "Game Over<br>";
  }

  let payoutJack = 1;

  let dealervalue = checkTotal(DEALERS_HAND);

  if ($dealerValue) {
    $dealerValue.innerHTML = dealervalue.toString();
  }

  while (dealervalue < 17) {
    DEALERS_HAND.push(DECK[cardCount]);

    if ($dealerHand) {
      $dealerHand.innerHTML += cardOutput(cardCount, DEALERS_HAND.length - 1);
    }
    reDeal();
    dealervalue = checkTotal(DEALERS_HAND);

    if ($dealerValue) {
      $dealerValue.innerHTML = dealervalue.toString();
    }
  }

  // WHO wON?

  let playervalue = checkTotal(PLAYERS_HAND);
  if (playervalue === 21 && PLAYERS_HAND.length === 2) {
    if ($message) {
      $message.innerHTML = "Blackjack<br>";
    }
    payoutJack = 1.5;
  }

  if ($betStake && $message) {
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
  }

  if ($playerValue) {
    $playerValue.innerHTML = playervalue.toString();
  }

  if ($chipStack) {
    $chipStack.innerHTML = balance.toString();
  }
}

// 13. CHECK TOTAL

function checkTotal(arr: any): number {
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
  if ($betStake) {
    $betStake.innerHTML = (parseInt($betStake.innerHTML) + 5).toString();
  }
}

function decreaseBetSize() {
  if ($betStake) {
    $betStake.innerHTML = (parseInt($betStake.innerHTML) - 5).toString();
  }
}
