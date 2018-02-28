// VARIABLES and DATA MODEL
var paddle1, paddle2, ball;
var player1score, player2score;
var boundaries;
var boop_oscillator;
var point_sound;
var win_sound;
var keyspressed = {
  a: false,
  z: false,
  k: false,
  m: false,
  spacebar: false
};

var GAMESTATE = 'START_GAME';
// 'GAME_OVER', 'POINT_OVER', 'IN_PLAY'



function preload() {
  // get sounds ready 
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  // print('in the draw loop');
  background(0);
  getUserInput(); // take keyboard input
  updateGameState(); // check events and update positions, points, etc 
  displayStuff(); // draw all the things  

}

// start of the GAME.  
// initializes the variables, uses the canvas size
function initializeGame() {
  
  player1score = 0; // putting this here may produce a bug... can you figure out why? ;) 
  player2score = 0; // putting this here may produce a bug... can you figure out why? ;)

  // leave a strip for score that is 80 pixels wide
  boundaries = {
    upperleftx: 50,
    upperlefty: 80,
    lowerrightx: width - 50,
    lowerrighty: height - 80,
  }
  paddle1 = {
    x: boundaries.upperleftx,
    y: height / 2,
    w: 5,
    length: 50
    // speed: ??? 
  }
  paddle2 = {
    x: boundaries.lowerrightx,
    y: height / 2,
    w: 5,
    length: 50
    // speed: ??? 
  }
  ball = {
    x: width / 2,
    y: height / 2,
    xspeed: 1,
    yspeed: 1
  }
}

function displayStuff() {
  // print('actually drawing stuff :/')

  colorMode(RGB, 255, 255, 255);
  fill(color(255, 255, 255));

  // draw paddle 1 
  rect(paddle1.x, paddle1.y, paddle1.w, paddle1.length);

  // draw paddle 2 
  rect(paddle2.x, paddle2.y, paddle2.w, paddle2.length);

  ellipse(ball.x, ball.y, 10);
}

// take keyboard input
function getUserInput() {
  if (keyIsDown(65)) {
    keyspressed.a = true;
    //print('read a');
  } else {
    keyspressed.a = false;
  }
  if (keyIsDown(90)) {
    //print('read z');
    keyspressed.z = true;
  } else {
    keyspressed.z = false;
  }
  if (keyIsDown(75)) {
    keyspressed.k = true;
    //print('read k');
  } else {
    keyspressed.k = false;
  }
  if (keyIsDown(77)) {
    keyspressed.m = true;
    //print('read m');
  } else {
    keyspressed.m = false;
  }
  if (keyIsDown(32)) {
    keyspressed.spacebar = true;
    //print('read spacebar');
  } else {
    keyspressed.spacebar = false;
  }
}

// check events and update positions, points, etc 
function updateGameState() {
  // 'START_GAME';
  // print(' GAMESTATE is ' , GAMESTATE);
  if (GAMESTATE == 'START_GAME') {
    initializeGame();
    if (keyspressed.spacebar) {
      print('starting game');
      GAMESTATE = 'IN_PLAY';
    };
  } else if (GAMESTATE == 'GAME_OVER') {
    // display "play again"
    if (keyspressed.spacebar) {
      GAMESTATE = 'START_GAME'
    };
  } else if (GAMESTATE == 'POINT_OVER') {
    if ((player1score >= 10) || (player2score >= 10)) {
      GAMESTATE = 'GAME_OVER';
    } else if (keyspressed.spacebar) {
      GAMESTATE = 'IN_PLAY';
    };
  } else { // 'IN_PLAY' 

    // update ball position
    ball.x = ball.x + ball.xspeed;
    ball.y = ball.y + ball.yspeed;

    // update paddle position
    if (keyspressed.a) { 
      paddle1.y = paddle1.y -3;
    }
    if (keyspressed.z) { 
      paddle1.y = paddle1.y +3;
    }
    if (keyspressed.k) { 
      paddle2.y = paddle2.y -3;
    }
    if (keyspressed.m) { 
      paddle2.y = paddle2.y +3;
    }
    
    
    // check if ball hit the top -> reverse y direction 
    if (ball.y <= boundaries.upperlefty) {
      ball.yspeed = -ball.yspeed;
    }

    // check if ball hit the bottom -> reverse y direction 
    if (ball.y >= boundaries.lowerrighty) {
      ball.yspeed = -ball.yspeed;
    }

    // check ball hit paddle2 -> play sound / reverse x direction
    if ((ball.x >= boundaries.lowerrightx) &&
      (ball.y >= paddle2.y) &&
      (ball.y <= (paddle2.y + paddle2.length))) {
        ball.xspeed = -ball.xspeed;
      }
     // check ball hit paddle1 -> play sound / reverse x direction
    if ((ball.x <= boundaries.upperleftx) &&
      (ball.y >= paddle1.y) &&
      (ball.y <= (paddle1.y + paddle1.length))) {
        ball.xspeed = -ball.xspeed;
      }
        
      // check ball gone out of bounds -> play sound / 'POINT_OVER'
      //    if (ball.x <= boundaries.upperleftx) {
      //      player2score = player2score + 1;
      //    } else if (ball.x >= boundaries.lowerrightx) {
      //      player1score = player1score + 1;
      //    }
    }
  }
