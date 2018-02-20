var circles = [];
var numberDots = 0;
var maxNumberRandomDots = 100;
var playtimerangems = [5, 15];

function setup() {
  noStroke();
  colorMode(HSB, 360, 1, 1);
  createCanvas(300 + random(100), 300 + random(100));
  numberDots = numberDots + round(random(maxNumberRandomDots));

  for (var i = 0; i < numberDots; i++) {
    circles[i] = {
      x: width / 2,
      y: height / 2,
      xSpeed: random(-5, 5),
      ySpeed: random(-5, 5),
      hue: round(random(360)),
      osc: new p5.Oscillator(),
      startplaying: false,
      playtime: random(playtimerangems[1], playtimerangems[2]),
      starttime: NaN
    };
    circles[i].osc.setType('triangle');
    circles[i].osc.freq(100 + circles[i].hue);
    circles[i].osc.amp(0);
    circles[i].osc.start();
  }
}

function draw() {
  background(0);

  for (var i = 0; i < circles.length; i++) {

    if (isNaN(circles[i].starttime)) {
      fill(color(circles[i].hue, 1, 1));
    } else {
      fill(color(0, 0, 1));
    }

    ellipse(circles[i].x, circles[i].y, 10);
    circles[i].x = circles[i].x + circles[i].xSpeed;
    circles[i].y = circles[i].y + circles[i].ySpeed;

    if (circles[i].x > width || circles[i].x < 0) {
      circles[i].xSpeed = -circles[i].xSpeed;
      circles[i].startplaying = true;
    }

    if (circles[i].y > height || circles[i].y < 0) {
      circles[i].ySpeed = -circles[i].ySpeed;
      circles[i].startplaying = true;
    }

    if (circles[i].startplaying) {
      circles[i].osc.amp(.2, .01);
      circles[i].starttime = millis();
      circles[i].startplaying = false;
    }

    if (!isNaN(circles[i].starttime)) {
      var duration = millis() - circles[i].starttime;
      if (duration > circles[i].playtime) {
        circles[i].osc.amp(0, .04);
        circles[i].starttime = NaN;
      }
    }
  }
}

function mousePressed() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].xSpeed = random(-5, 5);
    circles[i].ySpeed = random(-5, 5);
    circles[i].osc.amp(0);
    circles[i].starttime = NaN;
    circles[i].startplaying = false;
  }
}
