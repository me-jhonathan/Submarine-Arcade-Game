import UI from "./UI.js";
import Submarine from "./Submarine.js";

// get canvas from index.html
const canvas = document.getElementById("Submarine-Game");

// get context used for drawing
const ctx = canvas.getContext("2d");

// canvas will cover the entire width and height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var score = 0;
var lives = 3;

const ui = new UI(canvas);
const submarine = new Submarine(
  // submarine placement
  canvas.width / 2,
  canvas.height / 1.5,
  canvas.width,
  canvas.height,
  lives
);

function game() {
  ctx.fillStyle = "#064273";
  // draw the canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw submarine
  submarine.draw(ctx);
  // show game interface
  ui.inGameInterface(ctx, score, lives);
}

// call 60 times a second
setInterval(game, 1000 / 60);
