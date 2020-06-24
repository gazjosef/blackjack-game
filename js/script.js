// ARRAYS

const DECK = [];
let DEALERS_HAND = [];
let PLAYERS_HAND = [];

const SUITS = ['spades', 'hearts', 'clubs', 'diams'];
const NUMB = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// GAME STATUS

let cardCount = 0;
let mydollars = 1000;

// DOM ELEMENTS

const $message = document.getElementById('message');
const $dealerHolder = document.getElementById('dealerHolder');
const $dealerValue = document.getElementById('dValue');
const $playerHolder = document.getElementById('playerHolder');
const $playerValue = document.getElementById('pValue');
const $chipStack = document.getElementById('dollars');
const myBet = document.getElementById('mybet');
const playerBoxes = document.getElementById('playerBoxes');
const playingField = document.getElementById('playingField');
const myActions = document.getElementById('myactions');
// --- Buttons
const start = document.getElementById('start');
const selectBoxesBtn = document.getElementById('selectBoxes');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const doubleBtn = document.getElementById('btndouble');
// const splitBtn = document.getElementById('increase');

// BUILD DECK OF CARDS

for (let s in SUITS) {
  let suit = SUITS[s][0].toUpperCase();
  const bgcolor = suit === 'S' || suit === 'C' ? 'black' : 'red';
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

// START GAME

function Start() {
  shuffleDeck(DECK);
  newDeal();
}

// SHUFFLE DECK

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}

// NEW DEAL

function newDeal() {
  clearTable();

  // Display Bet Value
  let betvalue = myBet.value;
  mydollars = mydollars - betvalue;
  $chipStack.innerHTML = mydollars;
  $message.innerHTML = `Current bet is $${betvalue}`;

  // Hide myBet, startBtn, increaseBtn, & decreaseBtn
  myBet.disabled = true;
  start.style.display = 'none';
  decreaseBtn.style.display = 'none';
  increaseBtn.style.display = 'none';

  myActions.style.display = 'block';
  deal();
}

// CLEAR TABLE

function clearTable() {
  $dealerValue.innerHTML = '?';
  PLAYERS_HAND = [];
  DEALERS_HAND = [];
  $dealerHolder.innerHTML = '';
  $playerHolder.innerHTML = '';
  start.style.display = 'none';
  $chipStack.innerHTML = mydollars;
}

// DEAL

function deal() {
  // Card count reshuffle
  for (let x = 0; x < 2; x++) {
    DEALERS_HAND.push(DECK[cardCount]);
    $dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x === 0) {
      $dealerHolder.innerHTML += '<div id="cover" style="left: 100px"></div>';
    }
    reDeal();
    PLAYERS_HAND.push(DECK[cardCount]);
    $playerHolder.innerHTML += cardOutput(cardCount, x);
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
    doubleBtn.style.display = 'inline';
    console.log('Double-down?');
  }

  // // Split: Check for Pairs

  // if (PLAYERS_HAND[0].cardnum === PLAYERS_HAND[1].cardnum) {
  //   playerHolder2.innerHTML += cardOutput(cardCount - 1, 0);
  //   document.getElementById('btnsplit').style.display = 'inline';
  //   console.log('Split cards?');
  // }
}

// RE-DEAL

function reDeal() {
  cardCount++;
  if (cardCount > 40) {
    console.log('New Deck');
    shuffleDeck(DECK);
    cardCount = 0;
    $message.innerHTML = 'New Shuffle';
  }
}

// CARD OUTPUT

function cardOutput(n, x) {
  let hpos = x > 0 ? x * 60 + 100 : 100;
  return (
    '<div class="icard ' +
    DECK[n].icon +
    '" style="left:' +
    hpos +
    'px;">  <div class="top-card suit">' +
    DECK[n].cardnum +
    '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' +
    DECK[n].cardnum +
    '<br></div> </div>'
  );
}

// CARD ACTION

function cardAction(a) {
  console.log(a);
  switch (a) {
    case 'hit':
      takeCard(); // add new card to players hand
      document.getElementById('btndouble').style.display = 'none';
      break;
    case 'hold':
      endPlay(); //Playout and calculate
      break;
    case 'double':
      let betvalue = parseInt(myBet.value);
      if (mydollars - betvalue < 0) {
        betvalue = betvalue + mydollars;
        mydollars = 0;
      } else {
        mydollars = mydollars - betvalue;
        betvalue = betvalue * 2;
      }
      $chipStack.innerHTML = mydollars;
      myBet.value = betvalue;
      // double current bet, remove value from mydollars
      takeCard(); // add new card to players hand
      endPlay(); //Playout and calculate
      break;
    case 'split':
      splitCard(); //Split cards into two hands
      break;
    default:
      console.log('done');
      endPlay(); //Playout and calculate
  }
}

// TAKE CARD

function takeCard() {
  PLAYERS_HAND.push(DECK[cardCount]);
  $playerHolder.innerHTML += cardOutput(cardCount, PLAYERS_HAND.length - 1);
  reDeal();
  let rValu = checkTotal(PLAYERS_HAND);
  $playerValue.innerHTML = rValu;
  if (rValu > 21) {
    $message.innerHTML = 'Busted!';
    endPlay();
  }
}

// // SPLIT CARD

// function splitCard() {
//   playerHolder.innerHTML = cardOutput(cardCount - 3, 0);
//   document.getElementById('player1').style.display = 'block';
// }

// END PLAY

function endPlay() {
  endplay = true;
  document.getElementById('cover').style.display = 'none';
  myActions.style.display = 'none';
  start.style.display = 'inline';
  // document.getElementById("increase").style.display = "inline";
  // document.getElementById("decrease").style.display = "inline";
  myBet.disabled = false;
  $message.innerHTML = 'Game Over<br>';
  let payoutJack = 1;

  let dealervalue = checkTotal(DEALERS_HAND);
  $dealerValue.innerHTML = dealervalue;

  while (dealervalue < 17) {
    DEALERS_HAND.push(DECK[cardCount]);
    $dealerHolder.innerHTML += cardOutput(cardCount, DEALERS_HAND.length - 1);
    reDeal();
    dealervalue = checkTotal(DEALERS_HAND);
    $dealerValue.innerHTML = dealervalue;
  }

  // WHO wON?

  let playervalue = checkTotal(PLAYERS_HAND);
  if (playervalue === 21 && PLAYERS_HAND.length === 2) {
    $message.innerHTML = 'Blackjack<br>';
    payoutJack = 1.5;
  }

  let betvalue = parseInt(myBet.value) * payoutJack;

  // MESSAGE
  if (
    (playervalue < 22 && dealervalue < playervalue) ||
    (dealervalue > 21 && playervalue < 22)
  ) {
    $message.innerHTML +=
      '<span style="color: green;">You WIN! You won $' + betvalue + '</span>';
    mydollars = mydollars + betvalue * 2;
  } else if (playervalue > 21) {
    $message.innerHTML +=
      '<span style="color: red;">Dealer Wins! You lost $' +
      betvalue +
      '</span>';
  } else if (playervalue === dealervalue) {
    $message.innerHTML += '<span style="color: blue;">Push</span>';
    mydollars = mydollars + betvalue;
  } else {
    $message.innerHTML +=
      '<span style="color: red;">Dealer Wins! You lost $' +
      betvalue +
      '</span>';
  }
  $playerValue.innerHTML = playervalue;
  $chipStack.innerHTML = mydollars;
}

// CHECK TOTAL

function checkTotal(arr) {
  let rValue = 0;
  let aceAdjust = false;
  for (let i in arr) {
    if (arr[i].cardnum === 'A' && !aceAdjust) {
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

// function outputCard() {
//   output.innerHTML +=
//     "<span style='color:" +
//     DECK[cardCount].bgcolor +
//     "'>" +
//     DECK[cardCount].cardnum +
//     '&' +
//     DECK[cardCount].icon +
//     ';</span>  ';
// }

// Change Bet Size

function changeBetSize() {
  if (this.value < 0) {
    this.value = 0;
  }
  if (this.value > mydollars) {
    this.value = mydollars;
  }
  $message.innerHTML = 'Bet changed to $' + this.value;
}

// Select Player Boxes
function selectPlayerBoxes() {
  for (let i = 0; i < playerBoxes.value; i++) {
    let playerNumber = i + 1;
    player.innerHTML += `
      <div id="player${playerNumber}">
        <div class="textBox name">Box ${playerNumber}</div>
        <div id="pValue" class="textBox">&nbsp;</div>
        <div id="message" class="textBox result">&nbsp;</div>
        <div id="playerHolder" class="cardArea"></div>
      </div>
`;
  }
}

// Event Listeners

myBet.addEventListener('change', changeBetSize);
