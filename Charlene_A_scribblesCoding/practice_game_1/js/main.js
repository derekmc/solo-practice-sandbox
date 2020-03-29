var canvas, canvasContext;
var framesPerSecond = 30;

var p1 = new player();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  loadImages();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  p1.init(playerPic);
  initInput();  
}

function moveEverything() {
  p1.move();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  p1.draw();
}