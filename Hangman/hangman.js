const wordList = ["CHAIR", "TABLE", "LAMP", "CLOCK", "PHONE", "PENCIL", "BOOK", "BOTTLE", "GLASS", 
  "PLATE", "SPOON", "FORK", "KNIFE", "COMPUTER", "LAPTOP", "DESK", "KEYBOARD", "MOUSE", "SCREEN", "PRINTER", "BACKPACK", "SUITCASE", 
  "WALLET", "UMBRELLA", "MIRROR", "BRUSH", "CANDLE", "SOFA", "BED", "PILLOW", "CURTAIN", "SHELF", "DOOR", "WINDOW", "PICTURE", 
  "BASKET","OVEN", "MICROWAVE", "RADIO","CAMERA", "BATTERY", "KEY", "SAFE", "SOAP", "SHAMPOO","TOOTHBRUSH","SCISSORS",
  "PAPER", "NOTEBOOK","ERASER", "CALCULATOR", "SHIRT", "PANTS", "SHOES", "JACKET", "WATCH","RING", "NECKLACE", "EARRINGS", "GLASSES",
  "SUNGLASSES","CLOTHES", "BUTTON",  "ALARM", "BELL","APPLE", "BANANA", "CHERRY", "GRAPE", "LEMON", "MANGO", "ORANGE", "PEACH", "PEAR", 
  "AVOCADO", "STRAWBERRY",  "WATERMELON", "KIWI", "PINEAPPLE","COCONUT", "CARROT", "POTATO", "TOMATO", "ONION","LETTUCE","PUMPKIN", "CHEESE",
  "COFFEE", "TEA", "CHOCOLATE", "MILK", "ICECREAM","WATER"];





let image = document.getElementById("man");
let images = ["MANI/MANI6.png", "MANI/MANI5.png", "MANI/MANI4.png", "MANI/MANI3.png", "MANI/MANI2.png", "MANI/MANI1.png", "MANI/MANI0.png", "LongMan/longMan7.png", "LongMan/longMAn6.png", "LongMan/longMan5.png", "LongMan/longMan4.png", "LongMan/longMan3.png", "LongMan/longMan2.png", "LongMan/longMan1.png","prisoner/prisoner7.png","prisoner/prisoner6.png","prisoner/prisoner5.png","prisoner/prisoner4.png","prisoner/prisoner3.png","prisoner/prisoner2.png","prisoner/prisoner1.png","girl/girl7.png","girl/girl6.png","girl/girl5.png","girl/girl4.png","girl/girl3.png","girl/girl2.png","girl/girl1.png"];

let gamesWon = 0;
let gW = document.getElementById("gamesWon");
let gamesLost = 0;
let gL = document.getElementById("gamesLost");

var hiddenword = "";
var nbErrors = 0;
var nbCorrect = 0;

var picNb = 0;
let gameMode = 1;
let previousMode = 1;

let m1 = document.getElementById("m1");
m1.addEventListener("click", newGame1);

let m2 = document.getElementById("m2");
m2.addEventListener("click", newGame2);

let m3 = document.getElementById("m3");
m3.addEventListener("click", newGame3);

let m4 = document.getElementById("m4");
m4.addEventListener("click", newGame4);

let newg = document.getElementById("newgame");
newg.addEventListener("click", newGame);



let theme = document.getElementById("themeBox");
theme.addEventListener("mouseenter",bloc);
let drop  = document.getElementById("dropdown");
drop.addEventListener("mouseleave",non);

let modes = document.getElementById("modes");

function bloc(){
 modes.style.display = "block";
}

function non(){
  modes.style.display = "none";
}



window.onload = setGame();

function newGame(){
  switch(gamesLost%4){
    case 0:
       newGame1();
       break;
    case 1:
      newGame2();
      break;
    case 2:
      newGame3();
      break;
    case 3:
      newGame4();
      break;
  }
 

}

function newGame1() {
  picNb = 0;
  gL.innerText = "Games Lost: " + gamesLost;
  previousMode = gameMode;
  gameMode = 1;
  setGame();
}

function newGame2() {
  picNb = 7;
  gL.innerText = "Games Lost: " + gamesLost;
  previousMode = gameMode;
  gameMode = 2;
  setGame();
}

function newGame3() {
  picNb = 14;
  gL.innerText = "Games Lost: " + gamesLost;
  previousMode = gameMode;
  gameMode = 3;
  setGame();
}

function newGame4() {
  picNb = 21;
  gL.innerText = "Games Lost: " + gamesLost;
  previousMode = gameMode;
  gameMode = 4;
  setGame();
}


function setGame() {

  nbErrors = 0;
  nbCorrect = 0;
  image.src = images[0 + picNb];



  changeClasses();

  createHiddenWord();

  createKeyboard();

  image.addEventListener("mouseenter", manSound)

}

function changeClasses() {
  let game = document.getElementById("game");
  game.classList.remove("g" +previousMode);
  game.classList.add("g" + gameMode);

  let o = document.getElementById("options");
  o.classList.remove("o" + previousMode);
  o.classList.add("o" + gameMode);

  let stats = document.getElementById("stats");
  stats.classList.remove("s" + previousMode);
  stats.classList.add("s" + gameMode);

  theme.classList.remove("o" + previousMode);
  theme.classList.add("o" + gameMode);
  theme.classList.remove("g" + previousMode);
  theme.classList.add("g" + gameMode);

  modes.classList.remove("kb"+previousMode);
  modes.classList.add("kb"+gameMode);
  
}


function createHiddenWord() {
  document.getElementById("word").innerHTML = "";

  let wIndex = parseInt((Math.random()) * (wordList.length));
  hiddenword = wordList[wIndex];
  console.log(hiddenword);

  for (let lindex = 1; lindex <= hiddenword.length; lindex++) {
    let letter = document.createElement("div");
    letter.classList.add("letter");
    letter.classList.remove("letter" + previousMode);
    letter.classList.add("letter" + gameMode);
    letter.id = "l" + lindex;
    document.getElementById("word").appendChild(letter);
  }
}



function createKeyboard() {
  let keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  for (let b = 65; b < 91; b++) {
    let button = document.createElement("button");
    button.textContent = String.fromCharCode(b);
    button.id = b;
    keyboard.appendChild(button);
    button.addEventListener('click', handleButtonClick);
    button.classList.remove("kb" + previousMode);
    button.classList.add("kb" + gameMode);
  }
}



let nbS = 0;
let sound1 = new Audio("sounds/disagree.wav");
let sound2 = new Audio("sounds/mhm.wav");
function manSound() {
  if (nbErrors > 0 && nbS % 2 == 0) {

    if (nbS % 4 == 0)
      sound1.play();
    else
      sound2.play();
  }
  nbS++;
}


function handleButtonClick(event) {

  var clickedCell = event.target;
  var letterClicked = clickedCell.innerText;

  if (hiddenword.includes(letterClicked)) {
   
    let s = new Audio("sounds/mhmm.wav");
    s.play();


    let letterIndex = 1;

    for (let char of hiddenword) {
      if (char == letterClicked) {
        document.getElementById("l" + letterIndex).innerText = letterClicked;
        nbCorrect++;
      }
      letterIndex++;
    }

    clickedCell.style.display = "none";

    if (nbCorrect == hiddenword.length) {
      for (let ind = 1; ind <= hiddenword.length; ind++) {
        document.getElementById("l" + ind).classList.remove("letter" + previousMode);
        document.getElementById("l" + ind).classList.add("correct");
        let winSound = new Audio("sounds/correct.mp3");
        winSound.play();
      }

      for (let b = 65; b < 91; b++) {
        let button = document.getElementById(b);
        button.style.display = "none";
      }

      gamesWon++;
      gW.innerText = "Games Won: " + gamesWon;
      setTimeout(winS,500);
      setTimeout(setGame, 1000);
    }
  }


  else if (!hiddenword.includes(letterClicked) && nbErrors < (6)) {
    nbErrors++;
    image.src = images[nbErrors + picNb];
    clickedCell.classList.remove("kb" + gameMode);
    clickedCell.classList.add("wrong");
    setTimeout(original, 500);
  }

  if (nbErrors == 6) {
    let ind = 1;
    for (let char of hiddenword) {
      document.getElementById("l" + ind).classList.remove("letter" + gameMode);
      document.getElementById("l" + ind).classList.add("wrong");
      document.getElementById("l" + ind).innerText = char;
      ind++;
    }

    for (let b = 65; b < 91; b++) {
      let button = document.getElementById(b);
      button.style.display = "none";
    }

    let angry = new Audio("sounds/angry.wav");
    angry.play();
    gamesLost++;
    gL.innerText = "Games Lost: " + gamesLost;
    setTimeout(setGame, 1000);
  }


}



function original() {
  for (let b = 65; b < 91; b++) {
    let button = document.getElementById(b);
    button.classList.remove("wrong");
    button.classList.add("kb" + gameMode)
  }
}

function winS(){
  let winS = new Audio("sounds/yay.wav");
  winS.play();
}