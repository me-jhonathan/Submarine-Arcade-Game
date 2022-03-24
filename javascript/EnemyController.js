import SeaMine from "./SeaMine.js";
import Fishy from "./Fishy.js";
import Boss from "./Boss.js";

export default class EnemyController {
  // will hold the enemies
  enemyArmy = [];

  // timers for next enemy spawn
  timerForSeaMine = 0;
  timerForfishy = 0;
  timerForBoss = 0;

  constructor(canvas, width, height, laserController) {
    this.canvas = canvas;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.laserController = laserController;
  }

  //movement for enemy
  draw(cxt, score) {
    this.respawn(score);
    this.enemyArmy.forEach((enemy) => {
      // if enemy health is 0 or enemy is off screen remove
      if (enemy.health <= 0 || this.offScreen(enemy)) {
        // returns the first element in array
        const index = this.enemyArmy.indexOf(enemy);
        this.enemyArmy.splice(index, 1);
        // draw enemy
      } else {
        enemy.draw(cxt);
      }
    });
  }
  respawn(score) {
    // time til next enemy
    const seaMineDelay = Math.floor(Math.random() * (440 - 360) + 360);
    const fishyDelay = Math.floor(Math.random() * (550 - 410) + 410);
    const bossDelay = Math.floor(Math.random() * (2500 - 2300) + 2300);

    // set a range of where a sea mine can spawn
    let minX = 60;
    let maxX = this.canvasWidth - 50;
    let enemyXpos = Math.floor(Math.random() * (maxX - minX) + minX);
    if (this.timerForSeaMine <= 0) {
      this.enemyArmy.push(
        new SeaMine(
          2, // id
          enemyXpos, // x position
          -55 // y position
        )
      );
      this.timerForSeaMine = seaMineDelay;
    }
    if (this.timerForfishy <= 0 && score >= 300) {
      this.enemyArmy.push(
        new Fishy(
          3, // id
          enemyXpos, // x position
          -75, // y position
          this.laserController
        )
      );
      this.timerForfishy = fishyDelay;
    }
    if (this.timerForBoss <= 0 && score >= 900) {
      this.enemyArmy.push(
        new Boss(
          4, // id
          this.canvasWidth / 2, // x position
          -175, // y position
          this.laserController
        )
      );
      this.timerForBoss = bossDelay;
    }

    this.timerForSeaMine--;
    this.timerForfishy--;
    this.timerForBoss--;
  }
  // check if submarine touches enemy
  collisionDetection(submarine) {
    return this.enemyArmy.some((enemy) => {
      if (
        submarine.x < enemy.x + enemy.width &&
        submarine.x + submarine.width > enemy.x &&
        submarine.y < enemy.y + enemy.height &&
        submarine.y + submarine.height > enemy.y
      ) {
        enemy.enemyHitRebound();
        return true;
      }
      return false;
    });
  }
  // if enemy is off screen
  offScreen(enemy) {
    return enemy.y >= this.canvasHeight;
  }
}
