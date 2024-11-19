//watch https://www.youtube.com/watch?v=li7FzDHYZpc
// https://www.w3schools.com/js/js_promise.asp
// https://www.w3schools.com/js/js_callback.asp


const validNameCheck = () => {
    userName = prompt('Please enter your first name');
    if (userName.length > 15 || (/[0-9.*+?^=!:${}()|\[\]\/\\]+/g).test(userName)){
        alert('Enter a valid name please!');
        validNameCheck();
    } else{
        alert(`Welcome ${userName}, lets play!`);
    }
} 
validNameCheck();

let screen = document.querySelectorAll('p');
let gameCounter = 1;
const playAgain = ()=> {
    if(confirm('Again?'))
    {
         playGame();
        screen[0].innerText =`Attempt number ${++gameCounter}.`;
    }   
}

let userMove, computerMove;
let userWon = 0; 
let computerWon = 0;
const userWins = () => {
    return (
        (userMove === 'rock' && computerMove === 'scissors') ||
        (userMove === 'paper' && computerMove === 'rock') ||
        (userMove === 'scissors' && computerMove === 'paper')
    );
}

//TRY TO ANNOUNCE WHO THE WINNER IS
const playGame = () => {
    userMove = prompt('enter your move', 'eg rock, paper or scissors').toLowerCase();
    let moves = ['rock', 'paper', 'scissors'];
    let validMove = moves.includes(userMove);
    computerMove = moves[Math.floor(Math.random()*3)];
    if (validMove){
        screen[1].textContent = `Your ${userMove} vs my ${computerMove}`;
        if(userWins()){
            screen[2].textContent = 'You Win!';
            screen[3].textContent = `Your score: ${++userWon}`;
        } else if (userMove === computerMove) {
            screen[2].textContent = `It is a Draw! Try again!`
        }
        else{
            screen[2].textContent = `Sorry ${userName}, You lost, Try again`;
            screen[4].textContent = `Computer score: ${++computerWon}`;
        }        
    }
    else {
        screen[1].textContent = `Please enter a valid move`;
    }
    setTimeout(playAgain,2000);
}; playGame();



    