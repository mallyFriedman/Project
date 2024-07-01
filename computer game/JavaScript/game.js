let RIGHT_KEY = 39;
let LEFT_KEY = 37;
let UP_KEY = 38;
let DOWN_KEY = 40;
let SPACE_KEY = 32;
let SHALAT_MOVEMENT = 15;
let score = 0;
let gameover = true
let time = 40;
let highScore = 0;

let lastLoopRun = 0;
let enemies = [];

let controler = new Object();
let flag = false;
let defaults = {};
let one_second = 1000;
let one_minute = one_second * 60;
let startDate = new Date();
let face = document.getElementById('lazy');


function createSprite(element, x, y, w, h) {
  let result = new Object();
  result.element = element;
  result.x = x;
  result.y = y;
  result.w = w;
  result.h = h;
  return result;
}


function addEnemy(time) {
  if (getRandom(time) == 0) {
    let elementName = 'enemy' + getRandom(10000000);
    let enemy = createSprite(elementName, getRandom(1700), -9, 70, 55)
    let element = document.createElement('IMG');
    if (getRandom(300) < 100) {
      element.setAttribute('src', '../IMG/vec1.png');
    }
    else if (getRandom(300) > 200) {
      element.setAttribute('src', '../IMG/vec2.png');
    }
    else if (getRandom(400) > 300) {
      element.setAttribute('src', '../IMG/vec3.png');
    }
    else {
      element.setAttribute('src', '../IMG/vec5.png');
    }
    element.id = enemy.element;
    element.className = 'enemy';
    document.children[0].appendChild(element);
    enemies[enemies.length] = enemy;
  }
}


function getRandom(maxSize) {
  return parseInt(Math.random() * maxSize);
}


function showSprite() {
  setPosition(shalat);
  setPosition(laser);
  for (let i = 0; i < enemies.length; i++) {

    setPosition(enemies[i]);
  }
}

function setPosition(sprite) {
  let e = document.getElementById(sprite.element)
  e.style.left = sprite.x + 'px';
  e.style.top = sprite.y + 'px';
}


document.onkeydown = function (evt) {
  tuggleKey(evt.keyCode, true);
};
document.onkeyup = function (evt) {
  tuggleKey(evt.keyCode, false)
};


function tuggleKey(keyCode, isPressed) {
  if (keyCode == LEFT_KEY) {
    controler.left = isPressed;
  }
  if (keyCode == RIGHT_KEY) {
    controler.right = isPressed;
  }
  if (keyCode == UP_KEY) {
    controler.up = isPressed;
  }
  if (keyCode == DOWN_KEY) {
    controler.down = isPressed;
  }
  if (keyCode == SPACE_KEY) {
    controler.space = isPressed;
  }
};



function handleControls() {
  if (controler.left) {
    shalat.x -= SHALAT_MOVEMENT;
  }
  if (controler.right) {
    shalat.x += SHALAT_MOVEMENT;
  }
  if (controler.up) { 
    shalat.y -= SHALAT_MOVEMENT;
  }
  if (controler.down) { 
    shalat.y += SHALAT_MOVEMENT;
  }
  if (controler.space && laser.y < -200) {
    laser.x = shalat.x + 40;
    laser.y = shalat.y - laser.h;
  }
  ensureBonds(shalat);
}


function updatePosition() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].y += 4;
    enemies[i].x += getRandom(7) - 3;
    ensureBonds(enemies[i], true);
  }
  laser.y -= 70;
}


function ensureBonds(sprite, ignore) {
  if (sprite.x < 230) 
    sprite.x = 230;
  if (sprite.x > 1590) 
    sprite.x = 1590;
  if (sprite.y < 0 && !ignore)
    sprite.y = 0;
  if (sprite.y > 830 && !ignore) 
    sprite.y = 830;
}


function checkCrashes(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x   
      && a.y < b.y + b.h && a.y + a.h > b.y;
};


function checkCollision() {
  for (let i = 0; i < enemies.length; i++) {
    if (checkCrashes(laser, enemies[i])) {
      let element = document.getElementById(enemies[i].element);
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
      laser.y = -laser.h;
      score += 10;
    }
    else if (checkCrashes(shalat, enemies[i])) {
      gameOver();
    }
    else if (enemies[i].y + enemies[i].h >= 930) {
      let element = document.getElementById(enemies[i].element);
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
    }
  }
}


function scoreCheck() {
  let scoreElement = document.getElementById('score');
  scoreElement.innerHTML = 'SCORE: ' + score;
  let highScoreElement = document.getElementById('high-score');
  highScoreElement.innerHTML = 'HIGH-SCORE:' + highScore;
}


function tick() {

  let now = new Date();
  let elapsed = now - startDate;
  let parts = [];

  parts[0] = '' + Math.floor(elapsed / one_minute);
  parts[1] = '' + Math.floor((elapsed % one_minute) / one_second);

  parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
  parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
  levels(parts);

  face.innerText = parts.join(':');
}


function levels(parts) {
  let theLevel = document.getElementById("myLevel");

  if (parts[1] == 0) {
    time = 40;
  }
  if (parts[1] == 10) {
    time = 30;
  }
  if (parts[1] == 20) {
    time = 20;
  }
  if (parts[1] == 40) {
    time = 10;
  }
  if (parts[1] == 50) {
    time = 5;
  }
  if (parts[1] == 60) {
    time = 5;
  }
  writen(parts);
}


function writen(parts) {
  let theLevel = document.getElementById("myLevel");

  if (parts[1] == 0) {
    theLevel.innerHTML = "level 1";
  }
  if (parts[1] == 10) {
    theLevel.innerHTML = "level 2";
  }
  if (parts[1] == 20) {
    theLevel.innerHTML = "level 3";
  }
  if (parts[1] == 30) {
    theLevel.innerHTML = "level 4";
  }
  if (parts[1] == 40) {
    theLevel.innerHTML = "level 5";
  }
  if (parts[1] == 50) {
    theLevel.innerHTML = "level 6";
  }
}

function gameOver() {
  flag = true;
  let element = document.getElementById(shalat.element);
  element.style.visibility = 'hidden';
  element = document.getElementById('gameOver');

  element.style.visibility = 'visible';
  gameover = false;
  if (highScore < score) {
    highScore = score;
  }
}


function inilaizeParametersGame() {
  one_second = 1000
  one_minute = one_second * 60
  startDate = new Date()
  score = 0;
  time = 40;
}

document.body.onkeyup = function (e) {
  if (e.keyCode == SPACE_KEY && gameover == false) {
    gameover = true;

    inilaizeParametersGame()
    shalat = createSprite('shalat', 935, 830, 90, 45);
    laser = createSprite('laser', 0, -120, 1, 60);
    setPosition(shalat);
    setPosition(laser);

    let element = document.getElementById(shalat.element);
    element.style.visibility = 'visible';
    element = document.getElementById('gameOver');
    element.style.visibility = 'hidden';

    for (let i = 0; i < enemies.length; i++) {
      let element = document.getElementById(enemies[i].element);
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--
    }
    loop();
  }
}

function loop() {
  if (gameover) {
    if (new Date().getTime() - lastLoopRun > 40) {
      updatePosition();
      handleControls();
      checkCollision();
      tick();
      addEnemy(time);
      showSprite();
      scoreCheck();
      lastLoopRun = new Date().getTime();
    }
    setTimeout('loop();', 2)
  }
}

let shalat = createSprite('shalat', 935, 830, 90, 70);
let laser = createSprite('laser', 0, -120, 1, 60);

loop();