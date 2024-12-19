let title = "Rock Paper Scissors";
let titleVar = document.getElementById("title");
let charInd = 0;
let gameSelect = document.querySelector("#gameSelect");
let gameNum = document.querySelector("#gameNum");
let p = document.querySelectorAll("p");
const modalBox = document.getElementById("modal");
const closeBtn = document.getElementById("close");
var nameInput = document.getElementById("input");
const questions = document.getElementById("name-move");
const okBtn = document.getElementById("ok-btn");
let toStoreGameNum;
//INITIAL HEADER BEING TYPED IN
titleFunc = () => {
  if (charInd < title.length) {
    titleVar.textContent += title.charAt(charInd);
    charInd++;
    setTimeout(titleFunc, 100);
  }
};
titleFunc();

// Toggle display between 'none' and 'block'
function toggleNumberOfGames() {
  if (gameSelect.style.display === "none") {
    gameSelect.style.display = "block";
  } else {
    gameSelect.style.display = "none";
  }
}
// Start the interval to toggle display every 500ms
let gameNumbersToggle = setInterval(toggleNumberOfGames, 1000);

//Upon pressing Enter I make sure that the input entry is an odd number
function valCheck(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    /[^0-9]+/g.test(gameNum.value)
      ? (gameSelect.textContent = "Only numbers please")
      : oddValChecker();

    function oddValChecker() {
      if (gameNum.value % 2 === 0) {
        gameSelect.innerText = `To decide a winner please enter an Odd number because you entered ${gameNum.value}`;
        return false;
      } else {
        console.log(gameNum.value);
        toStoreGameNum = gameNum.value;
        p[0].innerText = `You chose to play best of ${toStoreGameNum} games`;
        clearInterval(gameNumbersToggle);
        let result = gameNum.value;
        gameNum.value = '';
        gameSelect.remove();
        gameNum.remove();
        return result, enterName();
      }
    }
    gameNum.value = "";
  } else {
    gameSelect.textContent = "Please press Enter key once entered the number";
  }
}
gameNum.addEventListener("keyup", valCheck);

//Close button to come out of the modal box
const close = () => {
  modalBox.style.display = "none";
  playAgainBtn.style.display = "block";
};
closeBtn.addEventListener("click", close);

//Function to display the modal box and to start taking user info
function enterName() {
  nameInput.value = "";
  modalBox.style.display = "block";
  questions.innerHTML = `Please enter your first name!`;
  clickStart();
}

function clickStart() {
  okBtn.addEventListener("click", btnClik);
}

//Upon clicking the OK button or pressing Enter I check whether the inout is valid
function btnClik(e) {
  if (inputValidator(nameInput)) {
    p[1].innerText = `Player Name: ${nameInput.value}`;
    checkEntry();
  } else {
    clickStart();
  }
  e.preventDefault();
}

//CHECKING WHETHER INPUT IS VALID
function inputValidator(val) {
  val = val.value;
  //console.log(`the value iiiis ${val}`);
  if (val.length > 15 || /[0-9.*+?><,#^=!:${}()|\[\]\/\\]+/g.test(val)) {
    questions.innerText = `No numbers, special characters or more than 15 characters allowed`;
    return false;
  } else {
    return true;
  }
}

//Asking user to pick their choice, removing previous event listener, adding new one
function checkEntry() {
  document.querySelector("form").reset();
  questions.innerHTML = "Enter Rock, Paper or Scissors";
  okBtn.removeEventListener("click", btnClik);
  okBtn.addEventListener("click", compareVals);
}

//COMPARING USER'S MOVE VS COMPUTER MOVE
let i = 1;
let userWon = 0;
let computerWon = 0;
let moves = ["rock", "paper", "scissors"];
let computerMove;
let userMove;
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
        p[3].innerText = `You win ${userWon+1} out of ${toStoreGameNum}`;
        userWon++;
      } else {
        p[4].innerText = `I win ${computerWon+1} out of ${toStoreGameNum}`
        questions.innerText = `You didn't Win. Try again!`;
        computerWon++;
      }
      if (i < toStoreGameNum) {
        console.log(i, gameNum.value, toStoreGameNum);
        i++;
        checkEntry();
      } else {
        questions.innerHTML = "Good Bye!";
        nameInput.disabled = true;
        okBtn.disabled = true;
        userWon > computerWon
          ? (p[3].innerHTML = `Final Result, you win because:`)
          : (p[3].innerHTML = `Final Result, you lost because: `);
      }
      nameInput.value = "";
    } else {
      questions.innerHTML = "Wrong Spellings";
    }
  }
}

//Determine scenaros when the user wins
var userWins = () => {
  console.log(`usermove inside userwins is ${userMove}`);
  computerMove = moves[Math.floor(Math.random() * moves.length)];
  p[2].innerText = `My move: ${computerMove}, your move: ${userMove}`;
  console.log(`computer move is ${computerMove} and user move is ${userMove}`);
  return (
    (userMove === "rock" && computerMove === "scissors") ||
    (userMove === "paper" && computerMove === "rock") ||
    (userMove === "scissors" && computerMove === "paper")
  );
};


//To start the game again without reloading the page
let gameCounter = 1;
playAgainBtn.addEventListener("click", () => {
  p[0].innerText = `Set number ${++gameCounter}`;
  enterName();
  modalBox.style.display = "block";
  playAgainBtn.style.display = "none";
  p[1].innerText = ``;
  p[2].innerText = ``;
  okBtn.disabled = false;
  location.reload();
});