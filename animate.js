/**
*  handleShipAnimation moves the ship based on its direction and
*    keyboard control
*
*/

//a countdown to when the next obstacles will be produced. Reset when they are
var timeToBlocks = 180;

function handleShipAnimation() {
  if (CONTROLS.ship.forward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
    cos = Math.cos(radians),
    sin = Math.sin(radians);
    SPACE_SHIP.x += SPACE_SHIP.speed * sin;
    SPACE_SHIP.y +=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.backward) {
    var radians = (Math.PI / 180) * SPACE_SHIP.rotation,
    cos = Math.cos(radians),
    sin = Math.sin(radians);
    SPACE_SHIP.x -= SPACE_SHIP.speed * sin;
    SPACE_SHIP.y -=  SPACE_SHIP.speed * cos;
  }
  if (CONTROLS.ship.rotateClockwise) {
    SPACE_SHIP.rotation -= 4;
  }
  if (CONTROLS.ship.rotateCounterClockwise) {
    SPACE_SHIP.rotation += 4;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}

//draws all obstacles from the array OBSTACLES onto the screen
function RenderObstacles(context) {
  for (i = 0; i< OBSTACLE.length; i++){
    context.fillRect(OBSTACLE[i].x, OBSTACLE[i].y, 50, 200);
  }
  }

  //decides where the gap between new obstacles will be placed
  function RandomHeight(){
    return Math.round(Math.random()*200 -200);
  }


//moves all the obstacles, then creates new ones if 3 seconds have elapsed.
//also, deletes obstacles fromt the OBSTACLE array once they are off screen
function HandleObstacleMovement(context) {
      timeToBlocks--;
      if (timeToBlocks==0){
        var h = RandomHeight();
        OBSTACLE.push({x: 600, y: h});
        OBSTACLE.push({x: 600, y: h+300});
        timeToBlocks=180;
      }
      for (i = 0; i< OBSTACLE.length; i++){
        OBSTACLE[i].x -=1;
      }
      if (OBSTACLE.length>0 && OBSTACLE[0].x<=-60){
        OBSTACLE.shift();
        OBSTACLE.shift();
      }
}



function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {
    // 1 - Reposition the objects
    //handleShipAnimation();
    HandleObstacleMovement(context);

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);
    // 3 - Draw new items
    //RenderSpaceship(context);
    RenderObstacles(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }

  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
