import Laser from "./Laser.js";

export default class LaserController {
  // submarine lasers
  submarineLaser = [];

  // countdown for next laser
  palyerLaserTimer = 0;

  constructor(canvas, height) {
    this.canvas = canvas;
    this.height = height;
  }

  // fire laser
  fireLaserSubmarine(x, y) {
    // properties of submarine laser
    let id = 1;
    let speed = 5;
    let damage = 1;
    let nextShot = 14;
    let width = 5;
    let height = 15;
    if (this.palyerLaserTimer <= 0) {
      this.submarineLaser.push(
        new Laser(id, x, y - 22, width, height, speed, damage, "red")
      );
      this.palyerLaserTimer = nextShot;
    }
    this.palyerLaserTimer--;
  }

  draw(ctx) {
    this.submarineLaser.forEach((laser) => {
      // remove lasers that go off screen
      if (this.isLaserOffScreen(laser)) {
        const index = this.submarineLaser.indexOf(laser);
        this.submarineLaser.splice(index, 1);
      }
      // draw lasers
      laser.draw(ctx);
    });
  }
  // if laser is off screen remove it
  isLaserOffScreen(laser) {
    // remove once the lowest part of the laser is off screen
    return laser.y <= -laser.height;
  }
}
