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
}
