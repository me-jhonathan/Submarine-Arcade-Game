import SeaMine from "./SeaMine.js";

export default class EnemyController {
  // will hold the enemies
  enemyArmy = [];

  // timer for next sea mine spawn
  timerForSeaMine = 0;
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  //movement for enemy
  draw(cxt) {
    this.respawn();
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
  respawn() {
    // spawn timer
    const seaMineDelay = Math.floor(Math.random() * (440 - 360) + 360);

    // set a range of where a sea mine can spawn
    let minX = 60;
    let maxX = this.canvasWidth - 50;
    let xPosSeaMine = Math.floor(Math.random() * (maxX - minX) + minX);
    if (this.timerForSeaMine <= 0) {
      this.enemyArmy.push(
        new SeaMine(
          1, // id
          xPosSeaMine, // x position
          -55 // y position
        )
      );
      this.timerForSeaMine = seaMineDelay;
    }

    this.timerForSeaMine--;
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
        enemy.seaMineHitRebound();
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
