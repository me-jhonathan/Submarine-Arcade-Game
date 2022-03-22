import Particles from "./Particles.js";

export default class ParticlesController {
  constructor(canvas) {
    this.canvas = canvas;
  }
  // will hold the particles
  particlesArray = [];

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
