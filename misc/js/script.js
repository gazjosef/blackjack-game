// ARRAYS

const deck = [];
let dealersHand = [];
let playersHands = [];

const suits = [
  { suit: 'spades', color: 'black', unicode: '\u2660' },
  { suit: 'hearts', color: 'red', unicode: '\u2665' },
  { suit: 'clubs', color: 'black', unicode: '\u2663' },
  { suit: 'diams', color: 'red', unicode: '\u2666' },
];
const ranks = [
  { rank: 'A', value: 11, pattern: 'spotB4' },
  { rank: '2', value: 2, pattern: 'spotB1' },
  { rank: '3', value: 3, pattern: 'spotB1 spotB4' },
  { rank: '4', value: 4, pattern: 'spotA1' },
  { rank: '5', value: 5, pattern: 'spotA1 spotB4' },
  { rank: '6', value: 6, pattern: 'spotA1 spotA3' },
  { rank: '7', value: 7, pattern: 'spotA1 spotA3 spotB5' },
  { rank: '8', value: 8, pattern: 'spotA1 spotA3 spotB2' },
  { rank: '9', value: 9, pattern: 'spotA1 spotA2 spotB4 ' },
  { rank: '10', value: 10, pattern: 'spotA1 spotA2 spotB2' },
  { rank: 'J', value: 10, pattern: 'spotJack' },
  { rank: 'Q', value: 10, pattern: 'spotQueen' },
  { rank: 'K', value: 10, pattern: 'spotKing' },
];

// GAME STATUS

let cardCount = 0;
let mydollars = 1000;

const selectBoxesBtn = document.getElementById('selectBoxes');

// BUILD DECK OF CARDS

for (let suit in suits) {
  for (let rank in ranks) {
    let card = { ...suits[suit], ...ranks[rank] };
    deck.push(card);
  }
}

// START GAME

function Start() {
  shuffleDeck(deck);
  newDeal();
  start.style.display = 'none';
  chipStack.innerHTML = mydollars;
}

// SHUFFLE DECK

function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// SELECT PLAYER BOXES

// Select Player Boxes
function selectPlayerBoxes() {
  // shuffleDeck(deck);

  for (let i = 0; i < playerBoxes.value; i++) {
    let boxNumber = i + 1;
    let box = {
      box: `box${boxNumber}`,
      cards: [],
      total: 0,
    };
    player.innerHTML += `
      <div id="player${boxNumber}">
        <div class="textBox name">Box ${boxNumber}</div>
        <div id="pValue${boxNumber}" class="textBox">&nbsp;</div>
        <div id="pMessage${boxNumber}" class="textBox result">&nbsp;</div>
        <div id="pHolder${boxNumber}" class="cardArea"></div>
      </div>
    `;
    playersHands.push(box);
  }
  deal2();
}

// NEW DEAL

function newDeal() {
  clearTable();
  let betvalue = myBet.value;
  mydollars = mydollars - betvalue;

  chipStack.innerHTML = mydollars;
  myActions.style.display = 'block';
  message.innerHTML = 'Current bet is $' + betvalue;
  myBet.disabled = true;
  deal();
  start.style.display = 'none';
  decreaseBtn.style.display = 'none';
  increaseBtn.style.display = 'none';
}

// Clear Blackjack Table
function clearTable() {
  dealerValue.innerHTML = '?';
  playerHand = [];
  dealerHand = [];
  dealerHolder.innerHTML = '';
  playerHolder.innerHTML = '';
}

// Deal

function deal() {
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
}

// New Deal

function deal2() {
  shuffleDeck(deck);

  for (let x = 0; x < 2; x++) {
    dealersHand.push(deck[0]);
    dealerHolder.innerHTML += deck[0].rank + deck[0].unicode;

    deck.splice(0, 1);
    for (let i = 0; i < playersHands.length; i++) {
      playersHands[i].cards.push(deck[0]);
      playersHands[i].cards.forEach((card) => {
        console.log(card.value);
      });
      let boxNumber = i + 1;
      let pValue = `pHolder${boxNumber}`;
      let pValueEl = document.getElementById(pValue);
      // pValueEl.innerHTML += parseInt(deck[0].value);

      let pHolder = `pHolder${boxNumber}`;
      let pHolderEl = document.getElementById(pHolder);
      pHolderEl.innerHTML += deck[0].rank + deck[0].unicode;

      deck.splice(0, 1);
    }
  }
  console.log(dealersHand);
  console.log(playersHands);
  console.log(deck);
}

// CARD OUTPUT

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
    '<br></div> </div>'
  );
}
