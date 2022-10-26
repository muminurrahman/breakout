class Paddle {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.w = 100;
    this.h = 10;

    this.render = function () {
      fill(0, 0, 255);
      rect(this.x, this.y, this.w, this.h, this.w/20);
    }

    this.move = function (dir) {
      this.x += dir;

      if (this.x - this.w / 2 < 0)
        this.x = 0 + this.w / 2;
      else if (this.x + this.w / 2 > width)
        this.x = width - this.w / 2;
    }
  }
}
