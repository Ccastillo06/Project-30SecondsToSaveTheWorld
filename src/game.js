function MyGame(images) {
  this.ctx = document.getElementById("myCanvas").getContext("2d");
  this.width = 650;
  this.height = 650;
  this.imgArr = [];
  this.map = 0;
  this.generator = 3;
  this.haveBoss = false;
  this.obstacle;
  this.obsY = 480;
  this.obsX = 325;
}

MyGame.prototype.pushTiles = function (images) {
  this.imgArr = Object.values(images).splice(24,7);
}

MyGame.prototype.restart = function () {
  this.map = 0;
  this.generator =3;
  this.haveBoss = false;
}

MyGame.prototype.update = function() {
  this.ctx.drawImage(this.imgArr[this.map], 0, 0);
  if(this.obstacle) this.throwObstacle();
  newChar.drawIt();
  if (enemyArr.length > 0) {
    for (var i = 0; i < enemyArr.length; i++) {
      enemyArr[i].drawIt();
      if(enemyArr[i].hasDied()) enemyArr.splice(i,1);
    }
  }
  if (this.haveBoss) newBoss.drawIt();
};

MyGame.prototype.changeRight = function() {
  if (this.map <= this.imgArr.length) this.map++;
  if(this.map < 4) this.generator += 3;
  if(this.map >= 4 && this.map < 6) this.generator += 5;
  if(this.map == 6) {
    this.haveBoss = true;
    mapAudio.pause()
    mapAudio.currentTime = 0;
    bossFight.play();
    roar.play();
  }
}

MyGame.prototype.generateMonsters = function(images) {
  for(var j = 0; j < this.generator; j++) {
    var random = Math.floor(Math.random() * 2);
    if(random == 0) var monster = new Wolf();
    if (random == 1) var monster = new Spider();
    monster.addMonster(images);
    enemyArr.push(monster);
  }
  this.generator = 0;
  // generate the obstacles too.
  if(this.map > 0 && this.map < 6){
    if(this.map >=1) this.obstacle= images.arrow;
    if(this.map >=3) this.obstacle= images.rock;
  }
}

MyGame.prototype.throwObstacle = function() {
  this.obsY-=15;
  if(this.obsY < 80) this.obsY = 480;
  if (this.map >=1 && this.map<3) newGame.ctx.drawImage(this.obstacle, this.obsX, this.obsY, 40, 50);
  if (this.map >=3 && this.map<6) newGame.ctx.drawImage(this.obstacle, this.obsX, this.obsY, 25, 25);
  // Check if the character is hit.
  if (this.obsX - (newChar.x + newChar.width) <= -20 && this.obsX - (newChar.x + newChar.width) > -70 && (this.obsY - newChar.y) <= 0 && (this.obsY - newChar.y) > -30) {
    newChar.hp -= 1;
  }
}
