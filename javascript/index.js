import UI from "./UI.js";

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

function game() {
  ctx.fillStyle = "#064273";
  // draw the canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // show game interface
  ui.inGameInterface(ctx, score, lives);
}

// call 60 times a second
setInterval(game, 1000 / 60);
