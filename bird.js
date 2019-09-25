
// Populate a global variable for the spaceship
function InitializeBird() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);
  var BIRD = {
    x : 100,
    y : 100,
    a : .001,
    v : 0
  }
}
