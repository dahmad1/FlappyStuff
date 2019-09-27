/**
 *  handleShipAnimation moves the ship based on its direction and
 *    keyboard control
 *
 */

//a countdown to when the next obstacles will be produced. Reset when they are
var timeToBlocks = 180;
var score = 0;

function HandleCircleAnimation() {
  if (CONTROLS.bird.jump && BIRD.delay <= 0) {
    BIRD.v = -2.5;
    BIRD.delay = 40;
  }
  BIRD.delay--;
  BIRD.y += BIRD.v;
  BIRD.v += BIRD.a;
}

function RenderBird(context) {

  context.fillRect(BIRD.x, BIRD.y, 30, 30);
  if (BIRD.y + 30 > 300) {
    GAME.started = false;
  }

}

//draws all obstacles from the array OBSTACLES onto the screen
function RenderObstacles(context) {
  for (i = 0; i < OBSTACLE.length; i++) {
    context.fillRect(OBSTACLE[i].x, OBSTACLE[i].y, 50, 200);
  }
  for (i = 0; i < OBSTACLE.length; i++) {
    if (50 <= OBSTACLE[i].x && OBSTACLE[i].x <= 130) {
      if (i % 2 == 0) {
        if (BIRD.y < OBSTACLE[i].y + 200) {
          GAME.started = false;
        }
      } else {
        if (BIRD.y + 30 > OBSTACLE[i].y) {
          GAME.started = false;
        }
      }
    }
  }
  if (OBSTACLE.length > 0 && OBSTACLE[0].x == 100) {
    score++;
  }
}

//decides where the gap between new obstacles will be placed
function RandomHeight() {
  return Math.round(Math.random() * 200 - 200);
}


//moves all the obstacles, then creates new ones if 3 seconds have elapsed.
//also, deletes obstacles fromt the OBSTACLE array once they are off screen
function HandleObstacleMovement(context) {
  timeToBlocks--;
  if (timeToBlocks == 0) {
    var h = RandomHeight();
    OBSTACLE.push({
      x: 600,
      y: h
    });
    OBSTACLE.push({
      x: 600,
      y: h + 300
    });
    timeToBlocks = 180;
  }
  for (i = 0; i < OBSTACLE.length; i++) {
    OBSTACLE[i].x -= 1;
  }
  if (OBSTACLE.length > 0 && OBSTACLE[0].x <= -60) {
    OBSTACLE.shift();
    OBSTACLE.shift();
  }

}



function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {
    // 1 - Reposition the objects
    HandleCircleAnimation();
    HandleObstacleMovement(context);

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);
    // 3 - Draw new items
    context.fillStyle = "#000000";
    RenderBird(context);
    RenderObstacles(context);
    context.fillStyle = "#FFA71A";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 500, 20)

  } else {
    context.fillStyle = "#FFA71A";
    context.font = "30px Arial";
    context.fillText("Game Over      Score " + score, 135, 200);
  }

  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
