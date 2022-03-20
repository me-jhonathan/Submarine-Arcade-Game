export default class UI {
  constructor(canvas) {
    this.canvas = canvas;
  }
  // show game interface
  inGameInterface(ctx, score, lives) {
    // score UI
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Courier New";
    ctx.fillText("Score: " + score, this.canvas.width / 1.5, 25);

    // Lives UI
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Courier New";
    ctx.fillText("Lives: " + lives, this.canvas.width / 8.5, 25);
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
        'Press "right mouse button" to fire ',
        this.canvas.width / 2.5,
        this.canvas.height / 2.5
      );
    }
  }

  // check if game is over
  isGameOver(ctx, lives) {
    let gameOver = false;
    // if no more lives game is over
    if (lives === -1) {
      gameOver = true;
    }
    // game over screen
    if (gameOver) {
      ctx.fillStyle = "black";
      ctx.font = "bold 50px Courier New";

      ctx.fillText(
        "Game Over!",
        this.canvas.width / 2.5,
        this.canvas.height / 2
      );
    }
    return gameOver;
  }
}
