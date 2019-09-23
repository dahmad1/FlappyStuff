/**
*  handleShipAnimation moves the ship based on its direction and
*    keyboard control
*
*/
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

function RenderNewObject(context) {

  context.fillRect(NEWCOORD.newX, NEWCOORD.newY, 100, 100);
  }

function handleObstacleMovement(context) {
  NEWCOORD.newX = NEWCOORD.newX + 1;
}

/*
function HandleNewObjectMovement(context) {
    NEWCOORD.newX = NEWCOORD.newX + 1;
    NEWCOORD.newY = NEWCOORD.newY + 1;
}
*/

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  var myObstacle = new component(10, 200, "green", 300, 120);
  if (GAME.started) {
    // 1 - Reposition the objects
    //handleShipAnimation();
    //HandleNewObjectMovement(context);

    // 2 - Clear the CANVAS
    //context.clearRect(0, 0, 600, 300);
    myObstacle.update();
    // 3 - Draw new items
    //RenderSpaceship(context);
    //RenderNewObject(context);

  } else {
    context.font = "30px Arial";
    context.fillText("Game Over      Level " + GAME.level, 135, 200);
  }
  function update()
  {
    myObstacle.x += -1;
  }
  window.requestAnimationFrame(runGame);
}

window.requestAnimationFrame(runGame);
