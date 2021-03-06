function init() {
  
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  t = 0;
  elapsed = 0;
  c.width = 512;
  c.height = 512;
  last = 0;


  //----example specific variables------------
  floor = 50;

  hero = {
    x: c.width/2,
    y: c.height/2,
    width: 20,
    height: 20,
    speed: 5,
    color: "red",
  }
  
  

  loop();
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
//let rad = panel.getValue("radius");

  //handle left-right movement
  if( Key.isDown(Key.a) || Key.isDown(Key.LEFT) ){
    hero.x -= hero.speed;
  }else if(Key.isDown(Key.d) || Key.isDown(Key.RIGHT) ){
    hero.x += hero.speed;
  }

  //handle up-down movement
  if( Key.isDown(Key.w) || Key.isDown(Key.UP) ){
    hero.y -= hero.speed;
  }else if(Key.isDown(Key.s) || Key.isDown(Key.DOWN) ){
    hero.y += hero.speed;
  }

}

function draw(dt){
  //clear the screen by filling with a dark purple
  ctx.fillStyle = '#101';
  ctx.fillRect(0,0, c.width, c.height);

  //draw our hero
  ctx.fillStyle = hero.color;
  ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
}

init();
