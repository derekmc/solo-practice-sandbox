const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;

const KEY_DOWN_ARROW = 40;

let holdLeft = false;
let holdRight = false;
let holdUp = false;
let holdDown = false;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
  if(thisKey == KEY_LEFT_ARROW) {
    holdLeft = setTo;
  }
  if(thisKey == KEY_RIGHT_ARROW) {
    holdRight = setTo;
  }
  if(/*thisKey == KEY_UP_ARROW ||*/ thisKey == KEY_SPACE) {
    if(jumperOnGround) {
      jumperSpeedY = -JUMP_POWER;
    }
  }
  if(thisKey == KEY_UP_ARROW) {
    holdUp = setTo;
  }
  if(thisKey == KEY_DOWN_ARROW) {
    holdDown = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}