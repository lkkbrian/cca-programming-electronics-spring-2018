var circles = [];
var numberDots;

function setup() {
  createCanvas(300+random(100), 300+random(100));
  numberDots = 70 + random(30);
    
  for (var index = 0; index < numberDots; index = index + 1) {
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

  for (var index = 0; index < circles.length; index = index + 1) {
    var circle = circles[index];

    fill(circle.c);
    ellipse(circle.x, circle.y, 10);
    circle.x = circle.x + circle.xSpeed;
    circle.y = circle.y + circle.ySpeed;

    if (circle.x > width || circle.x < 0 ) {
      circle.xSpeed = -circle.xSpeed;
    }

    if (circle.y > height || circle.y < 0) {
      circle.ySpeed = -circle.ySpeed;
    }
  }
}
