import Movingcar from "./MovingCar.js";

let game = document.getElementById("game");
let gameOver = document.getElementById("gameOver");
let start = document.getElementById("buttonStart"); // I get the start button
let restart = document.getElementById("restartButton");
let player = document.getElementById("player"); // I got the Player element
let startSide = document.getElementById("startSide");
let scoreSid = document.getElementById("scoreSid");
let playerScore = document.getElementById("playerScore");
console.log(player);

let musicPlaying = false;
let audiomusic = new Audio("audio/music.mp3");
let audioGameOver = new Audio("audio/GameOver.mp3");
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

document.addEventListener("DOMContentLoaded", function () {
  let positionX = 0;
  let positionY = 0;
  const containerWidth = 800;
  const containerheight = 300;
  const moveStep = 100; // define the speed

  function movePlayer(x, y) {
    // Calculate player's current position
    let playerRect = player.getBoundingClientRect();
    console.log(playerRect);
    let playerLeft = positionX + x;
    let playerRight = playerLeft + playerRect.width;
    let playerTop = positionY + y;
    let playerBottom = playerTop + playerRect.height;

    // Check for collision with each car
    for (let i = 0; i < cars.length; i++) {
      let car = document.getElementById(cars[i].id);
      let carRect = car.getBoundingClientRect();
      console.log(car[i]);

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
      }
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
    console.log("left = ", positionX);
    console.log("top = ", positionY);
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
  moveBackground();
  addPoints();
  addPlayerName();
  highway();
  createNewCar();
  settimeEtSetinterval();
});

restart.addEventListener("click", () => {
  location.reload();
  createNewCar();

  setInterval(createNewCar, 1000);
});

function gameover() {
  game.style.display = "none";
  gameOver.style.display = "flex";
  audioHighWay.pause();
  audioGameOver.play();
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
}

let points = 0;
function addPoints() {
  points += 2;
  playerScore.textContent = points;
}

function moveRightPlayer() {
  let currentRight = parseInt(player.style.right) || 0;
  player.style.right = currentRight + 1 + "px";
  let currentLeft = parseInt(player.style.left) || 0;
  player.style.left = currentLeft + 1 + "px";
}

// Call moveDiv function every 333 milliseconds
function settimeEtSetinterval() {
  setInterval(addPoints, 3000);
  setInterval(createNewCar, 900);
  setInterval(moveRightPlayer, 333);
}
