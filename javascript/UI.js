export default class UI {
  constructor(canvas) {
    this.canvas = canvas;
    // check if game is over
    this.gameOver = false;
  }
  // show game interface
  inGameInterface(ctx, score, lives, checkIfMobile) {
    // show game interface if on mobile
    if (checkIfMobile) {
      // score UI
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Courier New";
      ctx.fillText("Score: " + score, this.canvas.width / 1.8, 25);

      // Lives UI
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Courier New";
      ctx.fillText("Lives: " + lives, this.canvas.width / 8.5, 25);

      // show game interface if on desktop
    } else {
      // score UI
      ctx.fillStyle = "white";
      ctx.font = "bold 35px Courier New";
      ctx.fillText("Score: " + score, this.canvas.width / 1.5, 35);

      // Lives UI
      ctx.fillStyle = "white";
      ctx.font = "bold 35px Courier New";
      ctx.fillText("Lives: " + lives, this.canvas.width / 6, 35);
    }
  }

  // show instructions at the start of the game
  startmenu(ctx, checkIfMobile) {
    // show instructions if on mobile
    if (checkIfMobile) {
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Courier New";
      ctx.fillText(
        '"touch screen"',
        this.canvas.width / 3,
        this.canvas.height / 2.7
      );
      ctx.fillText(
        "to move Submarine",
        this.canvas.width / 3.5,
        this.canvas.height / 2.5
      );
    }
    // show instructions if on desktop
    else {
      ctx.fillStyle = "white";
      ctx.font = "bold 25px Courier New";
      ctx.fillText(
        'Use "mouse" to move Submarine around',
        this.canvas.width / 2.5,
        this.canvas.height / 2.7
      );
      ctx.fillText(
        'Press "left mouse button" to fire ',
        this.canvas.width / 2.5,
        this.canvas.height / 2.5
      );
    }
  }

  isGameOver(ctx, lives, checkIfMobile) {
    // if no more lives game is over
    if (lives === 0) {
      setTimeout(() => {
        this.gameOver = true;
      }, 800);
    }
    // game over screen if on mobile
    if (this.gameOver && checkIfMobile) {
      ctx.fillStyle = "white";
      ctx.font = "bold 30px Courier New";

      ctx.fillText(
        "Game Over!",
        this.canvas.width / 3.5,
        this.canvas.height / 2.8
      );
      // game over screen if on desktop
    } else {
      ctx.fillStyle = "white";
      ctx.font = "bold 50px Courier New";
      ctx.fillText(
        "Game Over!",
        this.canvas.width / 2.5,
        this.canvas.height / 2.5
      );
    }
    return this.gameOver;
  }
}
