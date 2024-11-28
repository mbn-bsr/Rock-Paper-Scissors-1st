
let userName;
let screen = document.querySelectorAll("p");
const modalBox = document.getElementById("modal");
const closeBtn = document.getElementById("close");
var nameInput = document.getElementById("input");
const questions = document.getElementById("name-move");
const okBtn = document.getElementById("ok-btn");

// const popUp = () => {
//   modalBox.style.display = "block";
// };

// const close = () => {
//   modalBox.style.display = "none";
// };
// //---------The X button 
// closeBtn.addEventListener("click", close);

//--------Function to clear the fields upon page reload
window.onload = function () {
  //nameInput.value = '';
  document.querySelector("form").reset();
  questions.innerHTML = `Please enter your first name!`;
};

okBtn.addEventListener("click", () => {
    console.log('do i run too?');
  if (
    nameInput.value.length > 15 ||
    /[0-9.*+?><,#^=!:${}()|\[\]\/\\]+/g.test(nameInput.value)
  ) 
  {
    questions.innerHTML = `No numbers or special characters and no more than 15 characters allowed`;
  } else {
    questions.innerHTML = `Welcome ${nameInput.value}! Let's play Rock Paper and Scissors!`;
    console.log('do i run again and again~~~~~~😊😜?????');
    setTimeout(playGame, 5500);
  }
});

// let gameCounter = 1;
// const playAgain = () => {
//   if (confirm("Again?")) {
//     playGame();
//     screen[0].innerText = `Attempt number ${++gameCounter}.`;
//   }
// };

let computerMove;
let userWon = 0;
let computerWon = 0;

//TRY TO ANNOUNCE WHO THE WINNER IS

//-----GAME PLAN
const playGame = () => {
  document.querySelector('form').reset(); //CLEAR INPUT FIELD AGAIN
  questions.innerHTML = `OK, Enter your move, eg rock, paper or scissors`;
  okBtn.addEventListener('click', ()=>{
      let userMove = nameInput.value;
      console.log("im running");
      console.log(userMove);

      let moves = ["rock", "paper", "scissors"];
      let validMove = moves.includes(userMove);
      computerMove = moves[Math.floor(Math.random() * 3)];
      if (validMove) {

        let userWins = () => { 
            console.log(nameInput.value);
            let userMove = nameInput.value;          
          return (
            (userMove === "rock" && computerMove === "scissors") ||
            (userMove === "paper" && computerMove === "rock") ||
            (userMove === "scissors" && computerMove === "paper")
          );
        };

        console.log(`user winning scenaria output is ${userWins()}`);
        screen[1].textContent = `Your ${userMove} vs my ${computerMove}`;

        if (userWins()) {questions.innerHTML = `You win`;
          screen[3].textContent = `Your score: ${++userWon}`;
        } else if (userMove === computerMove) {questions.innerHTML = `It is a Draw! Try again!`;
        } else {questions.innerHTML = `Sorry, You lost, Try again`;
          screen[4].textContent = `Computer score: ${++computerWon}`;
        }
      } else {questions.innerHTML = `Make sure to spell correctly`;
      }
  });//why is it running again? It is running again because it doesn't stop to wait for input after line 59 and finishes running. But when entered false input then it executes both event lisetners.
};


