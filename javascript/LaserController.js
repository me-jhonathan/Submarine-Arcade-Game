import Laser from "./Laser.js";

export default class LaserController {
  // hold lasers
  submarineLaser = [];
  enemyLaser = [];

  // countdown timers for next laser
  submarineLaserTimer = 0;
  fishyLaserTimer = 0;
  bossLaserTimer = 0;

  constructor(canvas, height) {
    this.canvas = canvas;
    this.height = height;
  }

  // fire laser for submarine
  fireLaserSubmarine(x, y) {
    // properties of submarine laser
    const id = 1;
    const speed = 4;
    const damage = 1;
    const nextShot = 16;
    const width = 6;
    const height = 14;
    if (this.submarineLaserTimer <= 0) {
      this.submarineLaser.push(
        new Laser(id, x, y - 22, width, height, speed, damage, "red")
      );
      this.submarineLaserTimer = nextShot;
    }
    this.submarineLaserTimer--;
  }
  // fire laser for fishy
  fireLaserFishy(x, y) {
    // properties of fishy laser
    const id = 3;
    const speed = 4;
    const damage = 1;
    const nextShot = 95;
    const width = 6;
    const height = 10;
    if (this.fishyLaserTimer <= 0) {
      this.enemyLaser.push(
        new Laser(id, x, y + 80, width, height, speed, damage, "yellow")
      );
      this.fishyLaserTimer = nextShot;
    }
    this.fishyLaserTimer--;
  }
  // fire laser for boss
  fireLaserBoss(x, y) {
    // properties of fishy laser
    const id = 4;
    const speed = 4;
    const damage = 1;
    const nextShot = 95;
    const width = 6;
    const height = 25;
    if (this.bossLaserTimer <= 0) {
      this.enemyLaser.push(
        // boss will shoot three lasers
        new Laser(id, x, y + 160, width, height, speed, damage, "yellow"),
        new Laser(id, x - 40, y + 160, width, height, speed, damage, "yellow"),
        new Laser(id, x + 40, y + 160, width, height, speed, damage, "yellow")
      );
      this.bossLaserTimer = nextShot;
    }
    this.bossLaserTimer--;
  }

  draw(ctx) {
    this.submarineLaser.forEach((laser) => {
      // remove lasers that go off screen
      if (this.isSubmarineLaserOffScreen(laser)) {
        const index = this.submarineLaser.indexOf(laser);
        this.submarineLaser.splice(index, 1);
      }
      // draw lasers
      laser.draw(ctx);
    });
    this.enemyLaser.forEach((laser) => {
      // remove lasers that go off screen
      if (this.isEnemyLaserOffScreen(laser)) {
        const index = this.enemyLaser.indexOf(laser);
        this.enemyLaser.splice(index, 1);
      }
      // draw laser
      laser.draw(ctx);
    });
  }

  // check if laser hit opponent
  laserCollision(opponent, idOfOpponent) {
    // get id of who is firing laser
    let opponentArray =
      idOfOpponent === 1 ? this.submarineLaser : this.enemyLaser;
    // if opponent (enemy or submarine) is hit remove laser from array and take damage
    return opponentArray.some((laser) => {
      if (laser.laserToOpponentCollision(opponent)) {
        opponentArray.splice(opponentArray.indexOf(laser), 1);
        return true;
      }
      return false;
    });
  }

  // if laser is off screen remove it
  isSubmarineLaserOffScreen(laser) {
    // remove once the lowest part of the laser is off screen
    return laser.y <= -laser.height;
  }
  isEnemyLaserOffScreen(laser) {
    // remove once the highest part of the laser is off screen
    return laser.y >= this.canvas.height;
  }
}
