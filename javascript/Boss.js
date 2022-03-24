export default class Boss {
  // timer for frames
  framesTimer = 0;
  constructor(id, x, y, laserController) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.laserController = laserController;
    this.health = 20;
    this.width = 150;
    this.height = 150;
    this.frames = 1;
    // used for tracing submarine
    this.playerX = 0;
    this.moving = false;
    // boss will trace submarine
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("touchstart", this.touchmove);
    document.addEventListener("touchmove", this.touchmove);
  }

  draw(ctx) {
    this.move();
    // draw boss
    this.drawBoss(ctx);

    this.fireLaser();
  }
  // draw boss and animation
  drawBoss(ctx) {
    let base_image = new Image();
    base_image.src = "images/boss.png";
    // start crop from top left coner
    let startCropX = 150;
    let startCropY = 0;
    // crop to width of the original image
    let toCropWidth = 150;
    // crop to height of the original image
    let toCropHeight = 150;

    // add the boss sprite
    ctx.drawImage(
      base_image,
      startCropX * this.frames,
      startCropY,
      toCropWidth,
      toCropHeight,
      this.x,
      this.y,
      150,
      150
    );

    base_image.onload = function () {};
  }
  // follow the mouse
  mousemove = (e) => {
    if (e.x) {
      this.playerX = e.x;
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

  // boss will constantly move down and follow player slowly if player is moving
  move() {
    const delay = 4;
    this.y += 0.5;
    // change frames on boss sprite with slow down
    if (this.framesTimer <= 0) {
      this.frames += 1;
      this.framesTimer = delay;
      if (this.frames >= 11) {
        this.frames = 1;
      }
    }
    this.framesTimer--;
    let dx = this.playerX - this.x;
    // if player is moving submarine boss will move towards player slowly
    if (this.moving) {
      this.x += dx / 700;
    }
  }
  fireLaser() {
    // laser will come out of the center and under boss
    const laserX = this.x - 1 + this.width / 2;
    const laserY = this.y;

    // send x and y position to laser controller
    this.laserController.fireLaserBoss(laserX, laserY);
  }
  takeDamage(damage) {
    this.health -= damage;
  }
  // if player touches fishy send boss back and take damage
  enemyHitRebound() {
    this.y -= 50;
    this.takeDamage(1);
  }
}
