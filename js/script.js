// Arrays
const cards = [];
let playerCard = [];
let dealerCard = [];
const suits = ["spades", "hearts", "clubs", "diams"];
const numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Game Status
let cardCount = 0;
let mydollars = 1000;
let endplay = false;

// Dom Elements
const message = document.getElementById("message");
const output = document.getElementById("output");
const dealerHolder = document.getElementById("dealerHolder");
const playerHolder = document.getElementById("playerHolder");
const pValue = document.getElementById("pValue");
const dValue = document.getElementById("dValue");
const dollarValue = document.getElementById("dollars");

// Event listeners
document.getElementById("mybet").onchange = function() {
  if (this.value < 0) {
    this.value = 0;
  }
  if (this.value > mydollars) {
    this.value = mydollars;
  }
  message.innerHTML = "Bet changed to $" + this.value;
};

// Build deck of cards
for (s in suits) {
  let suit = suits[s][0].toUpperCase();
  const bgcolor = suit == "S" || suit == "C" ? "black" : "red";
  for (n in numb) {
    //output.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
    const cardValue = n > 9 ? 10 : parseInt(n) + 1;
    let card = {
      suit: suit,
      icon: suits[s],
      bgcolor: bgcolor,
      cardnum: numb[n],
      cardvalue: cardValue
    };
    cards.push(card);
  }
}

function Start() {
  shuffleDeck(cards);
  dealNew();
  document.getElementById("start").style.display = "none";
  dollarValue.innerHTML = mydollars;
}

function dealNew() {
  dValue.innerHTML = "?";
  playerCard = [];
  dealerCard = [];
  dealerHolder.innerHTML = "";
  playerHolder.innerHTML = "";

  const betvalue = document.getElementById("mybet").value;
  mydollars = mydollars - betvalue;
  document.getElementById("dollars").innerHTML = mydollars;
  document.getElementById("myactions").style.display = "block";
  message.innerHTML =
    "Get up to 21 and beat the dealer to win.<br>Current bet is $" + betvalue;
  document.getElementById("mybet").disabled = true;
  document.getElementById("maxbet").disabled = true;
  deal();
  document.getElementById("btndeal").style.display = "none";
}

function redeal() {
  cardCount++;
  if (cardCount > 40) {
    console.log("New Deck");
    shuffleDeck(cards);
    cardCount = 0;
    message.innerHTML = "New Shuffle";
  }
}

function deal() {
  console.log(cards);

  // Card count reshuffle
  for (x = 0; x < 2; x++) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x === 0) {
      dealerHolder.innerHTML += '<div id="cover" style="left: 100px"></div>';
    }
    redeal();
    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, x);
    redeal();
  }

  // End play if blackjack
  let playervalue = checktotal(playerCard);
  if (playervalue == 21 && playerCard.length == 2) {
    playend();
  }
  pValue.innerHTML = playervalue;
  console.log(dealerCard);
  console.log(playerCard);
}

function cardOutput(n, x) {
  let hpos = x > 0 ? x * 60 + 100 : 100;
  return (
    '<div class="icard ' +
    cards[n].icon +
    '" style="left:' +
    hpos +
    'px;">  <div class="top-card suit">' +
    cards[n].cardnum +
    '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' +
    cards[n].cardnum +
    "<br></div> </div>"
  );
}

function maxbet() {
  document.getElementById("mybet").value = mydollars;
  message.innerHTML = "Bet changed to $" + mydollars;
}

function cardAction(a) {
  console.log(a);
  switch (a) {
    case "hit":
      playucard(); // add new card to players hand
      break;
    case "hold":
      playend(); //Playout and calculate
      break;
    case "double":
      let betvalue = parseInt(document.getElementById("mybet").value);
      if (mydollars - betvalue < 0) {
        betvalue = betvalue + mydollars;
        mydollars = 0;
      } else {
        mydollars = mydollars - betvalue;
        betvalue = betvalue * 2;
      }
      document.getElementById("dollars").innerHTML = mydollars;
      document.getElementById("mybet").value = betvalue;
      // double current bet, remove value from mydollars
      playucard(); // add new card to players hand
      playend(); //Playout and calculate
      break;
    case "split":
      splitCard(); //Split cards into two hands
      break;
    default:
      console.log("done");
      playend(); //Playout and calculate
  }
}

function playucard() {
  playerCard.push(cards[cardCount]);
  playerHolder.innerHTML += cardOutput(cardCount, playerCard.length - 1);
  redeal();
  let rValu = checktotal(playerCard);
  pValue.innerHTML = rValu;
  if (rValu > 21) {
    message.innerHTML = "Busted!";
    playend();
  }
}

function playend() {
  endplay = true;
  document.getElementById("cover").style.display = "none";
  document.getElementById("myactions").style.display = "none";
  document.getElementById("btndeal").style.display = "block";
  document.getElementById("mybet").disabled = false;
  document.getElementById("maxbet").disabled = false;
  message.innerHTML = "Game Over<br>";
  let payoutJack = 1;

  let dealervalue = checktotal(dealerCard);
  dValue.innerHTML = dealervalue;

  while (dealervalue < 17) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, dealerCard.length - 1);
    redeal();
    dealervalue = checktotal(dealerCard);
    dValue.innerHTML = dealervalue;
  }

  // Who won?
  let playervalue = checktotal(playerCard);
  if (playervalue == 21 && playerCard.length == 2) {
    message.innerHTML = "Player Blackjack";
    payoutJack = 1.5;
  }

  let betvalue = parseInt(document.getElementById("mybet").value) * payoutJack;

  if (
    (playervalue < 22 && playervalue > dealervalue) ||
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
  } else if (playervalue == dealervalue) {
    message.innerHTML += '<span style="color: blue;">Push</span>';
    mydollars = mydollars + betvalue;
  } else {
    message.innerHTML +=
      '<span style="color: red;">Dealer Wins! You lost $' +
      betvalue +
      "</span>";
    pValue.innerHTML = playervalue;
    dollarValue.innerHTML = mydollars;
  }
}

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

function shuffleDeck(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function outputCard() {
  output.innerHTML +=
    "<span style='color:" +
    cards[cardCount].bgcolor +
    "'>" +
    cards[cardCount].cardnum +
    "&" +
    cards[cardCount].icon +
    ";</span>  ";
}
