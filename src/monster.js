function Monster() {}

Monster.prototype.addMonster = function(images) {
  this.x = Math.floor(Math.random() * 400) + 200;
  this.y = Math.floor(Math.random() * 300) + 100;
  this.pushImgs(images);
}

Monster.prototype.pushImgs = function(images) {
  this.imgArr = Object.values(images).splice(this.imgInit, this.imgCount);
}

Monster.prototype.drawIt = function(){
  this.idle();
  this.doDamage();
  newGame.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
}

Monster.prototype.idle = function() {
  this.move();
  switch (this.direction) {
    case "N":
      if (this.img == this.imgArr[0]) {
        this.img = this.imgArr[1];
      } else if (this.img == this.imgArr[1]) {
        this.img = this.imgArr[2];
      } else {
        this.img = this.imgArr[0];
      }
      break;
    case "S":
      if (this.img == this.imgArr[3]) {
        this.img = this.imgArr[4];
      } else if (this.img == this.imgArr[4]) {
        this.img = this.imgArr[5];
      } else {
        this.img = this.imgArr[3];
      }
      break;
    case "E":
      if (this.img == this.imgArr[6]) {
        this.img = this.imgArr[7];
      } else if (this.img == this.imgArr[7]) {
        this.img = this.imgArr[8];
      } else {
        this.img = this.imgArr[6];
      }
      break;
    case "W":
      if (this.img == this.imgArr[9]) {
        this.img = this.imgArr[10];
      } else if (this.img == this.imgArr[10]) {
        this.img = this.imgArr[11];
      } else {
        this.img = this.imgArr[9];
      }
      break;
  }
}

Monster.prototype.move = function() {
  if (this.x - newChar.x <= 0 && this.x - newChar.x > -40) {
    if (this.y < newChar.y) {
      this.direction = "S";
      this.y += this.speed;
    }
    if (this.y > newChar.y) {
      this.direction = "N";
      this.y -= this.speed;
    }
  } else if (this.x < newChar.x) {
    this.direction = "E";
    this.x += this.speed;
    if (this.y > newChar.y) this.y -= 1;
    if (this.y < newChar.y) this.y += 1;
  } else if (this.x > newChar.x) {
    this.direction = "W";
    this.x -= this.speed;
    if (this.y > newChar.y) this.y -= 1;
    if (this.y < newChar.y) this.y += 1;
  }
}

Monster.prototype.hasDied = function() {
  if (this.hp <= 0) {
    newChar.xp+=this.xp;
    return true;
  }
}
