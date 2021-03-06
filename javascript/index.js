import UI from "./UI.js";
import Submarine from "./Submarine.js";
import LaserController from "./LaserController.js";
import EnemyController from "./EnemyController.js";
import ParticlesController from "./ParticlesController.js";

// get canvas from index.html
const canvas = document.getElementById("Submarine-Game");

// get restart button/text from index.html
const restartBtn = document.querySelector("#restartBtn");
const endScreen = document.querySelector("#endScreen");

const endScreenBlob = document.querySelector("#endScreenBlob");

// show user their score at the end
const userScore = document.querySelector("#userScore");
const userHighScore = document.querySelector("#highScore");

// hide restart button/text
restartBtn.style.display = "none";
endScreen.style.display = "none";
endScreenBlob.style.display = "none";

// get context used for drawing
const ctx = canvas.getContext("2d");

// canvas will cover the entire width and height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// variables to store score, high score, and lives
let score = 0;
let highScore = 0;
let lives = 3;

// rate of change for background giant bubble
let giantBubble = 0;

// timer used to show instructions UI
let uiTimer = 0;

// timer used for making less bubbles if on mobile for better performance
let mobileBubbleTimer = 0;

// objects
let ui = new UI(canvas);
let laserController = new LaserController(canvas);
let particlesController = new ParticlesController(canvas);
let submarine = new Submarine(
  // submarine placement
  canvas.width / 2,
  canvas.height / 1.5,
  canvas.width,
  canvas.height,
  lives,
  laserController
);
let enemyController = new EnemyController(
  canvas,
  canvas.width,
  canvas.height,
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
  if (ui.isGameOver(ctx, lives, checkIfMobile())) {
    // show restart button/text
    restartBtn.style.display = "flex";
    endScreen.style.display = "flex";
    endScreenBlob.style.display = "flex";
    // show user their score
    userScore.innerHTML = score;
    // show user their high score
    highScore == 0
      ? (userHighScore.innerHTML = score)
      : (userHighScore.innerHTML = highScore);

    // get out of gameloop
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
    ui.startmenu(ctx, checkIfMobile());
  } else {
    // draw enemy after instructions
    enemyController.draw(ctx, score);
  }

  // draw lasers
  laserController.draw(ctx, canvas.height);

  // draw submarine
  submarine.draw(ctx);

  // if not on mobile draw normal amount of bubbles
  if (!checkIfMobile()) {
    // draw bubbles in the background
    particlesController.backgroundbubbles(canvas.width, canvas.height);
    // if on mobile make less bubbles for better performance
  } else {
    if (mobileBubbleTimer >= 10) {
      particlesController.backgroundbubbles(canvas.width, canvas.height);
      mobileBubbleTimer = 0;
    }
  }

  // timer for next bubble cycle on mobile
  mobileBubbleTimer++;

  // draw particles
  particlesController.draw(ctx);

  // check if submarine laser is hitting enemy
  submarineLaserCollision();

  // check if enemy is touching submarine or if enemy laser is touching submarine
  enemyCollision();

  // show game interface
  ui.inGameInterface(ctx, score, lives, checkIfMobile());
}

// check if submarine laser is hitting enemy
function submarineLaserCollision() {
  enemyController.enemyArmy.forEach((enemy) => {
    if (laserController.laserCollision(enemy, 1)) {
      // if enemy health is less than 0 add to score
      if (enemy.health === 0 && enemy.id == 2) {
        particlesController.seaMine(
          enemy.x,
          enemy.y,
          enemy.width,
          enemy.height
        );
        // if sea mine is destroyed add 100 to score
        score += 100;
      }
      if (enemy.health === 0 && enemy.id == 3) {
        particlesController.fishy(enemy.x, enemy.y, enemy.width, enemy.height);
        // if fishy is destroyed add 300 to score
        score += 300;
      }
      if (enemy.health === 0 && enemy.id == 4) {
        particlesController.boss(enemy.x, enemy.y, enemy.width, enemy.height);
        // if boss is destroyed add 800 to score
        score += 800;
      }
    }
  });
}

// check if enemy is touching submarine
function enemyCollision() {
  if (
    enemyController.collisionDetection(submarine) ||
    laserController.laserCollision(submarine, 2)
  ) {
    // remove one live per hit and make sure lives don't go under 0
    if (--lives < 0) {
      lives = 0;
    }
    particlesController.submarine(
      submarine.x,
      submarine.y,
      submarine.width,
      submarine.height,
      // if submarine losses bigger explosion
      lives == 0 ? 10 : 1
    );
  }
}

// draw ocean background
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

// reset game objects and reset lives and score
function restartGame() {
  lives = 3;

  // store the high score
  if (score > highScore) {
    highScore = score;
  }

  // zero out score for next game
  score = 0;
  ui = new UI(canvas);
  laserController = new LaserController(canvas);
  particlesController = new ParticlesController(canvas);
  submarine = new Submarine(
    // submarine placement
    canvas.width / 2.1,
    canvas.height / 2.2,
    canvas.width,
    canvas.height,
    lives,
    laserController
  );
  enemyController = new EnemyController(
    canvas,
    canvas.width,
    canvas.height,
    laserController
  );
  // hide restart button/text
  restartBtn.style.display = "none";
  endScreen.style.display = "none";
  endScreenBlob.style.display = "none";
}

// if user clicks on 'restart' button call restart game
restartBtn.addEventListener("click", (e) => {
  restartGame();
});

// if user taps on 'restart' button call restart game
restartBtn.addEventListener("touchstart", (e) => {
  restartGame();
});

// call 60 times a second
setInterval(game, 1000 / 60);
