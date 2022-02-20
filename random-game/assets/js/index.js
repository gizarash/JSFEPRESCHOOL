const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d');
const bg = new Image();
const fg = new Image();
const bird = new Image();
const topPipe = new Image();
const bottomPipe = new Image();
const pipesGap = 100;
const gravity = 1.5;
const takeOffHeight = 25;
let posX = 10;
let posY = 250;

bg.src = "./assets/img/bg.png";
fg.src = "./assets/img/fg.png";
bird.src = "./assets/img/bird.png";
topPipe.src = "./assets/img/topPipe.png";
bottomPipe.src = "./assets/img/bottomPipe.png";

document.addEventListener('keydown', (e) => {
  if(e.code == 'Space') {
    posY -= takeOffHeight;
  }
});

function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(topPipe, 100, 0);
  ctx.drawImage(bottomPipe, 100, topPipe.height + pipesGap);
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, posX, posY);

  posY += gravity;
  requestAnimationFrame(draw);
}

function takeOff() {
  posY -= takeOffHeight;
}

bottomPipe.onload = draw;
