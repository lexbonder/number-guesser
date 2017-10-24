var bigNumber = document.getElementById('last-guess');
var clearButton = document.getElementById('clear-button');
var count = 0;
var correctAnswer;
var gameStartButton = document.getElementById('start-button');
var guessButton = document.getElementById('guess-button');
var guessCounter = document.getElementById('guess-counter');
var highScore = 0;
var nextLevelButton = document.getElementById('next-level');
var numberShuffle = window.setInterval(startNumberShuffle, 50);
var parsedMax;
var parsedMin;
var systemResponse = document.querySelector('#system-response');
var userGuess = document.getElementById('user-guess');
var userMax = document.getElementById('user-max');
var userMin = document.getElementById('user-min');
var welcomeScreenClearButton = document.getElementById('welcome-clear-button');

function checkHighScore(){
  var highScoreCounter = document.getElementById('high-score-counter');
  if (highScore === 0 || highScore > count){
    highScoreCounter.innerText = count + 1;
    highScore = count + 1;
  };
};

function clearUserNumberEntry (){
  userMax.value = '';
  userMin.value = '';
  startButtonTextReset();
};

function compare(userGuess){
  if (userGuess < parsedMin){
    systemResponse.innerText = 'Are you even trying? That\'s way too low!';
  }else if (userGuess > parsedMax){
    systemResponse.innerText = 'Are you even trying? That\'s way too high!';
  }else if (userGuess > correctAnswer && userGuess <= parsedMax){
    systemResponse.innerText ='That guess is too high. Keep Guessing!';
  }else if (userGuess < correctAnswer && userGuess >= parsedMin) {
    systemResponse.innerText = ('That guess is too low. Keep Guessing!');
  }else{
    systemResponse.innerText = ('BOOM!');
    levelCompleted();
    checkHighScore();
  };
};

function currentScoreCounter(){
  count++;
  guessCounter.innerText = count;
};

function disableButtons(){
  clearButton.setAttribute('disabled', true);
  welcomeScreenClearButton.setAttribute('disabled', true);
  guessButton.setAttribute('disabled', true);
};

function enableButtons(){
  clearButton.removeAttribute('disabled');
  welcomeScreenClearButton.removeAttribute('disabled');
  guessButton.removeAttribute('disabled');
};

function eraseUserInputFromForm(){
  document.querySelector('form').reset();
};

function gameStart(){
  var welcome = document.querySelector('.welcome');
  var game = document.querySelector('.game');
  document.getElementById('minimum').innerText=parsedMin;
  document.getElementById('maximum').innerText=parsedMax;
  welcome.style.display = 'none';
  game.style.display = 'block';
};

function gameReset(){
  nextLevelButton.style.display='none';
  systemResponse.innerText = 'You haven\'t guessed yet!';
  document.getElementById('reset-button').innerText=('I give up! Reset it!');
};

function lastGuess(){
  if (userGuess.value < parsedMin || userGuess.value > parsedMax) {
    bigNumber.innerText = '??';
  } else {
    bigNumber.innerText = (userGuess.value);
  };
};

function levelCompleted(){
  document.getElementById('reset-button').innerText = 'Play Again?';
  document.getElementById('next-level').style.display = 'block';
  document.querySelector('.user-input').style.display = 'none';
};

function restartNumberShuffle(){
  numberShuffle = window.setInterval(startNumberShuffle, 50);
};

function setGame(){
  parsedMin = parseInt(userMin.value);
  parsedMax = parseInt(userMax.value);
  correctAnswer = (Math.floor(Math.random()*(parsedMax-parsedMin+1))+parsedMin);
  showAnswerInConsole();
};

function showAnswerInConsole(){
  console.log('The answer is ' + correctAnswer + '.. Cheater.');
};

function startButtonTextReset(){
  gameStartButton.innerText = ('Let\'s Play 1 - 100!');
};

function startNumberShuffle() {
  var welcomeScreenBigNumber = document.getElementById('welcome-last-guess');
  bigNumber.innerText = Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10);
  welcomeScreenBigNumber.innerText = Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10);
};

function stopNumberShuffle(){
  window.clearInterval(numberShuffle);
};

clearButton.addEventListener('click', function(event){
  event.preventDefault();
  eraseUserInputFromForm();
  disableButtons();
});

gameStartButton.addEventListener('click', function(event){
  event.preventDefault();
  if (userMin.value === ''){
    userMin.value = 1;
  };
  if (userMax.value === ''){
    userMax.value = 100;
  };
  if (parseInt(userMax.value) <= parseInt(userMin.value)){
    document.getElementById('range-message').innerText='Come on.. Do it right.';
    clearUserNumberEntry();
    disableButtons();
  }else{
    setGame();
    gameStart();
  };
});

guessButton.addEventListener('click', function(event){
  event.preventDefault();
  stopNumberShuffle();
  parseInt(userGuess.value);
  compare(userGuess.value);
  currentScoreCounter();
  lastGuess();
  eraseUserInputFromForm();
  disableButtons();
});

nextLevelButton.addEventListener('click', function(){
  var level = 1;
  var levelCounter = document.getElementById('level-number');
  parsedMin -= 10;
  parsedMax += 10;
  correctAnswer = (Math.floor(Math.random()*(parsedMax-parsedMin+1))+parsedMin);
  showAnswerInConsole();
  gameStart();
  gameReset();
  document.querySelector('.user-input').style.display = 'block';
  count = 0;
  ++level;
  levelCounter.innerText = level;
  guessCounter.innerText = 0;
  restartNumberShuffle();
});

userGuess.addEventListener('keyup', function(){
  if (userGuess.value !== ''){
    enableButtons();
  }else{
    disableButtons();
  };
});

welcomeScreenClearButton.addEventListener('click', function(event){
  event.preventDefault();
  clearUserNumberEntry();
  disableButtons();
});

window.addEventListener('keyup', function(){
  welcomeScreenClearButton.removeAttribute('disabled');
  if (userMin.value !== '' && userMax.value === ''){
    gameStartButton.innerText = ('Ready? Let\'s Play ' + userMin.value + ' - 100!');
  }else if (userMin.value === '' && userMax.value !== ''){
    gameStartButton.innerText = ('Ready? Let\'s Play 1 - ' + userMax.value + '!');
  }else if (userMin.value !== '' &&  userMax.value !== ''){
    gameStartButton.innerText = ('Ready? Let\'s Play ' + userMin.value + ' - ' + userMax.value + '!');
  }else{
    disableButtons();
    startButtonTextReset();
  };
});

// -----Notes---------------

// Random Number Between 1 and 100
// Math.floor(Math.random()*100+1)

// Random Number Between min and max
// Math.floor(Math.random()*(max - min + 1) + min)
