import UI from "./UI.js";
import Submarine from "./Submarine.js";
import LaserController from "./LaserController.js";

// get canvas from index.html
const canvas = document.getElementById("Submarine-Game");

// get context used for drawing
const ctx = canvas.getContext("2d");

// canvas will cover the entire width and height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// variables to store score and lives
let score = 0;
let lives = 3;

// rate of change for background giant bubble
let giantBubble = 0;

// timer used to show instructions UI
let uiTimer = 0;

// objects
const ui = new UI(canvas);
const laserController = new LaserController(canvas);
const submarine = new Submarine(
  // submarine placement
  canvas.width / 2,
  canvas.height / 1.5,
  canvas.width,
  canvas.height,
  lives,
  laserController
);

// check if the user is on a mobile device
function checkIfMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
}

// game loop
function game() {
  uiTimer++;
  // check if game is over
  if (ui.isGameOver(ctx, lives)) {
    return;
  }
  // if not on mobile show ocean background
  if (!checkIfMobile()) {
    // ocean background screen
    oceanBackground();
  } else {
    // if on mobile don't show ocean background for better performance
    ctx.fillStyle = "#064273";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // draw default canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // show instructions at the start of the game then disappear
  if (uiTimer < 320) {
    // startmenu();
    ui.startmenu(ctx, checkIfMobile());
  } else {
    // draw enemy
    console.log("enemy wave start");
  }

  // draw lasers
  laserController.draw(ctx, canvas.height);

  // draw submarine
  submarine.draw(ctx);

  // show game interface
  ui.inGameInterface(ctx, score, lives);
}

function oceanBackground() {
  var grade = ctx.createRadialGradient(
    150 + giantBubble,
    150 + giantBubble,
    15,
    400 + giantBubble,
    400 + giantBubble,
    400 + giantBubble,
    150 + giantBubble
  );
  // movement speed
  giantBubble += 0.1;
  if (giantBubble >= 100000) {
    giantBubble = 0;
  }
  grade.addColorStop(0, "#1da2d8");
  grade.addColorStop(0.4, "#76b6c4");
  grade.addColorStop(0.8, "#005493");
  grade.addColorStop(1, "#064273");
  ctx.fillStyle = grade;
}

// call 60 times a second
setInterval(game, 1000 / 60);
