function Boss(images) {
  this.hp = 25;
  this.str = 3;
  this.x = 300;
  this.y = 100;
  this.width = 350;
  this.height = 250;
  this.imgArr = [];
  this.img;
  this.idle = 0;
  this.attack = 0;
  this.summon = 0;
}

Boss.prototype.pushImgs = function(images) {
  this.imgArr = Object.values(images).splice(31, 14);
}

Boss.prototype.drawIt = function() {
  newBoss.updateImg();
  newGame.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  newBoss.attack1();
  newBoss.attack2();
}

Boss.prototype.updateImg = function() {
  this.img = this.imgArr[this.idle];
  this.idle++;
  if(this.attack > 35) this.attack = 0;
  this.attack++;
  this.summon++;
  if(this.summon%130==0) newGame.generator+=1;
  if (this.idle > 11) this.idle = 0;
}

Boss.prototype.receiveDamage = function() {
  if ((newChar.x >= 280) && (newChar.y >= 250 && newChar.y <= 350)) {
    this.hp -= newChar.str;
  }
}

Boss.prototype.attack1 = function() {
  if(this.attack > 0 && this.attack <= 15){
    newGame.ctx.drawImage(this.imgArr[12], this.x - 100, this.y + 200, 150, 45);
    if (newChar.x >= this.x - 100 && (newChar.y >= 250 && newChar.y <= 350)) {
      newChar.hp -= this.str;
      newChar.x -= 50;
    }
  }
}

Boss.prototype.attack2 = function() {
  explosion.play();
  if(this.attack > 15 && this.attack <= 35) {
  newGame.ctx.drawImage(this.imgArr[13], this.x + 150, this.y - 50, 100, 100);
  newGame.ctx.drawImage(this.imgArr[13], this.x + 150, this.y + 50, 100, 100);
  newGame.ctx.drawImage(this.imgArr[13], this.x + 50, this.y - 50, 100, 100);
  newGame.ctx.drawImage(this.imgArr[13], this.x + 50, this.y + 50, 100, 100);
  newGame.ctx.drawImage(this.imgArr[this.idle], this.x, this.y, this.width, this.height);
  newGame.ctx.drawImage(this.imgArr[13], this.x + 150, this.y + 200, 100, 100);
  newGame.ctx.drawImage(this.imgArr[13], this.x + 150, this.y + 300, 100, 100);
  newGame.ctx.drawImage(this.imgArr[13], this.x + 50, this.y + 200, 100, 100);
  newGame.ctx.drawImage(this.imgArr[13], this.x + 50, this.y + 300, 100, 100);
  if (newChar.x >= this.x + 50) newChar.hp -= this.str;
  }
}
