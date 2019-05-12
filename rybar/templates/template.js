function init() {
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  t = 0;
  elapsed = 0;
  circleX = 0;
  circleY = 0;
  c.width = 512;
  c.height = 512;
}

function loop(dt){

    let now = new Date().getTime();
    dt = Math.min(1, (now - last) / 1000);
    t += dt;

    step(dt);
    draw(dt);

  requestAnimationFrame(loop);
}

function step(dt){

}

function draw(dt){

}

init();
