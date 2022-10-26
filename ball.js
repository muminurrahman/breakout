class Ball {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.r = 6;
    this.xSpeed = 0;
    this.ySpeed = 0;

    this.render = function () {
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.r * 2);
    }

    this.update = function (x, y) {
      this.x = x;
      this.y = y;
    }

    this.setVelocity = function (m) {
      this.xSpeed = (this.x > width / 2) ? m : -m;
      this.ySpeed = -m;
    }

    this.move = function () {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }

    this.bounce = function () {
      if (this.x - this.r < 0 || this.x + this.r > width)
        this.xSpeed = -this.xSpeed;
      if (this.y - this.r <= 0)
        this.ySpeed = -this.ySpeed;
    }

    this.collides = function (obj) {
      let diff, angle;

      if (this.x - this.r <= obj.x + obj.w / 2 &&
        this.x + this.r >= obj.x - obj.w / 2 &&
        this.y - this.r <= obj.y + obj.h / 2 &&
        this.y + this.r >= obj.y - obj.h / 2) {
        if (this.y > obj.y) {
          diff = this.x - (obj.x - obj.w / 2);
          angle = map(diff, 0, obj.w, radians(-135), radians(-45));
          this.xSpeed = 10 * cos(angle);
          this.ySpeed = 10 * sin(angle);
          this.y = obj.y - obj.h / 2 - this.r / 2;
        }
      }
    }
  }
}