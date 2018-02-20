var circles = [];

function setup() {
  createCanvas(400, 400);

  for (var index = 0; index < 100; index = index + 1) {
    circles[index] = {
      x: width / 2,
      y: height / 2,
      xSpeed: random(-5, 5),
      ySpeed: random(-5, 5),
      c: color(random(255), random(255), random(255))
    };
  }
}

function draw() {
  background(0);
  noStroke();

  for (var index = 0; index < 100; index = index + 1) {
    var circle = circles[index];

    fill(circle.c);
    ellipse(circle.x, circle.y, 10);
    circle.x = circle.x + circle.xSpeed;
    circle.y = circle.y + circle.ySpeed;

    if (circle.x > width - 5) {
      circle.xSpeed = -circle.xSpeed;
    }

    if (circle.y > height - 5) {
      circle.ySpeed = -circle.ySpeed;
    }

    if (circle.x < 5) {
      circle.xSpeed = -circle.xSpeed;
    }

    if (circle.y < 5) {
      circle.ySpeed = -circle.ySpeed;
    }
  }
}
