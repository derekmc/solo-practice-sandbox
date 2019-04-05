var showingMenuScreen = true; //// changed from "win" to "menu"
var twoPlayerMode = true;

const WINNING_SCORE = 11;

// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

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
 
  setupInputEventHandlers();
    
  ballReset();
    
  // lets set all text in the program to be centered instead of left justified
  canvasContext.textAlign = 'center';
  // we could override this by setting it otherwise, but if we don't ever change
  // it then it will just stay centered for any text calls
}

function moveEverything() {
  if(showingMenuScreen) { ////
    return;
  }

  if(twoPlayerMode) {
    twoPlayerKeyControls();
  } else {
    moveComputerPaddle();
  }
  
  ballMove();
}

function drawEverything() {
    drawBitmapPositionedByTopLeftCorner(backgroundPic, 0.0, 0.0);

  if(showingMenuScreen) { ////
    if(paddle1Score >= WINNING_SCORE) {
      colorText("LEFT PLAYER WINS!",canvas.width/2,canvas.height/2,'white');
    } else if(paddle2Score >= WINNING_SCORE) {
      colorText("RIGHT PLAYER WINS!",canvas.width/2,canvas.height/2,'white');
    }
    
    colorText("-- press 1 for one player with mouse, press 2 for two player with W/S and arrow keys --", ////
                canvas.width/2,canvas.height-20,'white');
  } else { 
    paddlesDraw(); 
    
    // draw the ball
    ballDraw();
  }
  // display text on screen - will be used for score
  colorText(paddle1Score,100,100,'white');
  colorText(paddle2Score,canvas.width-100,100,'white');
}