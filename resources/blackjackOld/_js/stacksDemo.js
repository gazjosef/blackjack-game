// JavaScript Document
// Author: Gaz Hind
// Date: 05 September 2013

var deck, hand, discards;

window.onload = init;

function init() {

  deck     = new Stack();
  hand     = new Stack();
  discards = new Stack();

  deck.makeDeck(1);
  display();
}

function shuffle() {

  if (deck == null) return;

  deck.shuffle(1);
  display();
}

function deal() {

  var i;

  if (deck == null) return;

  if (deck.cardCount() < 7)
    alert("Not enough cards.");
  else {
    discard();
    for (i = 0; i < 7; i++)
      hand.addCard(deck.deal());
  }

  display();
}

function discard() {

  if (deck == null) return;

  discards.combine(hand);
  display();
}

function reset() {

  if (deck == null) return;

  discards.combine(hand);
  deck.combine(discards);
  display();
}

function display() {

  var s;

  s = ""
  for (i = 0; i < deck.cardCount(); i++)
    s += deck.cards[i] + "\n";
  document.forms[0].elements[0].value = s;

  s = "";
  for (i = 0; i < hand.cardCount(); i++)
    s += hand.cards[i] + "\n";
  document.forms[0].elements[1].value = s;

  s = "";
  for (i = 0; i < discards.cardCount(); i++)
    s += discards.cards[i] + "\n";
  document.forms[0].elements[2].value = s;
}