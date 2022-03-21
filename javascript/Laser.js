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
      // laser moves upwards
      this.y -= this.speed;
    }
    // if enemy is shooting
    if (this.id == 2) {
      // laser moves downwards
      this.y += this.speed;
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  // using axis-aligned bounding box to detect collision
  laserToOpponentCollision(opponent) {
    if (
      this.x < opponent.x + opponent.width &&
      this.x + this.width > opponent.x &&
      this.y < opponent.y + opponent.height &&
      this.y + this.height > opponent.y
    ) {
      // collision detected!
      opponent.takeDamage(this.damage);
      return true;
    } else {
      // no collision
      return false;
    }
  }
}
