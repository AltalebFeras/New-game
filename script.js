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
  movingCar.style.top = "100px"
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
  const moveStep = 10; // define the speed

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
        movePlayer(-moveStep, 0);
        break;
      case "ArrowRight":
        movePlayer(moveStep, 0);
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
let car = document.createElement("div");
car.setAttribute("id", "movingCar");
raceContainer.appendChild(car);
car.style.backgroundImage = "url(Image/Model3.png)";
car.style.width = "100px";
car.style.height = "100px";
car.style.position = "absolute";
car.style.left = " 800px";

function myMove() {
  let id = null;
  const movingCar = document.getElementById("movingCar");
  let pos = 800;
  clearInterval(id);
  id = setInterval(frameMove, 1);
  function frameMove() {
    if (pos == 0) {
      clearInterval(id);
    } else {
      const randomNumber = Math.floor(Math.random() * 3) + 3;

      pos -= randomNumber;
      movingCar.style.left = pos + "px";
      if (pos <= 0) {
        movingCar.style.display = "none";
      }
    }
  }
}
myMove();
