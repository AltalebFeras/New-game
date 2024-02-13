import Movingcar from "./MovingCar.js";

let game = document.getElementById("game");
let gameOver = document.getElementById("gameOver");
let start = document.getElementById("buttonStart"); // I get the start button
let restart = document.getElementById("restartButton");
let player = document.getElementById("player"); // I got the Player element
let startSide = document.getElementById("startSide");
let scoreSid = document.getElementById("scoreSid");
let playerScore = document.getElementById("playerScore");
let resetHighScore = document.getElementById("resetHighScore");
let highScoreDiv = document.querySelector('#highScoreDiv')

let gameIsOver = false;
let musicPlaying = false;
let audiomusic = new Audio("audio/music.mp3");
const gameOverAudioRandom = Math.floor(Math.random() * 3)
let audioGameOver = new Audio(`audio/GameOver${gameOverAudioRandom}.mp3`);
function music() {
  if (musicPlaying) {
    audiomusic.pause();
    musicPlaying = false;
  } else {
    audiomusic.play();
    musicPlaying = true;
  }
}
let audioHighWay = new Audio("audio/highway.mp3");
function highway() {
  audioHighWay.play();
}
function horn() {
  let audio = new Audio("audio/Klaxon.mp3");
  audio.play();
}
function hornPolice() {
  let audio = new Audio("audio/police.mp3");
  audio.play();
}
function playSound0() {
  let audio = new Audio('audio/level30.mp3');
  audio.play();
}
function playSound1() {
  let audio = new Audio('audio/level45.mp3');
  audio.play();
}
function playSound2() {
  let audio = new Audio('audio/level60.mp3');
  audio.play();
}

//to make a background rolling
let currentPosition = 0;
const speed = 2; // adjust the speed as needed
function moveBackground() {
  currentPosition -= speed;
  raceContainer.style.backgroundPosition = currentPosition + "px 0";
  requestAnimationFrame(moveBackground);
}
// call the function to be executed

// to put an event on keyboard arrow to make the element move up/ down / left/ right
const DifficultyLevels = {
  EASY: 1200,
  NORMAL: 1000,
  DIFFICULT: 700,
  HARD: 500
};

function startGame() {
  const selectedDifficulty = document.getElementById("difficulty").value;
  const interval = DifficultyLevels[selectedDifficulty];
  setInterval(createNewCar, interval);
  // Additional game initialization code can go here
}
document.addEventListener("DOMContentLoaded", function () {
  let positionX = 0;
  let positionY = 0;
  const containerWidth = 800;
  const containerheight = 300;
  const moveStep = 100; // define the speed

  function movePlayer(x, y) {
    // Calculate player's current position
    let playerRect = player.getBoundingClientRect();
    let playerLeft = positionX + x;
    let playerRight = playerLeft + playerRect.width;
    let playerTop = positionY + y;
    let playerBottom = playerTop + playerRect.height;

    // Check for collision with each car
    for (let i = 0; i < cars.length; i++) {
      let car = document.getElementById(cars[i].id);
      if (car) {
      let carRect = car.getBoundingClientRect();

      // Calculate car's position
      let carLeft = parseInt(car.style.left);
      let carRight = carLeft + carRect.width;
      let carTop = parseInt(car.style.top);
      let carBottom = carTop + carRect.height;

      // Check for collision
      if (
        playerRight > carLeft &&
        playerLeft < carRight &&
        playerBottom > carTop &&
        playerTop < carBottom
      ) {
        // Collision detected
        gameover();
      }}
    }

    // Move the player
    if (positionX + x >= 0 && positionX + x <= containerWidth) {
      positionX += x;
    }
    if (positionY + y >= 0 && positionY + y <= containerheight) {
      positionY += y;
    }
    player.style.left = positionX + "px";
    player.style.top = positionY + "px";
  }

  //after i defined the top and the left I will increase and decrease it by :
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        movePlayer(0, -moveStep);
        break;
      case "ArrowDown":
        movePlayer(0, moveStep);
        break;
      case "ArrowLeft":
        positionX >= 0;
        movePlayer(-moveStep / 2, 0);
        break;
      case "ArrowRight": // I divided the speed on two for left and right to avoid fast collision
        movePlayer(moveStep / 2, 0);
        break;
      case "a":
        movePlayer(moveStep / 11111, 0);
        break;
      case "k":
        horn();
        break;
      case "p":
        hornPolice();
        break;
      case "m" || "M":
        music();
        break;
      default:
        break;
    }
  });
});

let cars = [];
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createNewCar() {
  let topValue = getRandomNumber(0, 3) * 100; // I WILL MODIFY IT IN PLAN B TO (0)
  let speedValue = getRandomNumber(2, 4);
  cars.push(new Movingcar(topValue, speedValue));
}

start.addEventListener("click", () => {
  startGame()
  moveBackground();
  increaseScore();
  addPlayerName();
  highway();
  Setintervals();
});

restart.addEventListener("click", () => {
  location.reload();
  

});
window.addEventListener("load", function() {
  updateScores();
});

function gameover() {
  game.style.display = "none";
  gameOver.style.display = "flex";
  audioHighWay.pause();
  audioGameOver.play();
  gameIsOver = true;
}
function addPlayerName() {
  let yourName = document.getElementById("yourName").value;
  let playerName = document.getElementById("playerName");
  if (yourName === "") {
    yourName = "Player"; //  I set default name to "PLAYER" if the persone dose not write it.
  }
  playerName.textContent = "" + yourName;
  startSide.style.display = "none";
  scoreSid.style.width = 300 + "px";
  resetHighScore.style.display = "none";

}

// create variables for current score and high score
let currentScore = 0;
let highScore = localStorage.getItem("highScore") || 0;

// Function to update and display the scores
function updateScores() {
  playerScore.textContent = currentScore;
  document.getElementById("currentScore").textContent = currentScore;
  document.getElementById("highScore").textContent = highScore;
}

// Function to compare the current score with the high score
function compareScores() {
  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem("highScore", highScore);
    updateScores();
  }
}

function increaseScore() {
  if (!gameIsOver) {
    currentScore += 5;
    updateScores();
    compareScores();
    if (currentScore === 30) {
      playSound0();
    }
    if (currentScore === 45) {
      playSound1();
    }
    if (currentScore === 60 ) {
      playSound2();
    }
    
  }
}

function moveRightPlayer() {
  let currentRight = parseInt(player.style.right) || 0;
  player.style.right = currentRight + 1 + "px";
  let currentLeft = parseInt(player.style.left) || 0;
  player.style.left = currentLeft + 1 + "px";
}

// Call moveDiv function every 333 milliseconds
function Setintervals() {
  setInterval(increaseScore, 3000);
  setInterval(moveRightPlayer, 333);
  setInterval(triggerKeyDown, 1);
}
// Define a function to trigger the keydown event
function triggerKeyDown() {
  let event = new KeyboardEvent("keydown", {
    key: "a",
  });
  document.dispatchEvent(event);
}
resetHighScore.addEventListener("click", () => {
  localStorage.removeItem("highScore");
  updateScores();
  location.reload();
  highScoreDiv.style.backgroundColor = "red";
  setTimeout(() => {
    highScoreDiv.style.backgroundColor = "";
}, 2000);
});
