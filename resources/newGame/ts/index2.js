import { buildDeck, shuffleDeck } from "./Deck.js";
import {
  $start,
  $chipStack,
  $dealerHand,
  $dealerText,
  $playerHand,
  $playerText,
  $betStake,
  $hitBtn,
  $standBtn,
  $doubleBtn,
  clearTable,
  hideStartButtons,
  showStartButtons,
  showInGameButtons,
} from "./Table.js";

let DECK;
let DEALERS_HAND = [];
let PLAYERS_HAND = [];

let cardCount = 0;
let balance = 1000;

const $cover = document.getElementById("cover");
const $message = document.getElementById("message");

////////////////////////////////////////
// * Start
////////////////////////////////////////

function Start() {
  DECK = buildDeck();
  shuffleDeck(DECK);
  clearTable(balance);
  hideStartButtons();
  PLAYERS_HAND = [];
  DEALERS_HAND = [];
  showInGameButtons();
}

if ($start) {
  $start.addEventListener("click", (event) => {
    event.preventDefault();
    Start();
    Deal();
  });
}

////////////////////////////////////////
// * Deal
////////////////////////////////////////

function Deal() {
  for (let x = 0; x < 2; x++) {
    // Dealer's Hand
    if ($dealerHand) {
      dealerTakesCard(cardCount, x);
    }
    cardCount++;
    // -- Hide First Dealer's Card
    if (x === 0) {
      if ($dealerHand) {
        $dealerHand.innerHTML +=
          '<div id="cover" class="card card__cover" style="left: 0px"></div>';
      }
    }

    // Player's Hand
    if ($playerHand) {
      playersTakesCard(cardCount, x);
    }
    cardCount++;

    // Check for low Deck
    if (cardCount > 40 && $message) {
      console.log("New Deck");
      shuffleDeck(DECK);
      cardCount = 0;
      $message.innerHTML = "New Shuffle";
    }
  }

  console.log("DEALERS_HAND", DEALERS_HAND);
  // End play if blackjack

  if (checkTotal(PLAYERS_HAND) === 21 && PLAYERS_HAND.length === 2) {
    endPlay();
  }

  displayHandValue($playerText, PLAYERS_HAND);

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

function newDeal() {
  clearTable(balance);
  PLAYERS_HAND = [];
  DEALERS_HAND = [];

  if ($betStake && $chipStack && $message) {
    let betvalue = $betStake.innerHTML;
    balance = balance - parseInt(betvalue);
    $chipStack.innerHTML = balance.toString();
    $message.innerHTML = `Current bet is $${betvalue}`;
  }

  Deal();
}

function reDeal() {
  cardCount++;
  if (cardCount > 40 && $message) {
    console.log("New Deck");
    shuffleDeck(DECK);
    cardCount = 0;
    $message.innerHTML = "New Shuffle";
  }
}

function dealerTakesCard(cardCount, x) {
  DEALERS_HAND.push(DECK[cardCount]);
  $dealerHand.innerHTML += cardOutput(cardCount, x);
}

function playersTakesCard(cardCount, x) {
  PLAYERS_HAND.push(DECK[cardCount]);
  $playerHand.innerHTML += cardOutput(cardCount, x);
}

////////////////////////////////////////
// * Display Cards
////////////////////////////////////////

function cardOutput(cardCount, iteration) {
  console.log("iteration", iteration);
  let hpos = iteration > 0 ? iteration * 60 + 0 : 0;
  if (DECK[cardCount].icon) {
  }
  return `<div class="card ${DECK[cardCount].icon}" style="left: ${hpos}px;">
    <div class="card__top">
      <div class="card__corner suit">
      ${DECK[cardCount].cardnum}
      </div>
    </div>
    <div class="card__content suit"></div>
    <div class="card__bottom">
      <div class="card__corner suit">
      ${DECK[cardCount].cardnum}
      </div>
    </div>
  </div>`;
}

function displayHandValue(textElement, hand) {
  if (textElement) {
    textElement.innerHTML = checkTotal(hand).toString();
  }
}

////////////////////////////////////////
// * Actions
////////////////////////////////////////

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

function cardAction(a) {
  console.log(a);
  switch (a) {
    case "hit":
      hit();
      if ($doubleBtn) {
        $doubleBtn.style.display = "none";
      }
      break;
    case "stand":
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
      hit();
      endPlay();
      break;

    default:
      console.log("done");
      endPlay();
  }
}

function hit() {
  playersTakesCard(cardCount, PLAYERS_HAND.length - 1);
  reDeal();

  displayHandValue($playerText, PLAYERS_HAND);

  if (checkTotal(PLAYERS_HAND) > 21) {
    if ($message) {
      $message.innerHTML = "Busted!";
    }
    endPlay();
  }
}

////////////////////////////////////////
// * End Play
////////////////////////////////////////

function endPlay() {
  //   endplay = true;
  if ($cover) {
    $cover.style.display = "none";
    console.log("cover");
  }
  showStartButtons();

  if ($message) {
    $message.innerHTML = "Game Over<br>";
  }

  let dealerValue = checkTotal(DEALERS_HAND);

  //   if ($dealerText) {
  //     $dealerText.innerHTML = dealerValue.toString();
  //   }
  displayHandValue($dealerText, DEALERS_HAND);

  // Dealer's Turn
  while (dealerValue < 17) {
    if ($dealerHand) {
      dealerTakesCard(cardCount, DEALERS_HAND.length - 1);
    }

    reDeal();

    dealerValue = checkTotal(DEALERS_HAND);
    if ($dealerText) {
      $dealerText.innerHTML = dealerValue.toString();
    }
  }

  checkResult();

  if ($playerText) {
    $playerText.innerHTML = checkTotal(PLAYERS_HAND).toString();
  }
  if ($chipStack) {
    $chipStack.innerHTML = balance.toString();
  }
}

function checkResult() {
  // WHO wON?
  let payoutJack = 1;
  let playerValue = checkTotal(PLAYERS_HAND);
  let dealerValue = checkTotal(DEALERS_HAND);

  //   BlackJack Win
  if (playerValue === 21 && PLAYERS_HAND.length === 2) {
    if ($message) {
      $message.innerHTML = "Blackjack<br>";
    }
    payoutJack = 1.5;
  }

  if ($betStake && $message) {
    let betValue = parseInt($betStake.innerHTML) * payoutJack;
    // MESSAGE
    if (
      (playerValue < 22 && dealerValue < playerValue) ||
      (dealerValue > 21 && playerValue < 22)
    ) {
      $message.innerHTML += `You WIN! You won $${betValue}`;
      balance = balance + betValue * 2;
    } else if (playerValue > 21) {
      $message.innerHTML += `Dealer Wins! You lost $${betValue}`;
    } else if (playerValue === dealerValue) {
      $message.innerHTML += `Push`;
      balance = balance + betValue;
    } else {
      $message.innerHTML += `Dealer Wins! You lost $${betValue}`;
    }
  }
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
