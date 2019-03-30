const cards = [];
let playerCard = [];
let dealerCard = [];
let cardCount = 0;

let mydollars = 1000;
const suits = ["spades", "hearts", "clubs", "diams"];
const numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const output = document.getElementById("output");
const dealerHolder = document.getElementById("dealerHolder");
const playerHolder = document.getElementById("playerHolder");

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
  document.getElementById("dollars").innerHTML = mydollars;
}

function dealNew() {
  playerCard = [];
  dealerCard = [];
  dealerHolder.innerHTML = "";
  playerHolder.innerHTML = "";
  for (x = 0; x < 2; x++) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x === 0) {
      dealerHolder.innerHTML += '<div id="cover" style="left: 100px"></div>';
    }
    cardCount++;
    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, x);
    cardCount++;
  }
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
