import Movingcar from "./MovingCar.js";

let countDown = document.getElementById("countDown"); // I get the counter
let start = document.getElementById("buttonStart"); // I get the start button

let player = document.getElementById("player"); // I got the Player element

let playerName = document.getElementById("playerName");

let playerScore = document.getElementById("playerScore");

// I set a function to do the count down
function counter() {
  let count = 4; // to get 3 seconds on the counter screen
  const timer = setInterval(function () {
    count--; // To get a  (-1) by each second
    countDown.textContent = count;
    if (count === 0) {
      clearInterval(timer); // to delete the timer value
      countDown.textContent = "GO GO!"; // display GO GO
    }
    setTimeout(function () {
      // to hide the timer from the screen
      countDown.style.display = "none";
    }, 6000); // I add 6 seconds in order to let the timer display all the its contents , then hide himself
  }, 1000); // the frequence of the interval
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
moveBackground();

// to put an event on keyboard arrow to make the element move up/ down / left/ right

document.addEventListener("DOMContentLoaded", function () {
  let positionX = 0;
  let positionY = 0;
  const containerWidth = 800;
  const containerheight = 300;
  const moveStep = 100; // define the speed

  function movePlayer(x, y) {
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
        movePlayer(-moveStep/2, 0);
        break;
      case "ArrowRight":// I divided the speed on two for left and right to avoid fast collision
        movePlayer(moveStep/2, 0);
        break;
      case "k":
        horn();
        break;
      case "p":
        hornPolice();
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
  let topValue = getRandomNumber(0, 3) * 100; 
  let speedValue = getRandomNumber(2, 4); 
  cars.push(new Movingcar(topValue, speedValue));
}

createNewCar();

setInterval(createNewCar, 2000);
