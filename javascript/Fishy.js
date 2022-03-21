export default class Fishy {
  // timer for frames
  framesTimer = 0;
  constructor(id, x, y, laserController) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.laserController = laserController;
    this.health = 5;
    this.width = 70;
    this.height = 70;
    this.frames = 1;
    // used for tracing submarine
    this.playerX = 0;
    this.moving = false;
    // fishy will trace submarine
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("touchstart", this.touchmove);
    document.addEventListener("touchmove", this.touchmove);
  }

  draw(ctx) {
    this.move();
    // draw fishy
    this.drawFishy(ctx);

    this.fireLaser();
  }
  // draw fishy and animation
  drawFishy(ctx) {
    let base_image = new Image();
    base_image.src = "images/fishy.png";
    // start crop from top left coner
    let startCropX = 70;
    let startCropY = 0;
    // crop to width of the original image
    let toCropWidth = 70;
    // crop to height of the original image
    let toCropHeight = 70;

    // add the fishy sprite
    ctx.drawImage(
      base_image,
      startCropX * this.frames,
      startCropY,
      toCropWidth,
      toCropHeight,
      this.x,
      this.y,
      70,
      70
    );

    base_image.onload = function () {};
  }
  // follow the mouse
  mousemove = (e) => {
    if (e.x) {
      this.playerX = e.x - this.width / 2;
      // player is moving
      this.moving = true;
    } else {
      this.moving = false;
    }
  };
  // if user touches the screen fire
  touchstart = (e) => {
    e.preventDefault();
    if (e.touches[0].clientX) {
      this.playerX = e.touches[0].clientX - this.width / 2;
      this.moving = true;
    } else {
      this.moving = false;
    }
  };
  // follow user's touch and fire
  touchmove = (e) => {
    e.preventDefault();
    if (e.touches[0].clientX) {
      this.playerX = e.touches[0].clientX - this.width / 2;
      this.moving = true;
    } else {
      this.moving = false;
    }
  };

  // fishy will constantly move down and follow player if player is moving
  move() {
    const delay = 4;
    this.y += 1;
    // change frames on fishy sprite with slow down
    if (this.framesTimer <= 0) {
      this.frames += 1;
      this.framesTimer = delay;
      if (this.frames >= 12) {
        this.frames = 1;
      }
    }
    this.framesTimer--;
    let dx = this.playerX - this.x;
    // if player is moving mouse fishy will move towards player
    if (this.moving) {
      this.x += dx / 100;
    }
  }

  fireLaser() {
    // laser will come out of the center and under fishy
    const laserX = this.x - 1 + this.width / 2;
    const laserY = this.y;

    // send x and y position to laser controller
    this.laserController.fireLaserFishy(laserX, laserY);
  }
  takeDamage(damage) {
    this.health -= damage;
  }
  // if player touches fishy send fishy back and take damage
  enemyHitRebound() {
    this.y -= 55;
    this.takeDamage(1);
  }
}
