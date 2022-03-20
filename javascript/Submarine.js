export default class Submarine {
  constructor(x, y, lives) {
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.width = 50;
    this.height = 50;
    // what frame are you on
    this.frames = 0;

    // player movement for destop/laptop
    document.addEventListener("mousemove", this.mousemove);

    // player movement for mobile
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchmove", this.touchmove);
  }

  // draw the submarine that the user will control
  draw(ctx) {
    this.drawPlayer(ctx);
  }
  // draw player and animation
  drawPlayer(ctx) {
    let base_image = new Image();
    // get the submarine image
    // base_image.src = "./../images/submarine.png";
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
    // this.x = e.x - this.width / 2;
    if ((this.x = e.x - this.width / 2)) {
      this.submarineAnimation();
    }
    if ((this.y = e.y - this.height / 2)) {
      this.submarineAnimation();
    }
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
  };
}
