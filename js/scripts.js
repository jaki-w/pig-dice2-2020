//Game Constructor & Prototypes
function Game() {
  this.players = [];
  this.switch = 1;//<-- This will be used to find player id (switch will change after roll and then you can match it to player id)
  this.currentId = 0;//<-- This is will be used to assign player id
}

Game.prototype.assignId = function() {
  this.currentId += 1;//<-- This will update game current id
  return this.currentId;
}

Game.prototype.addPlayer = function(player) {
  player.id = this.assignId();//<--This will assign unique player id
  this.players.push(player);//<--This will add player to game object
}

Game.prototype.lookupPlayer = function(id) {
  for (let i = 0; i < this.players.length; i++) { //<--This will loop through players in game
    if (this.players[i]) { //<--This will ensure there are players 
      if (this.players[i].id == id) { //<-- This will check if player's id matches parameter(id)
        return this.players[i]; //<-- This will return mathcing player id
      }
    }
  };
  return false; //<--This will return false if no matching id is found
}

//Player Constructor & Prototypes

function Player(turnTotal, score) {
  this.turnTotal = 0;
  this.score = 0;
}

//User Interface Logic

Player.prototype.diceRoll = function() {
  let diceRoll = generateRandomNumber();
  if (diceRoll === 1) {
    this.turnTotal = 0; //<-- This will update player's key(turnTotal) value
    this.score += 0; //<-- This will update players key(score) value
    $("#turnScore").text(" ");
    $("#currentScore").text(" ");
    hold(this.id); 
    alert("You rolled a one :( Next player's turn!");
  } else {
    this.turnTotal += diceRoll; //<--This will update player's key(turnTotal) value
    $("#turnScore").text(this.turnTotal);
    $("#currentScore").text(this.score);
  }
}
//Factory Functions
function generateRandomNumber() {
  let randomNumber = Math.floor((Math.random() * 6) + 1);
  $("#rollValue").text(randomNumber);
  return randomNumber;
}

let game = new Game();//<--This is global object

function hold(id) {   
  let currentPlayer = game.lookupPlayer(game.switch); //<--This will link player id
  console.log(currentPlayer);
  currentPlayer.score += currentPlayer.turnTotal; //<--This will update players key(score)
  currentPlayer.turnTotal = 0; //<--This will reset player's key(turnTotal)
  if (currentPlayer.score >= 100) {
    $(".showLater").hide();
    $("#rules").show();
    alert("Player " + game.switch + " wins!");
   
  } else if (game.switch == 1) {
    $("#player1Score").text(currentPlayer.score);
    $("#turnScore").text(" ");
    $("#currentScore").text(" ");
    game.switch = 2; //<--This will change game switch to 2 if it is currently at 1
  } else if (game.switch == 2) {
    $("#player2Score").text(currentPlayer.score);
    $("#turnScore").text(" ");
    $("#currentScore").text(" ");
    game.switch = 1; //<--This will change game switch to 1 if it is currently at 2
  }
  console.log(currentPlayer);
  return(currentPlayer.score);
}

$(document).ready(function() {
  $("#newGame").click(function() {
    const player1 = new Player();
    const player2 = new Player();
    game.addPlayer(player1);
    game.addPlayer(player2);
    $("#rules").hide();
    $(".showLater").show();
  
  $(".roll").click(function(event) {
    let currentPlayer = game.lookupPlayer(game.switch);
    console.log(currentPlayer);
    currentPlayer.diceRoll();
    // console.log(player1.turnTotal);
    // console.log(player1.score);

  $(".hold").click(function(event) {
    let currentPlayer = game.lookupPlayer(game.switch);
    hold(currentPlayer);
  })
  });
  });
});