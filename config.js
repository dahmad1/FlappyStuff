var GAME = {
  canvas : {
    width : 600,
    height : 300
  },
  started : true,
  level : 1
};

var SPACE_SHIP = {
  initialized : false,
  bullets : [],
  latest : {
    x : 0,
    y : 0
  }
};

var OBSTACLE = [];

var BIRD = {
  x : 100,
  y : 100,
  a : .06,
  v : 0,
  delay : 0
}
