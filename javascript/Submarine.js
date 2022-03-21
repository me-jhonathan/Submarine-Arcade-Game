export default class Submarine {
  constructor(x, y, widthCanvas, heightCanvas, lives, laserController) {
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.laserController = laserController;
    this.width = 50;
    this.height = 50;
    // what frame are you on
    this.frames = 0;

    // player movement for destop/laptop
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("mouseleave", this.mouseleave);

    // player movement for mobile
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchmove", this.touchmove);
    document.addEventListener("touchend", this.touchend);
  }

  // draw the submarine that the user will control
  draw(ctx) {
    this.drawPlayer(ctx);
    this.fireLaser();
  }
  // draw player and animation
  drawPlayer(ctx) {
    let base_image = new Image();
    // get the submarine image
    base_image.src = "images/submarine.png";

    // start crop from top left coner
    let startCropX = 50;
    let startCropY = 0;
    // crop to width of the original image
    let toCropWidth = 50;
    // crop to height of the original image
    let toCropHeight = 50;

    // add the submarine sprite
    ctx.drawImage(
      base_image,
      startCropX * this.frames,
      startCropY,
      toCropWidth,
      toCropHeight,
      this.x,
      this.y,
      50,
      50
    );
    base_image.onload = function () {};
  }

  // fire laser from submarine
  fireLaser() {
    if (this.fire) {
      // laser will come out of the center of the submarine
      const laserX = this.x - 1 + this.width / 2;
      const laserY = this.y;

      // send x and y position to laser controller
      this.laserController.fireLaserSubmarine(laserX, laserY);
    }
  }

  // control submarine animation
  submarineAnimation() {
    this.frames++;
    // if (this.frames >= 9) {
    if (this.frames >= 14) {
      this.frames = 0;
    }
  }
  // player movement - follow the mouse
  mousemove = (e) => {
    if ((this.x = e.x - this.width / 2)) {
      this.submarineAnimation();
    }
    if ((this.y = e.y - this.height / 2)) {
      this.submarineAnimation();
    }
  };
  // if left mouse button is pressed
  mousedown = () => {
    this.fire = true;
  };
  mouseup = () => {
    this.fire = false;
  };
  // if user moves mouse off screen
  mouseleave = () => {
    this.fire = false;
  };
  // if user touches the screen fire
  touchstart = (e) => {
    e.preventDefault();
    this.x = e.touches[0].clientX - this.width / 2;
    this.y = e.touches[0].clientY - this.height / 2;
  };
  // follow user's touch and fire
  touchmove = (e) => {
    e.preventDefault();
    if ((this.x = e.touches[0].clientX - this.width / 2)) {
      this.submarineAnimation();
    }
    if ((this.y = e.touches[0].clientY - this.height / 2)) {
      this.submarineAnimation();
    }
    this.fire = true;
  };
  // stop firing if user is not touching screen
  touchend = (e) => {
    e.preventDefault();
    this.fire = false;
  };
}
