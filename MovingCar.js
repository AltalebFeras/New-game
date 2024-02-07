export default class Movingcar {
  #top;
  #speed;
  #id;

  constructor(top, speed) {
    this.top = top;
    this.speed = speed;
    this.id = this.#idAleatoire();
    this.#createACar();
    this.#myMove();
  }
  get top() {
    return this.#top;
  }
  set top(top) {
    this.#top = top;
  }
  get speed() {
    return this.#speed;
  }
  set speed(speed) {
    this.#speed = speed;
  }
  get id() {
    return this.#id;
  }
  set id(id) {
    if (id.length === 0) {
      this.#id = this.#idAleatoire(0, 100000000000);
    } else {
      this.#id = id;
    }
  }
  #idAleatoire() {
    return Math.floor(Math.random() * 100000000);
  }
  #createACar() {
    let car = document.createElement("div");
    car.id = this.id;
    document.getElementById(this.id);
    raceContainer.appendChild(car);
    let randomNumber = Math.floor(Math.random() * 11);
    console.log(randomNumber);
    car.style.backgroundImage = `url(Image/model${randomNumber}.png)`;
    car.style.width = "100px";
    car.style.height = "100px";
    car.style.position = "absolute";
    car.style.left = " 800px";
    car.style.top = this.top + "px";
  }

  #myMove() {
    let car = document.getElementById(this.id);
    let left = 800;
    let moveInterval = setInterval(() => {
      if (left <= 100) {
        car.style.display = "none";
        clearInterval(moveInterval);
      } else {
        left -= this.speed;
        car.style.left = left + "px";
      }
    }, 10); // Adjust interval as needed
  }
}

