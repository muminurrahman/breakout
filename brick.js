class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 25;
    this.col = color(195);
    this.count = 3;

    this.render = function () {
      fill(this.col);
      rect(this.x, this.y, this.w, this.h);
    }

    this.hit = function (obj) {
      if (obj.x + obj.r > this.x - this.w / 2 &&
        obj.x - obj.r < this.x + this.w / 2 &&
        obj.y - obj.r < this.y + this.h / 2 &&
        obj.y + obj.r > this.y - this.h / 2) {
        return --this.count;
      }
    }
  }
}
