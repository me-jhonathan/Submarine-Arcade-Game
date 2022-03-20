export default class SeaMine {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = 3;
    this.width = 50;
    this.height = 50;
    // swerve pattern movemnet for sea mine
    this.swerve = 0;
    this.frames = 1;
  }
  nextFrameTimer = 0;

  draw(ctx) {
    this.move();

    // draw sea mine
    this.drawSeaMine(ctx);
  }

  // draw sea mine and animation
  drawSeaMine(ctx) {
    let base_image = new Image();
    base_image.src = "images/sea_mine.png";
    // start crop from top left coner
    let startCropX = 60;
    let startCropY = 0;
    // crop to width of the original image
    let toCropWidth = 60;
    // crop to height of the original image
    let toCropHeight = 60;

    // add the sea mine sprite
    ctx.drawImage(
      base_image,
      startCropX * this.frames,
      startCropY,
      toCropWidth,
      toCropHeight,
      this.x,
      this.y,
      60,
      60
    );

    base_image.onload = function () {};
  }

  move() {
    this.y += 1;

    // timer for next frame
    const frameDelay = 7;
    // change frames on sea mine sprite with slow down
    if (this.nextFrameTimer <= 0) {
      this.frames += 1;
      this.nextFrameTimer = frameDelay;
      // if (this.frames >= 32) {
      if (this.frames >= 27) {
        this.frames = 1;
      }
    }
    this.nextFrameTimer--;

    // movenment pattern for sea mine
    if (this.swerve <= 90) {
      this.x -= 1;
      this.swerve++;
    }
    if (this.swerve > 90 && this.swerve < 180) {
      this.swerve++;
      this.x += 1;
    }
    //console.log(this.swerve);
    if (this.swerve >= 180) {
      this.swerve = 0;
    }
  }
  takeDamage(damage) {
    this.health -= damage;
  }
  // if player touches sea mine send sea mine back and take damage
  seaMineHitRebound() {
    this.y -= 60;
    this.takeDamage(1);
  }
}
