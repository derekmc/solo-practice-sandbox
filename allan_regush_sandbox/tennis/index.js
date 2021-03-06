let canvas;
let canvasContext;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

const ball = {
    x:75,
    y:75,
    deltaX: -2,
    deltaY: 2,
}

const paddle1 = {
    y: 10
}

const paddle2 = {
    y: 10
}

const score = {
    player1: 0,
    player2: 0
}

function init() {
    canvas.addEventListener('mousemove', function(evt) {
        const mousePos = calculateMousePos(evt);
        paddle1.y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}


window.onload = function() {
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');
    init();
    const fps = 30;
    setInterval(main, 1000/fps);
}

function main() {
    update();
    render();
}

function calculateMousePos(evt) {
    const root = document.documentElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left - root.scrollLeft;
    const mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function ballReset() {
    const value = Math.random();
    if  (value < 0.5) {
        ball.deltaX *= -1;
        ball.deltaY *= -1;
    } 
    ball.y = canvas.height / 2;
    ball.x = canvas.width / 2;
}

function update() {
    if(ball.y > canvas.height || ball.y < 0) {
        ball.deltaY *= -1;
    }
    if(ball.x < 20 + PADDLE_WIDTH) {
        if (ball.y > paddle1.y && ball.y < paddle1.y + PADDLE_HEIGHT) {
            ball.deltaX *= -1;
            calculateBallDeltaSpeed(paddle1.y);
        } else if (ball.x < 0) {
            score.player2++
            ballReset();
        }
    }
    if(ball.x > canvas.width - 20 - PADDLE_WIDTH) {
        if (ball.y > paddle2.y && ball.y < paddle2.y + PADDLE_HEIGHT) {
            ball.deltaX *= -1;
            calculateBallDeltaSpeed(paddle2.y);
        } else if (ball.x > canvas.width) {
            score.player1++
            ballReset();
        }
    }
    ball.y += ball.deltaY;
    ball.x += ball.deltaX;
}

function drawText(text, x, y) {
    canvasContext.font = '48px serif';
    canvasContext.fillText(text, x, y);
}

function calculateBallDeltaSpeed(paddleY) {
    const centerOfPaddle = paddleY + PADDLE_HEIGHT / 2;
    const ballDistFromCenterOfPaddle = ball.y - centerOfPaddle;
    ball.deltaX = ballDistFromCenterOfPaddle * 0.35;
}

function render() {
    blackoutCanvas();
    drawCircle('white', 10);
    drawRectangle(20, paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    drawRectangle(canvas.width - 30, paddle2.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    drawCircle();
    drawScore();
}

function drawScore() {
    drawText(score.player1.toString(), 100, 80);
    drawText(score.player2.toString(), canvas.width - 140, 80);
}

function blackoutCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0, canvas.width, canvas.height);
}


function drawRectangle(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function drawCircle(color, size) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, size, 0, Math.PI*2, true);
    canvasContext.fill();
}