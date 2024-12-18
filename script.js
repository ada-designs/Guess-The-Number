'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number!🎉';

document.querySelector('.number').textContent = 69;
document.querySelector('.score').textContent = 'Wayne';

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 30 + 1);
let score = 5;
let streak = 0;
let highscore = 0;
let gameActive = true;
console.log(secretNumber);
const checkBtn = document.querySelector('.check');

//What happens when we click the "Again" button

function againReset() {
  gameActive = true;
  score = 5;
  secretNumber = Math.trunc(Math.random() * 30 + 1);
  document.querySelector('h1').textContent = 'Guess my number!';
  console.log(secretNumber);

  document.querySelector('.message').textContent = 'Start Guessing...';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;

  checkBtn.textContent = 'Check!';
  checkBtn.removeEventListener('click', againReset);
  checkBtn.addEventListener('click', checkNmb);

  if (streak > 2) {
    bgColorChange();
  }
}

// Execute the "Again" function on click

document.querySelector('.again').addEventListener('click', againReset);

// The "Check" function

function checkNmb() {
  if (!gameActive) return;
  const guess = Number(document.querySelector('.guess').value);
  document.querySelector('.guess').value = '';

  //When there is no input

  if (!guess) {
    changeMessage('⛔ Not a valid number!');

    //When the number is not between 1 and 30
  } else if (guess > 30 || guess < 0) {
    document.querySelector('.message').textContent =
      '❗ Only numbers from 1 to 30!';
    score--;
    document.querySelector('.score').textContent = score;

    //When player wins
  } else if (guess === secretNumber) {
    changeMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('h1').textContent = '🏆 Well done Champion!';
    streak++;
    document.querySelector('.streak').textContent = streak;

    // Implementing highscore
    if (streak > highscore) {
      highscore = streak;
    }
    document.querySelector('.highscore').textContent = highscore;
    onFire();
    document.querySelector('.number').style.width = '30rem';
    // Media queries

    // smallest phone
    if (window.innerWidth <= 376) {
      document.querySelector('.number').style.width = '23rem';
    }

    ///////

    gameActive = false;
    checkToReset();

    bgColorChange();

    //When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber ? `📈 Too high!` : `📉 Too low!`;
      score--;
      document.querySelector('.score').textContent = score;
    }

    // When the game is lost
    else {
      changeMessage('💀 You lost the game!');

      streak = 0;
      document.querySelector('.streak').textContent = streak;
      onFire();

      document.querySelector('h1').textContent = 'The correct number was';
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.number').style.width = '30rem';

      // Media queries

      // smallest phone
      if (window.innerWidth <= 376) {
        document.querySelector('.number').style.width = '23rem';
      }

      ///////
      document.querySelector('.score').textContent = 0;

      document.querySelector('body').style.backgroundColor = '#FF0000';
      gameActive = false;
      checkToReset();
    }
  }
}

// What happens when we click "check"

document.querySelector('.check').addEventListener('click', checkNmb);

// activate button on "Enter" click

// FUNCTIONS ------------------------------------------//

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    if (gameActive) {
      checkBtn.click();
    } else {
      document.querySelector('.again').click();
    }
  }
});

function checkToReset() {
  if (!gameActive) {
    checkBtn.textContent = 'Play Again';
    checkBtn.removeEventListener('click', checkNmb);
    checkBtn.addEventListener('click', againReset);
  }
}

function bgColorChange() {
  if (streak > 2 && streak < 5) {
    document.querySelector('body').style.backgroundColor = '#000000';
  } else if (streak > 6 && streak < 9) {
    document.querySelector('body').style.backgroundColor = '#000000';
  } else if (streak > 11) {
    document.querySelector('body').style.backgroundColor = '#000000';
  } else {
    document.querySelector('body').style.backgroundColor = '#60b347';
    fire.forEach(f => f.classList.add('hidden'));
  }
}

function changeMessage(message) {
  document.querySelector('.message').textContent = message;
}

const fire = document.querySelectorAll('.fire');

function onFire() {
  if (streak > 1) {
    fire.forEach(f => f.classList.remove('hidden'));
    document.querySelector('body').style.backgroundColor = '#000000';
    document.querySelector('h1').textContent = 'You are on fire! Keep going!';
  } else {
    fire.forEach(f => f.classList.add('hidden'));
    document.querySelector('body').style.backgroundColor = '#222';
    // document.querySelector('h1').textContent = 'Guess my number';
  }
}
