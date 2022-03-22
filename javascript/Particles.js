export default class Particles {
  constructor(x, y, spreadSpeed, speedX, speedY, radius, fadeRate, color) {
    this.x = x;
    this.y = y;
    this.spreadSpeed = spreadSpeed;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.fade = 1;
    this.fadeRate = fadeRate;
    this.color = color;
  }
  draw(ctx) {
    // Save the default state
    ctx.save();
    // after a while particles will disapper
    ctx.globalAlpha = this.fade;
    this.fadeOut();
    // movement pattern
    this.move();

    // draw particles
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.color;
    ctx.stroke();

    // restore the default state
    ctx.restore();
  }
  // movement of particles
  move() {
    this.x += this.speedX * this.spreadSpeed;
    this.y += this.speedY * this.spreadSpeed;
  }
  // rate of fade on particles
  fadeOut() {
    this.fade -= this.fadeRate;
  }
}
