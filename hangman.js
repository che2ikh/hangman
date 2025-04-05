

const categoriesList = ["HOUSE", "SCHOOL", "TECHNOLOGY", "FOOD", "CLOTHES", "ANIMALS"];


let levelOfTheGame = "";      //variable has the level of the game (hard,medium,easy)


let indexCategory = 2;        //the index of category in array category list (choosed in start page with default value 2)


let catArray = [];            //array has all word in the choosed category


let catName;






let wIndex;


let hintSentence;


let categoryChoosed = document.getElementById("category"); // div has category in the start page


let btlButton = document.getElementById("btl");            //left button to change category


let btrButton = document.getElementById("btr");           //right button to change category


let clickSound = new Audio('sounds/click-sound.mp3'); //click sound


let timerSound = new Audio('sounds/timerSound.mp3');  // timer sounds (3 sec)


let easyButton = document.getElementById("easyB");   // the button of level easy


let mediumButton = document.getElementById("mediumB");  // the button of level medium


let hardButton = document.getElementById("hardB");  // the button of level hard


let arrayOfButtons = [easyButton, mediumButton, hardButton];  //array of button easy/medium/hard


let streakNumber = 0;
let streak;
let clickedHint = false;


let littleLine = document.getElementById("lineOfTotalGames");




let enableSound = "true";


let soundIcon = document.getElementById("soundIcon");


let score;//edit9
let player = document.getElementById("player");
let arrayOfScores;
let arrayOfPlayers;


if (document.URL.indexOf("start") > 0)
  soundIcon.src = "onSound.png";




function editSound() {




  if (enableSound == "true") {


    enableSound = "false";


    document.getElementById("soundIcon").src = "offSound.png";
  } else {
    if (enableSound == "true")
      clickSound.play();


    enableSound = "true";


    document.getElementById("soundIcon").src = "onSound.png";
  }
  localStorage.setItem("soundIsEnable", enableSound);
}










let wordNb = 0;


btlButton.addEventListener("click", leftArrowf);
btrButton.addEventListener("click", rightArrowf);


document.addEventListener("keydown", function (EV) {
  if (EV.key === "ArrowRight") rightArrowf();
  if (EV.key === "ArrowLeft") leftArrowf();
});


easyButton.addEventListener("click", changeButton);
mediumButton.addEventListener("click", changeButton);
hardButton.addEventListener("click", changeButton);


function leftArrowf() {                       //function change category to the next in the right
  if (document.URL.indexOf("startPage") > -1) {


    if (indexCategory > 0)
      indexCategory--;
    else
      indexCategory = categoriesList.length - 1;


    setCategoryS();
    if (enableSound == "true")
      clickSound.play();
  }
}
function rightArrowf() {                      //function change category to the next in the right
  if (document.URL.indexOf("startPage") > -1) {


    if (indexCategory < categoriesList.length - 1)
      indexCategory++;
    else
      indexCategory = 0;


    setCategoryS();
    if (enableSound == "true")
      clickSound.play();
  }
}


function setCategoryS() {                   //function to set show us the name of the category in the start page
  //and  store in Storage the index of the choosed category


  categoryChoosed.innerText = categoriesList[indexCategory];


  localStorage.setItem("indxCat", indexCategory);
}






function changeButton(bckick) {  // function to choose button of level and change the class if there is one choosed before
  // and change the class if i want to unselect
  //and store the level in Storage


  settingIsClicked = localStorage.getItem("isSettingClicked")


  if (enableSound == "true" && settingIsClicked == "false")
    clickSound.play();


  let buttonClickedLevel = bckick.target;


  if (buttonClickedLevel.classList.contains("thisButton")) {




    document.getElementById("strtButton").classList.add("disabledStart");
    document.getElementById("strtButton").classList.remove("workStart");


    buttonClickedLevel.classList.remove("thisButton");
    levelOfTheGame = "";
    localStorage.removeItem("levelStored", levelOfTheGame);
  }
  else {
    buttonClickedLevel.classList.add("thisButton");


    if (player.value != "")//edit9
    {
      document.getElementById("strtButton").classList.remove("disabledStart");
      document.getElementById("strtButton").classList.add("workStart");
    }


    levelOfTheGame = buttonClickedLevel.value;
    localStorage.setItem("levelStored", levelOfTheGame);


    for (let i = 0; i < 3; i++) {
      if (arrayOfButtons[i] != buttonClickedLevel)
        arrayOfButtons[i].classList.remove("thisButton");
    }
  }


}


function startGame() {    //function to start


  if (levelOfTheGame != "" && player.value != "") {
    if (enableSound == "true")
      clickSound.play();


    localStorage.setItem("playerName", player.value);


    var millisecondsToWait = 100;
    setTimeout(function () {
      document.getElementById("linkToStart").click();
    }, millisecondsToWait);
  }
}


function reStart() {   //function to go to Setting
  settingIsClicked = true;
  localStorage.setItem("isSettingClicked", settingIsClicked);
  document.getElementById("linkToReStart").click();


}


const wordList = {
  HOUSE: ["SPOON", "MIRROR", "KEY", "BELL", "SOFA", "BED", "DOOR", "CHAIR", "FAN", "ROOM",
    "CLOCK", "GLASS", "PLATE", "BRUSH", "FORK", "KNIFE", "SOAP", "TABLE", "OVEN", "CANDLE",
    "PICTURE", "SHAMPOO", "TOOTHBRUSH", "LAMP", "PILLOW", "MICROWAVE", "CURTAIN", "SHELF", "WINDOW", "AIRCONDITIONER"],//30


  SCHOOL: ["PENCIL", "PAPER", "ERASER", "BOOK", "TEACHER", "BACKPACK", "DESK", "RULER", "BOARD", "AGENDA",
    "CALCULATOR", "NOTEBOOK", "POPQUIZ", "UNIFORM", "PLAYGROUND", "PEN", "EXAM", "LAB", "SHARPENER", "BAG",
    "SUPERVISOR", "COURSES", "BOOKS", "LESSONS", "GRADES", "ALPHABET", "RECESS", "MATHEMATICS", "LIBRARY", "HOMEWORK"],//30


  TECHNOLOGY: ["MOUSE", "LAPTOP", "KEYBOARD", "COMPUTER", "PHONE", "SCREEN", "PRINTER", "RADIO", "CAMERA", "INTERNET",
    "WEBSITE", "CHARGER", "ROUTER", "MOTHERBOARD", "APPLICATION", "TELEVISION", "MACHINE", "BATTERY", "HEADPHONE", "SPEAKER",
    "EMAIL", "MICROPHONE", "TABLET", "ROBOT", "BROWSER", "SMARTWATCH", "VIRUS", "SENSOR", "HACKER", "PROGRAMMER"],//30


  FOOD: ["ORANGE", "CHEESE", "BANANA", "TEA", "GRAPE", "POTATO", "WATERMELON", "TOMATO", "APPLE", "MANGO",
    "PEAR", "BROCCOLI", "WATER", "PEACH", "MILK", "LEMON", "COFFEE", "LETTUCE", "CHERRY", "CARROT",
    "CHOCOLATE", "ICECREAM", "STRAWBERRY", "COCONUT", "ONION", "AVOCADO", "PINEAPPLE", "KIWI", "POMEGRANATE", "ASPARAGUS"],//30


  CLOTHES: ["SUNGLASSES", "HAT", "BOOTS", "COAT", "DRESS", "SOCKS", "PANTS", "SHOES", "GLASSES", "SHIRT",
    "RING", "SANDALS", "JACKET", "EARRINGS", "WATCH", "NECKLACE", "PAJAMA", "BRACELET", "GLOVES", "SCARF",
    "BELT", "SWEATER", "HOODIE", "FASHION", "JEANS", "SUIT", "JEWELRY", "VEST", "WARDROBE", "BUTTON"],


  ANIMALS: ["CAT", "DOG", "COW", "HORSE", "LION", "BEAR", "FROG", "ELEPHANT", "GIRAFFE", "TIGER",
    "WOLF", "TURTLE", "CAMEL", "OCTOPUS", "EAGLE", "KOALA", "DINOSAUR", "SLOTH", "DOLPHIN", "HAMSTER",
    "HEDGEHOG", "PARROT", "BAT", "SQUIRREL", "ZEBRA", "RABBIT", "SNAKE", "SHEEP", "OWL", "MONKEY"]


};






const sentenceList = {
  HOUSE: ["I help you enjoy your soup, but I’m not a chef.", "I show you what everyone else sees.",
    "Without me, some things stay inaccessible.", "I make a sound and I can call a crowd.",
    "I’m where you relax after a long day.", " A place where dreams come", "I stand between rooms but never leave my place",
    "I support you when you're tired of standing.",
    "I spin to keep you cool.", "Four walls make my home.",
    "I have hands but can’t clap", "I hold your drink.", "I carry food but never eat.",
    "I untangle knots without ever getting tangled.", "I assist you in handling your meal.",
    "I cut things in the kitchen.", "I create bubbles to help you stay clean",
    "I stand your meals and meetings without eating or talking",
    "I bake and roast, but never eat my creations", "I melt away while lighting up your surroundings.",
    "I show moments frozen in time.", "I clean what's on top of your head.", "I fight against cavities.",
    "I brighten your personal space.", "I support your head while you rest",
    "I cook quickly without flames.", "I keep the sun and stares away", "I hold books without hands", "I’m a clear barrier to the outside.",
    "I make indoor climates more comfortable."],//30


  SCHOOL: ["You use me to write or draw.", "I start blank but end up full of ideas.", "I remove errors with a swipe",
    "I’m full of words and stories.", "I help you learn.", "I carry your school supplies",
    "I’m a flat surface for work", "I measure lengths and draw straight lines", "I display information for the class.",
    "I keep your day in order.", "I help you with math problems.", "I hold your thoughts on my pages.",
    "I test your knowledge unexpectedly", "Special clothes you wear for school", "I’m a place for fun between lessons.",
    "I write your thoughts", "I challenge you to remember what you’ve learned", "I’m where you experiment with ideas and substances.",
    "I make your pencils pointy", "I hold everything you need for school.", "I watch over without teaching.",
    "I guide your learning path.", "I’m a treasure chest of knowledge", "I’m the building blocks of your knowledge.",
    "I show you how well you’ve absorbed knowledge", "I’m the set of letters that form words.", "Playtime at school.",
    "The study of numbers and equations.", "A place with many books to read or borrow", "School work you do at home"],//30


  TECHNOLOGY: ["This small device moves your cursor on the screen", "a portable computer that you can carry anywhere",
    " I type your thoughts", "A machine you use to work, play games, or browse the internet",
    " You use me to make calls or send messages", " I display images",
    "I am a machine that puts your digital documents on paper",
    " I fill the air with sound", " I capture photos and videos",
    "I connect you to the world online",
    " A place you visit on the internet", "I give life to your devices",
    "I connect your devices to the internet", "I’m the heart of a computer",
    " A program you use on your computer or phone",
    "You watch shows and movies on me", "I do tasks automatically", " I store and provide power for devices",
    "I let you hear privately in a crowded space", "I play sounds out loud",
    "A digital message sent over the internet", "I capture your voice", "A portable touch-screen device",
    "I perform programmed tasks but lack free will",
    "You use me to explore the internet", "I track time and health",
    "I can harm computers", "I detect changes in my surroundings", "I access systems without an invitation",
    "I write instructions that computers follow"],//30


  FOOD: ["I’m a fruit and a color.", "Made from milk, often yellow or white.", "I’m yellow and loved by monkeys",
    "A drink made from leaves.", "Small, round, and often purple or green.", "starchy vegetable used to make chips",
    "A large green fruit with red inside", "Red, juicy, and often in salads", "Keeps the doctor away if eaten daily",
    "A sweet, tropical fruit", "Sweet fruit with a rounded bottom and narrow top", "I'm a vegetable that looks like a tiny tree",
    "You need me to stay alive", "A fuzzy, sweet fruit.", "White and nutritious",
    "A sour, yellow citrus fruit", "A morning beverage that wakes you up", "I’m leafy, green and often in salads",
    "I’m small, red, and often on top of desserts", "I’m orange and good for your eyes", "A sweet treat made from cocoa",
    "I’m cold, sweet and come in many flavors", "A red fruit with seeds on the outside", "Hard outside, sweet white inside",
    "Adds flavor but can make you cry", "I’m green and creamy inside", "I’m tropical, with a spiky exterior and sweet interior",
    "I’m small and fuzzy, with a bright green inside", "I’m full of juicy seeds", "Green, spear-shaped vegetable"],//30


  CLOTHES: ["- I shield your eyes from the bright sun", "Worn on the head",
    "- I protect your feet from rough paths", " Keeps you warm in cold weather",
    "I twirl with you in style", "- I keep your feet warm", "I cover your legs and have pockets", "I cover your feet and come in many styles",
    "Help you see better", "I cover your upper body",
    "Jewelry for the finger", "- I let your toes breathe and keep your feet cool",
    "I provide warmth and can be zipped or buttoned", "I hang from your ears and come in many designs",
    "Tells time on your wrist", "Jewelry for the neck", "I’m worn when it’s time to sleep",
    "I circle your wrist, often shiny and bright", "- I cover your hands in winter’s chill",
    "I wrap around your neck so tight, keeping you warm on a cold, windy night",
    "I hold your pants up", "- I’m knitted with care, keeping you warm in cool air", "I’m a sweatshirt with a hood", "The latest trends in clothing",
    "Denim pants", "Formal outfit",
    "I add sparkle and shine", "Sleeveless top", "I’m a piece of furniture that holds your clothes", "I’m small and round, I keep your clothes bound"],


  ANIMALS: ["I like to purr and chase mice, and I have nine lives",
    "Loyal and friendly", "I stand in fields and give you milk", "A large animal you can ride", "I’m the king of the jungle with a loud roar",
    ". I hibernate when winter’s near, but in summer, I fish without fear", "I hop around and live near ponds", "I have a long trunk and big ears", "I have a very long neck and eat leaves from tall trees", "A big cat with stripes",
    "I roam in packs and howl at the moon", "I carry my home on my back and move very slowly", "I live in deserts and store water", " I have eight arms", "I fly high and hunt with a powerful sight",
    "I live in trees and eat leaves", "Long ago, I roamed the land, now just fossils in the sand", "I move very slowly and hang from trees",
    "I’m smart and live in the sea", " I’m a small pet that runs in a wheel",
    "I’m small and spiky on the back", "I’m colorful and can mimic human speech", "I sleep at day and fly by night, but i have no feathers to aid my flight", "I climb trees and collect nuts", "I have black and white stripes",
    "I hop around and have long ears", "I slither silently on the ground", "I give wool", "I hunt at night with silent flight, known for my wisdom and good sight", "Swing from trees and love bananas"]


};




let charHint = ""; // char hinted
let hintNumber;  // hint number for the game
let availableLetters;


let image = document.getElementById("man");   // the image of the man


let images = ["MANI/MANI6.png", "MANI/MANI5.png", "MANI/MANI4.png",
  "MANI/MANI3.png", "MANI/MANI2.png", "MANI/MANI1.png", "MANI/MANI0.png",
  "LongMan/longMan7.png", "LongMan/longMAn6.png", "LongMan/longMan5.png",
  "LongMan/longMan4.png", "LongMan/longMan3.png", "LongMan/longMan2.png",
  "LongMan/longMan1.png", "prisoner/prisoner7.png", "prisoner/prisoner6.png",
  "prisoner/prisoner5.png", "prisoner/prisoner4.png", "prisoner/prisoner3.png",
  "prisoner/prisoner2.png", "prisoner/prisoner1.png", "girl/girl7.png", "girl/girl6.png",
  "girl/girl5.png", "girl/girl4.png", "girl/girl3.png",
  "girl/girl2.png", "girl/girl1.png"];   //array of different image


let settingIcons = ["blueIcon.png", "greenIcon.png", "grayIcon.png", "roseIcon.png"];
let settingIcon;


let gamesWon = 0;    // the number of games correct  
let gW = document.getElementById("nbGamesWon");  //span games won
let gamesLost = 0;
let totalGames = 10;     // the number of total games
let tG = document.getElementById("totalGames");   //span total games


var hiddenword = "";   //the word choosed randomly by computer


var nbErrors = 0;     // number of errors for each word


var nbCorrect = 0;   // number of correct word for each word


let gameMode = 1 + Math.floor(Math.random() * 4);  //choosed randomly the game mode


let previousMode = gameMode;      // the previous mode is know (in the first) the game mode


let counterTheme = 1;      //counter theme to change the theme when we do restart


let picNb = (gameMode - 1) * 7; //the pic number is related with the game mode


let arrayOfUsedWords = [];  //array of used word in the same game


let themeClicked;   //boolean if the theme box clicked


let m1; // mode 1 in the themebox
let m2; // mode 1 in the themebox
let m3; // mode 1 in the themebox
let m4; // mode 1 in the themebox


let newg;  //new game


let hintb; ///hint button
let showLetter;


let theme; // theme box
let drop;// whhen mouse leave
let modes;


let secondsLeft;//span of seconds left
let timeOfTheLevel;  //time of the level get it from relation
let timeAcc;  //time accumulator
let intr = 0;   // interval for the time for each letter
let intr2;   //interval for changing class red white


let nbS = 0;
let sound1 = new Audio("sounds/disagree.wav");
let sound2 = new Audio("sounds/mhm.wav");


let clickACell = false;  //boolean if a cell is clicked


let clickedCell;
let letterClicked;
let settingIsClicked = "false";
let final;//edit9
let scoreBox;//edit9
let newB;//edit9
let replay;
let leaderboard;
let intervalToSet;
let nbOfDiv = 0;
let degreeToAdd = 0;
let colorFill;


let lTitle, lname, row, datanames;
function getElts() {
  arrayOfScores = [];
  arrayOfPlayers = [];
  datanames = document.getElementById("dataNames");
  lTitle = document.getElementById("lTitle");
  row = document.getElementById("row");
  lname = document.getElementById("name");




  scoreBox = document.getElementById("end");


  enableSound = localStorage.getItem("soundIsEnable");


  newB = document.getElementById("new");
  replay = document.getElementById("replay");
  leaderboard = document.getElementById("leaderBoard");
  final = document.getElementById("final");
  final.style.display = "none";
  m1 = document.getElementById("m1");
  m1.addEventListener("click", themeClickedf);
  m1.addEventListener("click", newGame1);


  m2 = document.getElementById("m2");
  m2.addEventListener("click", themeClickedf);
  m2.addEventListener("click", newGame2);


  m3 = document.getElementById("m3");
  m3.addEventListener("click", themeClickedf);
  m3.addEventListener("click", newGame3);


  m4 = document.getElementById("m4");
  m4.addEventListener("click", themeClickedf);
  m4.addEventListener("click", newGame4);


  newg = document.getElementById("newgame");
  newg.addEventListener("click", nothemeClickedf);
  newg.addEventListener("click", newGame);


  hintb = document.getElementById("hint");
  hintb.addEventListener("click", getHint);
  hintb.addEventListener("mouseenter", blocH);
  hintb.addEventListener("mouseleave", nonH);


  theme = document.getElementById("themeBox");
  theme.addEventListener("mouseenter", bloc);


  drop = document.getElementById("dropdown");
  drop.addEventListener("mouseleave", non);


  modes = document.getElementById("modes");


  secondsLeft = document.getElementById("secondsLeft");


  showLetter = document.getElementById("showLetter");
  showLetter.addEventListener("click", showHiddenLetter);


  streak = document.getElementById("streak");


  hintSentence = document.getElementById("hintSentence");


  hintSentence.style.display = "none";


  settingIcon = document.getElementById("settingIconID");




}


function returnNumberLevel() {
  switch (levelOfTheGame) {
    case "EASY": return 0;
    case "MEDIUM": return 1;
    case "HARD": return 2;
  }
}


function putCategoryH() {     //function to get index of category from local storage and put it in the screen
  indexCategory = localStorage.getItem("indxCat");
  document.getElementById("categ").innerHTML = categoriesList[indexCategory];


  catName = categoriesList[indexCategory];


  catN = catName.split(" ");
  catArray = wordList[catN[0]];


}


function putDiff() {     //function to get level from local storage and put it in the screen


  levelOfTheGame = localStorage.getItem("levelStored");


  document.getElementById("diff").innerHTML = levelOfTheGame


  document.getElementById("diff").classList.add(levelOfTheGame.toLowerCase());
}


function bloc() {
  modes.style.display = "block";
}


function non() {
  modes.style.display = "none";
}


function themeClickedf() {
  themeClicked = true;
}
function nothemeClickedf() {
  themeClicked = false;
}


window.onload = setGame();


function plusToTheProgress() {
  var wdt = parseInt(beforeV(littleLine.style.width));
  littleLine.style.width = (wdt + 2) + "vw";


}


function beforeV(str) {


  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "v") return newStr;
    newStr += str[i];
  }
}




function putNumberOfSecondsForError() {


  timeOfTheLevel = 5 * (3 - returnNumberLevel());
  timeAcc = timeOfTheLevel;
  secondsLeft.innerText = timeAcc;


}


function putInterval() {
  clearInterval(intr);
  intr = setInterval(setTime, 1000);
}


let nbColor = "blackNb";
let fillColor = "yellowFill";


function redWhite() {
  var sec = document.getElementById("secondsLeft");
  var divToFill = document.querySelectorAll(".in");


  if (colorFill == "red") {


    changeColorFill();
    colorNb = 'black';




    sec.style.color = colorNb;


    divToFill.forEach(
      element =>
        element.style.backgroundColor = colorFill


    );


  } else {


    colorFill = 'red';
    colorNb = 'red';


    sec.style.color = colorNb;


    divToFill.forEach(
      element =>
        element.style.backgroundColor = colorFill


    );








  }










}




function resetTime() {


  changeColorFill();
  clearInterval(intr2);
  clearInterval(intervalToSet);
  clearInterval(intr);
  document.getElementById("secondsLeft").classList.remove("hard");
  document.getElementById("secondsLeft").style.color = 'black';




  timeAcc = timeOfTheLevel;
  timerSound.pause();
  timerSound.currentTime = 0;










  degreeToAdd = 0;
  nbOfDiv = 0;
  document.getElementById("toFill").innerText = "";








}


function setTime() {
  if (timeAcc > 3) {
    document.getElementById("secondsLeft").classList.remove("hard");
    changeColorFill();
  }


  if (timeAcc > 0)
    secondsLeft.innerText = --timeAcc;


  if (timeAcc == 3) {
    intr2 = setInterval(redWhite, 200);
    if (enableSound == "true")
      timerSound.play();


    console.log(nbOfDiv);
  } else if (timeAcc == 0) {
    resetTime();
    intrvl();
    putInterval();
    nbErrors++;
    clickACell = false;
    addError();


    document.getElementById("secondsLeft").classList.remove("hard");


    changeColorFill();










  }
}






function intrvl() {
  document.getElementById("secondsLeft").innerText = timeOfTheLevel;
  clearInterval(intervalToSet);
  intervalToSet = setInterval(addFill, (timeOfTheLevel * 1000) / 360);
}
function addFill() {


  let newDivToAdd = document.createElement("div");
  newDivToAdd.classList.add("newDiv");


  let newIn = document.createElement("div");
  newIn.classList.add("in");


  newIn.style.backgroundColor = colorFill;


  newDivToAdd.append(newIn);




  document.getElementById("toFill").append(newDivToAdd);
  newDivToAdd.style.transform = `rotate(${degreeToAdd}deg)`;




  nbOfDiv++;
  degreeToAdd += 1;


}




function colorCircle() {
  let circle = document.querySelectorAll(".in");
  circle.forEach(element => element.style.backgroundColor = colorFill)
}




function changeStart() {
  if (player.value != "" && levelOfTheGame != "") {
    document.getElementById("strtButton").classList.remove("disabledStart");
    document.getElementById("strtButton").classList.add("workStart");
  }
  else {
    document.getElementById("strtButton").classList.add("disabledStart");
    document.getElementById("strtButton").classList.remove("workStart");
  }


}


function changeColorFill() {
  switch (gameMode) {
    case 1: colorFill = "rgb(24, 28, 40)"; break;
    case 2: colorFill = "rgb(107, 143, 93)"; break;
    case 3: colorFill = "rgb(78, 72, 72)"; break;
    case 4: colorFill = "rgb(153, 85, 140)"; break;
  }






}




function setGame() {


  if (document.URL.indexOf("startPage") < 0) {




    getElts();
    nbErrors = 0;
    nbCorrect = 0;
    clickedHint = false;
    charHint = "";
    image.src = images[0 + picNb];
    putCategoryH();
    putDiff();
    putNumberOfSecondsForError();






    if (hintNumber == 0) {
      hintb.disabled = true;
    } else {
      hintb.disabled = false;
    }
    hintSentence.innerText = "";
    hintSentence.style.display = "none";
    if (arrayOfUsedWords.length == 0) {
      availableLetters = parseInt(catArray.length / parseInt(returnNumberLevel() + 2));
      hintNumber = parseInt(availableLetters / 2);
      score = 0;//edit9


    }


    hintb.value = "HINT " + hintNumber;
    showLetter.value = "Show Letter " + availableLetters;
    createHiddenWord();
    createKeyboard();
    changeClasses();
    changeColorFill();
    // totalGames = catArray.length;
    tG.innerText = totalGames;
    //  gW.innerText = gamesWon;
    image.addEventListener("mouseenter", manSound);


    document.getElementById("mainCircle").style.display = "flex";


    resetTime();
    intrvl();
    putInterval();




  }
  else {






    settingIsClicked = localStorage.getItem("isSettingClicked");


    if (settingIsClicked == "true") {


      indexCategory = localStorage.getItem("indxCat");


      categoryChoosed.innerText = categoriesList[indexCategory];


      levelOfTheGame = localStorage.getItem("levelStored");


      console.log(levelOfTheGame);






      enableSound = localStorage.getItem("soundIsEnable");
      switch (levelOfTheGame) {
        case "HARD": hardButton.click(); break;
        case "EASY": easyButton.click(); break;
        case "MEDIUM": mediumButton.click();
      }




      player.value = localStorage.getItem("playerName");


      if (enableSound == "true")
        soundIcon.src = "onSound.png";
      else
        soundIcon.src = "offSound.png";


      settingIsClicked = "false";
      localStorage.setItem("isSettingClicked", settingIsClicked);


    } else {
      setCategoryS();
      localStorage.setItem("isSettingClicked", settingIsClicked);
    }


    changeStart();
  }


}






function newGame() {


  streakNumber = 0;
  streak.innerText = "0";
  totalGames = 10;
  littleLine.style.width = "0vw";
  gamesLost = 0;
  gamesWon = 0;
  arrayOfUsedWords = [];
  showLetter.disabled = false;


  switch (counterTheme % 4) {
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
  counterTheme++;
}


function newGame1() {
  picNb = 0;
  previousMode = gameMode;
  gameMode = 1;


  if (themeClicked) {
    colorFill = "rgb(24, 28, 40)";
    colorCircle();
    changeClasses();
    image.src = images[nbErrors + picNb];


  } else {
    setGame();
  }
}


function newGame2() {
  picNb = 7;
  previousMode = gameMode;
  gameMode = 2;


  if (themeClicked) {
    colorFill = "rgb(107, 143, 93)";
    colorCircle();


    changeClasses();
    image.src = images[nbErrors + picNb];


  } else {
    setGame();
  }


}


function newGame3() {
  picNb = 14;
  previousMode = gameMode;
  gameMode = 3;


  if (themeClicked) {
    colorFill = "rgb(78, 72, 72)";
    colorCircle();
    changeClasses();
    image.src = images[nbErrors + picNb];


  } else {
    setGame();
  }
}


function newGame4() {
  picNb = 21;
  previousMode = gameMode;
  gameMode = 4;


  if (themeClicked) {
    colorFill = "rgb(153, 85, 140)";
    colorCircle();
    changeClasses();
    image.src = images[nbErrors + picNb];


  } else {
    setGame();
  }
}


function changeClasses() {
  let game = document.getElementById("game");
  game.classList.remove("g" + previousMode);
  game.classList.add("g" + gameMode);


  let o = document.getElementById("options");
  o.classList.remove("o" + previousMode);
  o.classList.add("o" + gameMode);


  theme.classList.remove("o" + previousMode);
  theme.classList.add("o" + gameMode);
  theme.classList.remove("g" + previousMode);
  theme.classList.add("g" + gameMode);


  hintb.classList.remove("o" + previousMode);
  hintb.classList.add("o" + gameMode);




  newg.classList.remove("g" + previousMode);
  newg.classList.add("g" + gameMode);


  modes.classList.remove("lb" + previousMode);
  modes.classList.add("lb" + gameMode);


  let btKeyb = document.getElementsByClassName("KEYBOARD");
  for (let i = 0; i < btKeyb.length; i++) {


    btKeyb[i].classList.remove("kb" + previousMode);
    btKeyb[i].classList.add("kb" + gameMode);


  }
  let letterinput = document.getElementsByClassName("letter");
  for (let i = 0; i < letterinput.length; i++) {


    letterinput[i].classList.remove("letter" + previousMode);
    letterinput[i].classList.add("letter" + gameMode);
  }


  showLetter.classList.remove("o" + previousMode);
  showLetter.classList.add("o" + gameMode);




  hintSentence.classList.remove("o" + previousMode);
  hintSentence.classList.add("o" + gameMode);




  hintSentence.classList.remove("letter" + previousMode);
  hintSentence.classList.add("letter" + gameMode);


  settingIcon.src = settingIcons[gameMode - 1];


  scoreBox.classList.remove("letter" + previousMode);
  scoreBox.classList.add("letter" + gameMode);


  newB.classList.remove("g" + previousMode);
  newB.classList.add("g" + gameMode);


  replay.classList.remove("g" + previousMode);
  replay.classList.add("g" + gameMode);


  leaderboard.classList.remove("g" + previousMode);
  leaderboard.classList.add("g" + gameMode);


  lTitle.classList.remove("o" + previousMode);
  lTitle.classList.add("o" + gameMode);




  row.classList.remove("letter" + previousMode);
  row.classList.add("letter" + gameMode);




  lname.classList.remove("white");
  lname.classList.add("white");


  datanames.classList.remove("letter" + previousMode);
  datanames.classList.add("letter" + gameMode);


  //edit9


  let firstChildArray = document.querySelectorAll(".first");
  firstChildArray.forEach(element => {
    element.classList.remove("g" + previousMode);
    element.classList.add("g" + gameMode);
  });
}


function createHiddenWord() {


  document.getElementById("word").innerHTML = "";


  do {
    wIndex = parseInt((Math.random()) * (catArray.length));
    hiddenword = catArray[wIndex];


  } while (arrayOfUsedWords.includes(hiddenword));
  arrayOfUsedWords.push(hiddenword);


  for (let lindex = 1; lindex <= hiddenword.length; lindex++) {
    let letter = document.createElement("div");
    letter.classList.add("letter");
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
    button.id = "b" + b;
    keyboard.appendChild(button);
    button.addEventListener('click', handleButtonClick);


    button.classList.add("KEYBOARD");
  }
}


function manSound() {
  if (enableSound == "true") {
    if (nbErrors > 0 && nbS % 2 == 0) {


      if (nbS % 4 == 0)
        sound1.play();
      else
        sound2.play();
    }
    nbS++;
  }
}


document.addEventListener("keydown", keyDownBody, false);
function keyDownBody(e) {
  var keyCode = e.keyCode;
  if (keyCode > 64 && keyCode < 91) {
    const lt = document.getElementsByClassName("kb" + gameMode);
    const lts = Array.from(lt);
    for (let i = 0; i < lt.length; i++) {
      if (String.fromCharCode(keyCode) == lts[i].innerText)
        lts[i].click();
    }
  }
}


function addError() {
  //edit9
  score -= 2;


  secondsLeft.innerText = timeOfTheLevel;
  image.src = images[nbErrors + picNb];
  if (clickACell == true) {
    clickedCell.classList.remove("kb" + gameMode);
    clickedCell.classList.add("wrong");
    clickedCell.disabled = true;


    clickACell = false;


    if (levelOfTheGame == "HARD") { setTimeout(original, 500); }


  }


  if (nbErrors == 6) {
    gamesLostf();
  }
}


function handleButtonClick(evnt) {


  if (nbCorrect < hiddenword.length && nbErrors < 6) {
    resetTime();
    if (enableSound == "true")
      clickSound.play();
    clickACell = true;
    clickedCell = evnt.target;
    letterClicked = clickedCell.innerText;


    if (hiddenword.includes(letterClicked) && letterClicked !== charHint) {


      score += 2;




      secondsLeft.innerText = timeOfTheLevel;


      clickedCell.disabled = true;
      let s = new Audio("sounds/mhmm.wav");
      if (enableSound == "true")
        s.play();


      let letterIndex = 1;


      for (let char of hiddenword) {
        if (char == letterClicked && document.getElementById("l" + letterIndex).innerText == "") {
          document.getElementById("l" + letterIndex).innerText = letterClicked;
          nbCorrect++;
        }
        letterIndex++;
      }


      if (nbCorrect == hiddenword.length) {


        gamesWonf();


      } else {
        intrvl();
        putInterval();
      }


    } else if (nbErrors < 6) {


      nbErrors++;
      if (nbErrors < 6) {
        intrvl();
        putInterval();
      }






      addError();


    }


  }


}
function original() {
  for (let b = 65; b < 91; b++) {


    let button = document.getElementById("b" + b);
    button.disabled = false;
    button.classList.remove("wrong");
    button.classList.add("kb" + gameMode)
  }
}


function winS() {
  let winS = new Audio("sounds/yay.wav");
  if (enableSound == "true")
    winS.play();
}


function showHiddenLetter() {
  if (nbCorrect < hiddenword.length && nbErrors < 6) {
    resetTime();
    secondsLeft.innerText = timeOfTheLevel;
    const arrayOfAllLetter = document.getElementsByClassName("letter");
    const arrayOfEmpty = Array.from(arrayOfAllLetter).filter((div) => div.innerText === "");
    const divRandomly = arrayOfEmpty[Math.floor(Math.random() * arrayOfEmpty.length)];
    var indexR = Array.from(arrayOfAllLetter).indexOf(divRandomly);
    charHint = hiddenword[indexR];


    const btns = document.getElementsByClassName("kb" + gameMode);


    for (let i = 0; i < btns.length; i++) {
      if (btns[i].innerText == charHint)
        btns[i].disabled = true;//edd
    }


    for (let i = 0; i < hiddenword.length; i++) {
      if (hiddenword[i] == charHint) {
        arrayOfAllLetter[i].innerText = charHint;
        nbCorrect++;
      }
    }


    availableLetters--;
    if (availableLetters == 0) showLetter.disabled = true;
    showLetter.value = "Show Letter " + availableLetters;


    if (nbCorrect == hiddenword.length) gamesWonf();
    else {
      intrvl();
      putInterval();
    }
  }
}


let done = false;
function getHint() {


  done = false;
  clickedHint = true;
  hintb.disabled = true;
  hintNumber--;
  hintb.value = "HINT " + hintNumber;


  hintSentence.style.display = "flex";


  let sentencesArray = sentenceList[catName];


  hintSentence.innerText = sentencesArray[wIndex];


  setTimeout(end, 4000);




}


function blocH() {
  if (clickedHint == true)
    hintSentence.style.display = "flex";
}


function end() {
  done = true;
  nonH();
}


function nonH() {
  if (clickedHint == true && done == true) {
    hintSentence.style.display = "none";
  }
}


function gamesLostf() {


  totalGames -= 1;
  gamesLost += 1;






  if (gamesLost > gamesWon) {


    littleLine.style.backgroundColor = "red";


  } else if (gamesLost == gamesWon) {
    littleLine.style.backgroundColor = "yellow";


  } else {


    littleLine.style.backgroundColor = "green";


  }
  tG.innerText = totalGames;
  plusToTheProgress();
  resetTime();


  intr = 0;
  intr2 = 0
  intervalToSet = 0;


  streakNumber = 0;
  streak.innerText = streakNumber;


  let ind = 1;
  for (let char of hiddenword) {
    document.getElementById("l" + ind).classList.remove("letter" + gameMode);
    document.getElementById("l" + ind).classList.add("wrong");
    document.getElementById("l" + ind).innerText = char;
    ind++;
  }


  for (let b = 65; b < 91; b++) {
    let button = document.getElementById("b" + b);
    button.style.display = "none";
  }


  let angry = new Audio("sounds/angry.wav");
  if (enableSound == "true")
    angry.play();


  var millisecondsToWait = 1500;
  if (totalGames == 0) {
    //edit9
    endOfGame();
  } else {


    console.log("Lost");


    setTimeout(setGame, 1000);


  }
}


function gamesWonf() {


  score += 10;//edit9






  intr = 0;
  ++streakNumber;


  streak.innerText = streakNumber;


  if (streakNumber == 3) {
    ++availableLetters;
    showLetter.disabled = false;
  }


  if (streakNumber == 5)
    ++hintNumber;


  if (streakNumber > 5) {
    ++availableLetters;
    showLetter.disabled = false;
  }


  hintb.innerText = hintNumber;
  showLetter.innerText = availableLetters;


  for (let ind = 1; ind <= hiddenword.length; ind++) {
    document.getElementById("l" + ind).classList.remove("letter" + previousMode);
    document.getElementById("l" + ind).classList.add("correct");


  }
  for (let b = 65; b < 91; b++) {
    let button = document.getElementById("b" + b);
    button.style.display = "none";
  }


  gamesWon++;
  totalGames -= 1;


  if (gamesLost > gamesWon) {


    littleLine.style.backgroundColor = "red";


  } else if (gamesLost == gamesWon) {
    littleLine.style.backgroundColor = "yellow";


  } else {


    littleLine.style.backgroundColor = "green";


  }












  tG.innerText = totalGames;


  plusToTheProgress();
  resetTime();


  setTimeout(winS, 500);


  var millisecondsToWait = 1500;
  if (totalGames == 0) {
    //edit9
    endOfGame();


  } else {




    setTimeout(setGame, 1000);
  }
}




function endOfGame() {


  document.getElementById("mainCircle").style.display = "none";
  themeClicked = false;


  let count = 0;


  let indexOfExistingPlayer = -1;
  let replaced = false;


  final.style.display = "flex";
  score += (4 * hintNumber) + (2 * availableLetters);
  if (score < 0)
    score = 0;
  arrayOfScores = JSON.parse(localStorage.getItem("scores"))
  arrayOfPlayers = JSON.parse(localStorage.getItem("players"));


  if (arrayOfScores == null) {
    arrayOfScores = [score];
    arrayOfPlayers = [localStorage.getItem("playerName")];
  }
  else {


    if (arrayOfPlayers.includes(localStorage.getItem("playerName")))
      indexOfExistingPlayer = arrayOfPlayers.indexOf(localStorage.getItem("playerName"));


    if (indexOfExistingPlayer != -1 && score > arrayOfScores[indexOfExistingPlayer]) {
      replaced = true;
      arrayOfPlayers.splice(indexOfExistingPlayer, 1);
      arrayOfScores.splice(indexOfExistingPlayer, 1);
    }


    if (indexOfExistingPlayer == -1 || replaced == true) {
      for (count = 0; count < arrayOfPlayers.length && score < arrayOfScores[count]; count++);
      arrayOfScores.splice(count, 0, score);
      arrayOfPlayers.splice(count, 0, localStorage.getItem("playerName"));
    }
  }


  localStorage.setItem("scores", JSON.stringify(arrayOfScores));
  localStorage.setItem("players", JSON.stringify(arrayOfPlayers));


  let k = 0;
  datanames.innerText = "";
  for (count = 0; count < arrayOfPlayers.length; count++) {


    let ra = document.createElement("div");
    let sc = document.createElement("div");
    let na = document.createElement("div");


    na.classList.add("name");
    na.classList.add("box");
    sc.classList.add("score");
    sc.classList.add("box");
    ra.classList.add("rank");
    ra.classList.add("box");


    na.classList.add("letter" + gameMode);
    na.classList.add("white");
    sc.classList.add("letter" + gameMode);
    ra.classList.add("letter" + gameMode);


    let c = k + 1;
    ra.innerText = "#" + c;
    sc.innerText = arrayOfScores[count];
    na.innerText = arrayOfPlayers[count];


    let row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(ra);
    row.appendChild(na);
    row.appendChild(sc);


    datanames.appendChild(row);
    if (count == 0 || (arrayOfScores[count - 1] != arrayOfScores[count]))
      k++;
  }




  final.style.display = "flex";


  document.getElementById("nbGuessed").innerText = gamesWon;
  if (gamesWon == 1)
    document.getElementById("s").style.display = "none";
  else
    document.getElementById("s").style.display = "inline";
  document.getElementById("scoreSpan").innerText = score;


}


function showLeaderBoard() {
  document.getElementById("leaderboard").style.display = "flex";
}


function hideLeaderBoard() {
  document.getElementById("leaderboard").style.display = "none";
}
