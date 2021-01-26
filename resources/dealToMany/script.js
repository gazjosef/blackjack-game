deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
players = 3
player1 = []
player2 = []
player3 = []
arrayLength = ((players * 3) + 1)

// deck.forEach((element, index) => {
//     console.log(element);
//     deck.splice(index, 2)
//     player1.push(element)
//     player2.push(element + 1)
//     player3.push(element + 2)
//     console.log(deck);
//     console.log(player1);
//     console.log(player2);
//     console.log(player3);
// });

for(var i = 0; i < arrayLength; i++) {
    player1.push(deck[i])
    console.log(player1);

    // player2.push(deck[i + 1])
    // console.log(player2);
    // player3.push(deck[i] + 2)
    // console.log(player3);
    // deck.splice(i, players)
    i--;
}