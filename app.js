//Setting up variables.
let min = 1, max = 10, winningNum = getRandomNum(min, max), guessesLeft = 3;

//Getting all elements.
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign the min and max values.
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});
      
//Guess event listener.
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  //Validating user entries.
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //Checking if the user won.
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    //Decreasing number of guesses left.
    guessesLeft -= 1;

    if(guessesLeft === 0){
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      //Changing border color.
      guessInput.style.borderColor = 'red';
      //Cleaning input.
      guessInput.value = '';
      //Showing a error message for the user.
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

//Function for when the game is over.
function gameOver(won, msg){
  let color;

  //Changing the color based on the results.
  won === true ? color = 'green' : color = 'red';

  //Disabling the guess input.
  guessInput.disabled = true;
  //Changing border color.
  guessInput.style.borderColor = color;
  //Setting text color.
  message.style.color = color;
  //Setting the message.
  setMessage(msg);

  //Playing again.
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//Getting winning number.
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Setting message.
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}