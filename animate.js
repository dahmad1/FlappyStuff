/**
*  handleShipAnimation moves the ship based on its direction and
*    keyboard control
*
*/

//a countdown to when the next obstacles will be produced. Reset when they are
var timeToBlocks = 180;

function HandleCircleAnimation() {
  if (CONTROLS.bird.jump) {
    BIRD.v-=2;
  }
  BIRD.y += BIRD.v;
  BIRD.v += BIRD.a;
  }

  function RenderCircle(context){
    context.stroke();
    context.beginPath();
     context.arc(100, 100, 25, 0, 2*Math.pi);
     context.strokeStyle = "#000000";
     context.stroke();
     context.fill();
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
    HandleCircleAnimation();
    HandleObstacleMovement(context);

    // 2 - Clear the CANVAS
    context.clearRect(0, 0, 600, 300);
    // 3 - Draw new items
    RenderCircle(context);
    RenderObstacles(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }

  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
