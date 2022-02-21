const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d');
const bg = new Image();
const fg = new Image();
const bird = new Image();
const topPipe = new Image();
const bottomPipe = new Image();
const takeOffSound = new Audio();
const addScoreSound = new Audio();
const collisionSound = new Audio();
const pipesGap = 100;
const gravity = 1.5;
const takeOffHeight = 25;
const playBtn = document.querySelector('.play');
const gameOverText = document.querySelector('.game-over');
let posX = 10;
let posY = 200;
let isStarted = false;
let score = 0;

bg.src = "./assets/img/bg.png";
fg.src = "./assets/img/fg.png";
bird.src = "./assets/img/bird.png";
topPipe.src = "./assets/img/topPipe.png";
bottomPipe.src = "./assets/img/bottomPipe.png";

takeOffSound.src = "./assets/audio/take_off.mp3"
addScoreSound.src = "./assets/audio/add_score.mp3"
collisionSound.src = "./assets/audio/ouch.mp3"

document.addEventListener('keydown', (e) => {
  if(e.code == 'Space' && isStarted) {
    takeOff();
  }
});

cvs.addEventListener('click', (e) => {
  if(isStarted) {
    takeOff();
  }
});

playBtn.addEventListener('click', (e) => {
  playBtn.classList.add('hidden');
  gameOverText.classList.add('hidden');
  reset();
  isStarted = true;
  draw();
});

let pipes = [];

function reset() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  score = 0;
  posX = 10;
  posY = 250;
  isStarted = false;
  pipes = [];
  pipes.push({
    x: cvs.width,
    y: Math.floor(Math.random() * topPipe.height) - topPipe.height
  });
}

function draw() {
  ctx.drawImage(bg, 0, 0);
  
  for (let i = 0; i < pipes.length; i++) {
    ctx.drawImage(topPipe, pipes[i].x, pipes[i].y);
    ctx.drawImage(bottomPipe, pipes[i].x, pipes[i].y + topPipe.height + pipesGap);
    pipes[i].x--;
    
    if (pipes[i].x == 100) {
      pipes.push({
        x: cvs.width,
        y: Math.floor(Math.random() * topPipe.height) - topPipe.height
      })
    }

    if (posX + bird.width > pipes[i].x && posX < pipes[i].x + topPipe.width 
      && (posY < pipes[i].y + topPipe.height || posY + bird.height > pipes[i].y + topPipe.height + pipesGap)
      || posY + bird.height > cvs.height - fg.height) {
        isStarted = false;
        collisionSound.play();
        playBtn.classList.remove('hidden');
        gameOverText.classList.remove('hidden');
    }

    if (pipes[i].x + topPipe.width == 10) {
      score += 10;
      addScoreSound.play();
    }
  }

  if (pipes.length > 0 && pipes[0].x+topPipe.width <= 0) {
    pipes.shift();
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, posX, posY);

  posY += gravity;

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 100, cvs.height - 70);

  ctx.fillStyle = "#FF0000";
  ctx.font = "16px Arial";
  ctx.fillText("Use left click or 'space' button to fly", 20, cvs.height - 20);

  if (isStarted) {
    requestAnimationFrame(draw); 
  }
}

function takeOff() {
  posY -= takeOffHeight;
  takeOffSound.play();
}

bottomPipe.onload = draw;
