pour ajouter un element
const raceContainer = document.getElementById("raceContainer");

let car = document.createElement("div");
car.setAttribute("class", "car");
raceContainer.appendChild(car);
car.style.backgroundImage = "url(Image/Model3.png)";
car.style.width = "100px";
car.style.height = "100px";
car.style.position = "absolute";
car.style.left = " 800px";


function getLeftValue() {
  let computedStyle = window.getComputedStyle(player);
  let currentLeft = computedStyle.getPropertyValue("left");
  let leftValue = parseInt(currentLeft.replace("px", ""), 10);
  console.log("Current left value:", leftValue);
}

function moveBackground() {
  currentPosition -= speed;
  raceContainer.style.backgroundPosition = currentPosition + "px 0";
  requestAnimationFrame(moveBackground);
}

moveBackground();


function isCollide(player, car) {
  playerRect = player.getBoundingClientRect();
  console.log(playerRect.top);
  car = car.getBoundingClientRect();

  return !(
    playerRect.top > carRect.bottom ||
    playerRect.left > carRect.right ||
    playerRect.right < carRect.left ||
    playerRect.bottom < carRect.top
  );
}
function endGame(){

  if (isCollide(player, car)) {
    return true;
  } else {
    return false;
  }
}

//notice


// add cars randomly on the game container 
// add score  plus ten points for each car has left less that the player left 
// add collision if the cars had crashed
// end the game 
// make function to start the game 
// make class cars
//add a tableau to choose between the elemnts

