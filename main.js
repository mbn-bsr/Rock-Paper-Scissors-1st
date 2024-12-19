let userName;
let gameSelect = document.querySelector("#gameSelect");
let msgPara = document.querySelectorAll("p");
const modalBox = document.getElementById("modal");
const closeBtn = document.getElementById("close");
var nameInput = document.getElementById("input");
const questions = document.getElementById("name-move");
const okBtn = document.getElementById("ok-btn");
let playAgainBtn = document.getElementById("playAgainBtn");
let gameNum = document.querySelector("#gameNum");
let gameNumVal;
let gameCounter = 1;
let userWon = 0;
let computerWon = 0;

// const popUp = () => {
//   modalBox.style.display = "block";
// };

//NEED TO KNOW WHY ITS REPEATING. ONCE FOUND, STOP REPEAT! HIDE BOX OR ASK ON THE MAIN SCREEN IN THE BEGINNING THAT HOW MANY GAMES' BEST OF WOULD THE USER LIKE AGAINST THE COMPUTER. ONCE TAKEN USER INPUT, MAKE THE GAME REPEAT THAT MANY TIMES AND DECLARE THE WINNER IN THE END.

let title = "Rock Paper Scissors";
let titleVar = document.getElementById("title");
let charInd = 0;

//INITIAL HEADER BEING TYPED IN
function titleFunc() {
  if (charInd < title.length) {
    titleVar.textContent += title.charAt(charInd);
    charInd++;
    setTimeout(titleFunc, 100);
  }
}
titleFunc();

let gameQ = `How many games' set would you like to play?`;
let charInd1 = 0;
function NumberOfGames() {
  if (charInd1 < gameQ.length) {
    //console.log(`charInd1 is ${charInd1}`);
    gameSelect.textContent += gameQ.charAt(charInd1);
    charInd1++;
    setTimeout(NumberOfGames, 30);
  }
}
setTimeout(NumberOfGames, 5000);
///[a-zA-Z.*+?><,#^=!:${}()|\[\]\/\\]+/g
function valCheck(event) {
  //e.preventDefault();
  if (event.key === "Enter" || event.keyCode === 13) {
    /[^0-9]+/g.test(gameNum.value)
      ? (gameSelect.textContent = "Only numbers please")
      : oddValChecker();

    function oddValChecker() {
      //let result;
      //gameNum.value%2 ===0 ? false:true;
      if (gameNum.value % 2 === 0) {
        gameSelect.innerText = `To decide a winner please enter an Odd number because you entered ${gameNum.value}`;
        return false;
      } else {
        console.log(gameNum.value);
        return true;
      }
    }
  } else {
    gameSelect.textContent = "Please press Enter key once entered the number";
    charInd1 = 0;
  }
  
  return gameNum.value, enterName();
}

function gamesToPlay() {
  gameNum.addEventListener("keyup", valCheck);
}
gamesToPlay();

//-----The X button
const close = () => {
  modalBox.style.display = "none";
  playAgainBtn.style.display = "block";
};
closeBtn.addEventListener("click", close);

//CLEAR INPUT FIELD UPON PAGE RELOAD and ask name
function enterName() {
  nameInput.value = '';
  modalBox.style.display = "block";
  //gameNum.value = "";
  //document.querySelector("form").reset();
  questions.innerHTML = `Please enter your first name!`;
  clickStart();
}
window.onload = () => (gameNum.value = ``);
// window.onload = enterName();
// setTimeout(() => {
//   modalBox.style.display = "block";
// }, 1000);

//CHECKING WHETHER INPUT IS VALID
let inputValidator = (val) => {
  val = val.value;
  //console.log(`the value iiiis ${val}`);
  if (val.length > 15 || /[0-9.*+?><,#^=!:${}()|\[\]\/\\]+/g.test(val)) {
    questions.innerText = `No numbers, special characters or more than 15 characters allowed`;
    return false;
  } else {
    return true;
  }
};
///[^a-z-_]/i
function btnClik(e) {
  //inputValidator(nameInput) ? checkEntry() : clickStart();
  if (inputValidator(nameInput)) {
    msgPara[1].innerText = `Player Name: ${nameInput.value}`;
    checkEntry();
  } else {
    clickStart();
  }
  e.preventDefault();
}

//TAKING USER'S NAME
function clickStart() {
  okBtn.addEventListener("click", btnClik);
}

let moves = ["rock", "paper", "scissors"];
let computerMove;
let userMove;

//RESETTING PAGE AND ASKING USER TO ENTER THEIR MOVE.
function checkEntry() {
  document.querySelector("form").reset();
  questions.innerHTML = "Enter Rock, Paper or Scissors";
  okBtn.removeEventListener("click", btnClik);
  okBtn.addEventListener("click", compareVals);
}

//COMPARING USER'S MOVE VS COMPUTER MOVE
let i = 1;
let j = 0;
let k = 0;
function compareVals() {
  //inputValidator(nameInput) ? checks() : checkEntry();
  if (inputValidator(nameInput)) {
    checks();
  } else {
    checkEntry();
  }
  function checks() {
    userMove = nameInput.value.toLowerCase();
    console.log(`usermove inside checks is ${userMove}`);
    if (moves.includes(userMove)) {
      // userWins()
      //   ? (questions.innerHTML = "You Win")
      //   : (questions.innerHTML = "You lost!");
      if (userWins()) {
        questions.innerText = `You Win`;
        j++;
      } else {
        questions.innerText = `You didn't Win. Try again!`;
        k++;
      }
      if (i < gameNum.value) {
        console.log(i, gameNum.value);
        i++;
        checkEntry();
      } else {
        questions.innerHTML = "Good Bye!";
        okBtn.disabled = true;
        j > k
          ? (msgPara[3].innerHTML = `You win`)
          : (msgPara[3].innerHTML = `You Lost`);
      }
      nameInput.value = "";
    } else {
      questions.innerHTML = "Wrong Spellings";
    }
    console.log("third oi");
  }
  //okBtn.disabled = 'true';
}

//FUNCTION TO DECIDE USER VICTORY
var userWins = () => {
  console.log(`usermove inside userwins is ${userMove}`);
  computerMove = moves[Math.floor(Math.random() * moves.length)];
  msgPara[2].innerText = `My move: ${computerMove}, your move: ${userMove}`;
  console.log(`computer move is ${computerMove} and user move is ${userMove}`);
  return (
    (userMove === "rock" && computerMove === "scissors") ||
    (userMove === "paper" && computerMove === "rock") ||
    (userMove === "scissors" && computerMove === "paper")
  );
};

playAgainBtn.addEventListener("click", () => {
  msgPara[0].innerText = `Set number ${++gameCounter}`;
  enterName();
  modalBox.style.display = "block";
  playAgainBtn.style.display = "none";
  msgPara[1].innerText = ``;
  msgPara[2].innerText = ``;
  okBtn.disabled = false;
  location.reload();
});

//TRY TO ANNOUNCE WHO THE WINNER IS
