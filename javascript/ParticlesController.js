import Particles from "./Particles.js";

export default class ParticlesController {
  constructor(canvas) {
    this.canvas = canvas;
  }
  // will hold the particles
  particlesArray = [];
  colorsSeaMine = ["red", "#686868", "#680000"];
  colorsFishy = [
    "red",
    "orange",
    "yellow",
    "green",
    "greenyellow",
    "indigo",
    "violet",
  ];
  colorsBoss = [
    "red",
    "orange",
    "yellow",
    "blue",
    "greenyellow",
    "indigo",
    "violet",
  ];

  draw(ctx) {
    this.particlesArray.forEach((particle) => {
      // if fade is 0 remove particles from screen
      if (particle.fade <= 0) {
        const index = this.particlesArray.indexOf(particle);
        // no flickering
        setTimeout(() => {
          this.particlesArray.splice(index, 1);
        }, 0);
      } else {
        particle.draw(ctx);
      }
    });
  }

  // if sea mine is destroyed use these properties
  seaMine(x, y, width, height) {
    for (let i = 0; i < 13; i++) {
      this.particlesArray.push(
        new Particles(
          x + width / 2, // x
          y + height / 2, // y
          2, // spread speed
          Math.random() - 0.5, // speedX
          Math.random() - 0.5, // speedY
          Math.random() * 3, // radius
          0.01, // fade rate
          this.colorsSeaMine[ // color
            Math.floor(Math.random() * this.colorsSeaMine.length)
          ]
        )
      );
    }
  }

  // if the fishy is destroyed use these properties
  fishy(x, y, width, height) {
    for (let i = 0; i < 17; i++) {
      this.particlesArray.push(
        new Particles(
          x + width / 2,
          y + height / 2,
          5, // spread speed
          Math.random() - 0.5, // speedX
          Math.random() - 0.5, // speedY
          Math.random() * 4, // radius
          0.008, // fade rate
          this.colorsFishy[Math.floor(Math.random() * this.colorsFishy.length)] // color
        )
      );
    }
  }
  // if boss is destroyed use these properties
  boss(x, y, width, height) {
    for (let i = 0; i < 120; i++) {
      this.particlesArray.push(
        new Particles(
          x + width / 2,
          y + height / 2,
          15, // spread speed
          Math.random() - 0.5, // speedX
          Math.random() - 0.5, // speedY
          Math.random() * 9, // radius
          0.008, // fade rate
          this.colorsBoss[ // color
            Math.floor(Math.random() * this.colorsBoss.length) // color
          ]
        )
      );
    }
  }
  // if submarine is destroyed use these properties
  submarine(x, y, width, height, submarineDie) {
    for (let i = 0; i < 10 * submarineDie; i++) {
      this.particlesArray.push(
        new Particles(
          x + width / 2,
          y + height / 2,
          5 * submarineDie, // spread speed
          Math.random() - 0.5, // speedX
          Math.random() - 0.5, // speedY
          Math.random() * 3 * submarineDie, // radius
          0.007, // fade rate
          this.colorsFishy[Math.floor(Math.random() * this.colorsFishy.length)] // color
        )
      );
    }
  }

  // background bubbles
  backgroundbubbles(width, height) {
    this.particlesArray.push(
      new Particles(
        Math.random() * width, // x
        Math.random() * height, // y
        2, // spread speed
        0, // speedX
        0.4, // speedY
        Math.random() * 5, // radius
        0.009, // fade rate
        this.returnBubblesColors() // color
      )
    );
  }

  // return a random bubbles color
  returnBubblesColors() {
    let num = Math.random();
    // 88% bubbles will be white
    if (num < 0.88) {
      return "white";
      // 5% bubbles will be a shade of blue
    } else if (num < 0.93) {
      return "#83d7ee";
      // 4% bubbles will be blue
    } else if (num < 0.97) {
      return "blue";
      // 3% bubbles will be a shade of blue
    } else {
      return "#ebf6f7";
    }
  }
}
