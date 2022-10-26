"use strict"

let pressed, rows, cols, total, wall, ball, player, state; 
let lives = 3;

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER);
  rectMode(CENTER);
  noCursor();
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

function titleScreen() {
  textSize(40);
  fill("blue");
  text("BREAKOUT", width / 2, height / 2);
  textSize(25);
  fill("white");
  text("Press ENTER to start", width / 2, height / 2 + 40);
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
  if (ball.y - ball.r * 2 > height) {
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

  displayLevel();
  displayLives();

  if (total === 0) {
    reset(++rows);
    state = levelScreen;
  }
}

function displayLevel() {
  textSize(16);
  fill("white");
  text("Level: " + rows, 30, 13);
}

function displayLives() {
  textSize(16);
  fill("white");
  text("Lives: " + lives, width-30, 13);
}

function levelScreen() {
  textSize(40);
  fill("blue");
  text("Level " + rows, width / 2, height / 2);
  textSize(25);
  fill("white");
  text("Press ENTER to start", width / 2, height / 2 + 40);
}

function loseScreen() {
  textSize(40);
  fill("red");
  text("GAME OVER", width / 2, height / 2);
  textSize(25);
  fill("white");
  text("Press ENTER to restart", width / 2, height / 2 + 40);
}
