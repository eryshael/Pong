// Init

// Canvas
const canvas = document.querySelector(`#canvas`);
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
game = true;
context.fillStyle = "#DDD";
context.font = "32px Arial";

// Player 1
const p1W = 12;
const p1H = 64;
let p1X = 16;
let p1Y = height / 2 - p1H / 2;
let p1Score = 0;

context.fillRect(p1X, p1Y, p1W, p1H);
context.fillText(p1Score, width / 4 - 12, 40);

// Player 2
const p2W = p1W;
const p2H = p1H;
let p2X = width - p2W - 16;
let p2Y = height / 2 - p2H / 2;
let p2Score = 0;
context.fillText(p2Score, (width / 4) * 3 - 12, 40);

context.fillRect(p2X, p2Y, p2W, p2H);

// Ball
const ballW = 16;
const ballH = 16;
let ballOriginX = width / 2 - ballW / 2;
let ballOriginY = height / 2 - ballH / 2;
let ballPrevX = (ballX = ballOriginX);
let ballY = ballOriginY;
let ballDX = 8;
let ballDY = 4;

context.fillRect(ballX, ballY, ballW, ballH);

// Key handler
const keysDown = new Set();
document.addEventListener("keydown", (e) => keysDown.add(e.key));
document.addEventListener("keyup", (e) => keysDown.delete(e.key));

function update() {
  // Ball collision against wall
  if (ballX + ballW >= width) {
    ballDX = -ballDX;
    ballX = ballOriginX;
    ballY = ballOriginY;
    p1Score++;
    if (p1Score == 11) game = false;
  }

  if (ballX <= 0) {
    ballDX = -ballDX;
    ballX = ballOriginX;
    ballY = ballOriginY;
    p2Score++;
    if (p2Score == 11) game = false;
  }

  if (ballY + ballH >= height) {
    ballDY = -ballDY;
  }
  if (ballY <= 0) {
    ballDY = -ballDY;
  }
  // ballPrevX = ballX
  // ballX += ballDX;
  // ballY += ballDY;

  // Ball collision against P1
  if (ballX <= p1X + p1W && ballY >= p1Y && ballY <= p1Y + p1H) {
    ballDX = -ballDX;
  }

  // Ball collision against P2
  if (ballX + ballW >= p2X && ballY >= p2Y && ballY <= p2Y + p2H) {
    ballDX = -ballDX;
  }

  if (keysDown.has("w") && p1Y >= 0) p1Y -= 4;
  if (keysDown.has("s") && p1Y + p1H <= height) p1Y += 4;
  if (keysDown.has("ArrowUp") && p2Y >= 0) p2Y -= 4;
  if (keysDown.has("ArrowDown") && p2Y + p2H <= height) p2Y += 4;
}

function draw() {
  context.clearRect(0, 0, width, height); // Clear canvas
  context.fillRect(p1X, p1Y, p1W, p1H); // Draw P1
  context.fillRect(p2X, p2Y, p2W, p2H); // Draw P2
  context.fillRect(ballX, ballY, ballW, ballH); // Draw Ball
  context.fillText(p1Score, width / 4 - 12, 40);
  context.fillText(p2Score, (width / 4) * 3 - 12, 40);
}

setInterval(() => {
  if (game) {
    update();
    draw();
  }
}, 1000 / 60);
