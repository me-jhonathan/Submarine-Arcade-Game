// get canvas from index.html
const canvas = document.getElementById("Submarine-Game");

// get context used for drawing
const ctx = canvas.getContext("2d");

// canvas will cover the entire width and height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// coloring the background

function game() {
  ctx.fillStyle = "#064273";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// call 60 times a second
setInterval(game, 1000 / 60);
