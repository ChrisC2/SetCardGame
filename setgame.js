//Card Constructor
var Card = function (color, shape, shading, number) {
    this.color = color;
    this.shape = shape;
    this.shading = shading;
    this.number = number;
}

//Creates a deck of 81 cards where each card is unique
var deck = [];
var createDeck = function () {
    var color = ["red", "green", "purple"];
    var shape = ["diamond", "squiggle", "oval"];
    var shading = ["solid", "empty", "striped"];
    var number = ["one", "two", "three"];
    for(var c = 0; c < color.length; c++) {
        for(var s = 0; s < shape.length; s++) {
            for(var shade = 0; shade < shading.length; shade++) {
                for(var n = 0; n < number.length; n++) {
                    deck.push(new Card(color[c], shape[s], shading[shade], number[n]));
                }
            }
        }
    }
    return deck;
}

//Takes 3 cards to determine if they are a "Set"
var setCheck = function (card1, card2, card3) {
    if(card1.color === card2.color && card2.color === card3.color &&
        card1.shape !== card2.shape && card2.shape !== card3.shape && card1.shape !== card3.shape &&
        card1.shading !== card2.shading && card2.shading !== card3.shading && card1.shading !== card3.shading &&
        card1.number !== card2.number && card2.number !== card3.number && card1.number !== card3.number) {
        return true;
    }
    else if(card1.shape === card2.shape && card2.shape === card3.shape &&
        card1.color !== card2.color && card2.color !== card3.color && card1.color !== card3.color &&
        card1.shading !== card2.shading && card2.shading !== card3.shading && card1.shading !== card3.shading &&
        card1.number !== card2.number && card2.number !== card3.number && card1.number !== card3.number) {
        return true;
    }
    else if(card1.shading === card2.shading && card2.shading === card3.shading &&
        card1.color !== card2.color && card2.color !== card3.color && card1.color !== card3.color &&
        card1.shape !== card2.shape && card2.shape !== card3.shape && card1.shape !== card3.shape &&
        card1.number !== card2.number && card2.number !== card3.number && card1.number !== card3.number){
        return true;
    }
    else if(card1.number === card2.number && card2.number === card3.number &&
        card1.color !== card2.color && card2.color !== card3.color && card1.color !== card3.color &&
        card1.shape !== card2.shape && card2.shape !== card3.shape && card1.shape !== card3.shape &&
        card1.shading !== card2.shading && card2.shading !== card3.shading && card1.shading !== card3.shading){
        return true;
    }
    return false;
}

//Shuffle's the deck to ensure each card is randomly placed
var shuffleDeck = function () {
    for(var i = 0; i < deck.length; i++) {
        var indexToSwap = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[indexToSwap];
        deck[indexToSwap] = temp;
    }
    return deck;
}

//Adds a given number of cards to the board via the deck
var board = [];
var addNCards = function(number) {
    if(deck.length === 0) {
        return;
    }
    var lastIndex = deck.length - 1;
    for(var i = lastIndex; i > lastIndex - number; i--) {
        var card = deck.pop();
        board.push(card);
    }
    return board;
}

//Removes each "Set" from the board
var removeSets = function (cards){
    cards.sort(function(a,b) {
       return b - a;
   })
   for(var i = 0; i < cards.length; i++) {
       board.splice(cards[i], 1)
   }
}


//Stores total Sets for the game
var totalSets = [];

//Finds non-duplicate combinations of cards on the board to determine if they are a "Set"
//Removes "Set" from board when found and adds 3 replacement cards from deck
var findSets = function () {
    var results = [];
    for(var card1 = 0; card1 < board.length; card1++) {
        for(var card2 = card1 + 1; card2 < board.length; card2++ ) {
            for(var card3 = card2 + 1; card3 < board.length; card3++) {
                if(setCheck(board[card1], board[card2], board[card3])) {
                    totalSets.push([board[card1], board[card2], board[card3]]);
                    results.push([board[card1], board[card2], board[card3]]);
                    removeSets([card1, card2, card3]);
                    addNCards(3);
                }
            }
        }
    }
    if(results.length === 0) {
      addNCards(3);
    }
    return results;
}

//Plays entire Set Game through until no Sets remain & deck is exhausted
//Returns all Game Sets
var setGame = function() {
    createDeck();
    shuffleDeck();
    addNCards(12);
    while(deck.length > 0) {
      if(deck.length === 0 && findSets() === []) {
          return;
      }
      findSets();
  }
    return totalSets;
}

setGame();
