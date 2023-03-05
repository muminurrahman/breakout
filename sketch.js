"use strict"

let pressed, rows, cols, total, wall, ball, player, state; 
let level = 1, lives = 3; 
let titleScreen, levelScreen, loseScreen;

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER);
  rectMode(CENTER);
  noCursor();

  titleScreen = gameScreen("blue", "BREAKOUT");
  loseScreen = gameScreen("red", "GAME OVER", "re");
  levelScreen = gameScreen("blue", "Level " + level);

  reset(1, 3);
}

function draw() {
  background(0);
  state();
}

function keyPressed() {
  if (keyCode === ENTER && state !== playScreen)
    state = playScreen;
}

function reset(r) {
  pressed = 0;
  rows = r;
  cols = 8;
  total = rows * cols;
  wall = [];
  ball = new Ball();
  player = new Paddle();

  for (let i = 0; i < cols; i++) {
    wall[i] = [];
    for (let j = 0; j < rows; j++) {
      wall[i][j] = new Brick(i * 50 + 25, j * 25 + 30);
    }
  }

  state = titleScreen;
}

function gameScreen(col, title, str="") {
  return function () {
    textSize(40);
    fill(col);
    text(title, width / 2, height / 2);
    textSize(25);
    fill("white");
    text("Press ENTER to " + str + "start", width / 2, height / 2 + 40);
  }
}

function displayText(str, n, x) {
  textSize(width / 16 - 10);
  fill("white");
  text(str + ": " + n, x - 30, 13);
}

function playScreen() {
  for (let i = 0; i < wall.length; i++) {
    for (let j = wall[i].length - 1; j >= 0; j--) {
      wall[i][j].render();
      if (wall[i][j].hit(ball) == 2) {
        wall[i][j].col = color(225);
        ball.ySpeed *= -1;
      } else if (wall[i][j].hit(ball) < 2) {
        wall[i].splice(j, 1);
        ball.ySpeed *= -1;
        total--;
      }
    }
  }

  ball.render();
  if (pressed === 0)
    ball.update(player.x, player.y - player.h / 2 - ball.r);
  ball.move();
  ball.bounce();
  ball.collides(player);
  if (ball.y - ball.r > height) {
    --lives;
    ball = new Ball(); // temp bug fix
    pressed = 0;

    if(lives < 1) {
      reset(1);
      lives = 3;
      state = loseScreen;
    }
  }

  player.render();
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.move(-9);
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.move(9);
  if (keyIsDown(32) && ++pressed == 1) ball.setVelocity(7);

  displayText("Level", level, 60);
  displayText("Lives", lives, width);
  
  if (total === 0) {
    reset(++rows);
    state = levelScreen;
  }
}