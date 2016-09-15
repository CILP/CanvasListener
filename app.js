var renderizer = (function(){

  var context;
  var squares = [];
  var circles = [];

  function selectCanvas(id){

    var canvas = document.getElementById(id);
    context = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function(e){

      var x = e.offsetX,
          y = e.offsetY;

      squares.forEach(function(s){
        if (x >= s.x1 && x <= (s.x1 + s.x2) &&
            y >= s.y1 && y <= (s.y1 + s.y2)){

          s.color = '#0F0';
        } else {
          s.color = '#F00';
        }
      });

      circles.forEach(function(c){

        var dx = x - c.x
        var dy = y - c.y
        
        if ((dx * dx + dy * dy) <= c.r * c.r){
          c.color = '#0F0';
        } else {
          c.color = '#F00';
        }

      });
    });

    canvas = null;
  }

  function repaint(){
    window.requestAnimationFrame(repaint);

    cleanCanvas();

    squares.forEach(function(s){
      drawRect(s);
    });

    circles.forEach(function(c){
      drawCircle(c);
    });

  }

  function addRect(rect){
    squares.push(rect);
  }

  function addCircle(cir){
    circles.push(cir);
  }

  function drawCircle(cir){
    context.fillStyle = cir.color;
    context.arc(cir.x, cir.y, cir.r, 0, 2 * Math.PI, false);
    context.fill();
  }

  function init(){
    repaint();
  }

  function drawBackGround(){
    context.fillStyle = '#000';
    context.fillRect(0, 0, 640, 480);
  }

  function cleanCanvas(){
    context.clearRect(0, 0, 640, 480);
  }

  function drawRect(rect){
    context.fillStyle = rect.color;
    context.fillRect(rect.x1, rect.y1, rect.x2, rect.y2);
  }

  function getVirtualCanvas(){
    return document.createElement('canvas');
  }

  return {
    select: selectCanvas,
    addSquare: addRect,
    addCircle: addCircle,
    start: init
  };

})();

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 17);
  };
}());
