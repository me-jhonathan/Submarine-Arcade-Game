export default class Laser {
  constructor(id, x, y, width, height, speed, damage, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  // properties of laser
  draw(ctx) {
    ctx.fillStyle = this.color;
    // if player is shooting
    if (this.id == 1) {
      this.y -= this.speed;
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
