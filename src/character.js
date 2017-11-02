function MainChar(images) {
  this.hp = 6;
  this.hpStack = 6;
  this.str = 1;
  this.strStack = 1;
  this.x = 90;
  this.y = 110;
  this.width = 45;
  this.height = 50;
  this.direction = "S";
  this.xp = 0;
  this.imgArr = [];
  this.img;
  this.attacks = false;
}

// Create an image array with all the character images.
MainChar.prototype.pushImgs = function(images) {
  this.imgArr = Object.values(images).splice(0, 24);
}

MainChar.prototype.checkHp = function() {
  newGame.ctx.drawImage(newTimer.img, 150, 200);
  newGame.ctx.fillStyle = "#FFFFFF";
  newGame.ctx.font = "bold 60px Georgia";
  newGame.ctx.fillText("You Died!!", 180, 320);
  newGame.ctx.strokeText("You Died!!", 180, 320);
}

MainChar.prototype.drawIt = function() {
  newChar.idleChar();
  newGame.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

MainChar.prototype.restart = function() {
  this.x = 90;
  this.y = 110;
  this.hp = this.hpStack;
  this.str = this.strStack;
}

MainChar.prototype.move = function(bossFight) {
  switch (this.direction) {
    case "S":
      if (this.y < 435) this.y += 10;
      break;
    case "N":
      if (this.y > 90) this.y -= 10;
      break;
    case "W":
      if (this.x > 20) this.x -= 10;
      break;
    case "E":
      if (this.x < 610) this.x += 10;
      if (this.x >= 610 && this.y > 250 && this.y < 360) {
        newGame.changeRight();
        this.x = 20;
      }
      break;
  }
}

MainChar.prototype.attack = function() {
  if (this.attacks) {
    this.attacks = false;
  } else {
    this.attacks = true;
  }
}

// Makes the character idle in position changing it's image.
MainChar.prototype.idleChar = function() {
  if (!this.attacks) {
    switch (this.direction) {
      case "S":
        if (this.img == this.imgArr[0]) {
          this.img = this.imgArr[1];
        } else if (this.img == this.imgArr[1]) {
          this.img = this.imgArr[2];
        } else {
          this.img = this.imgArr[0];
        }
        break;
      case "N":
        if (this.img == this.imgArr[3]) {
          this.img = this.imgArr[4];
        } else if (this.img == this.imgArr[4]) {
          this.img = this.imgArr[5];
        } else {
          this.img = this.imgArr[3];
        }
        break;
      case "W":
        if (this.img == this.imgArr[6]) {
          this.img = this.imgArr[7];
        } else if (this.img == this.imgArr[7]) {
          this.img = this.imgArr[8];
        } else {
          this.img = this.imgArr[6];
        }
        break;
      case "E":
        if (this.img == this.imgArr[9]) {
          this.img = this.imgArr[10];
        } else if (this.img == this.imgArr[10]) {
          this.img = this.imgArr[11];
        } else {
          this.img = this.imgArr[9];
        }
        break;
    }
  } else {
    for (var i = 0; i < enemyArr.length; i++) {
      enemyArr[i].receiveDamage();
    }
    if (newGame.haveBoss == true) newBoss.receiveDamage();
    switch (this.direction) {
      case "N":
        if (this.img == this.imgArr[14]) {
          this.img = this.imgArr[15];
        } else {
          this.img = this.imgArr[14];
        }
        newGame.ctx.drawImage(this.imgArr[20], this.x - 20, this.y - 30, 80, 80)
        break;
      case "S":
        if (this.img == this.imgArr[12]) {
          this.img = this.imgArr[13];
        } else {
          this.img = this.imgArr[12];
        }
        newGame.ctx.drawImage(this.imgArr[21], this.x - 10, this.y, 80, 80);
        break;
      case "E":
        if (this.img == this.imgArr[16]) {
          this.img = this.imgArr[17];
        } else {
          this.img = this.imgArr[16];
        }
        newGame.ctx.drawImage(this.imgArr[23], this.x - 5, this.y - 5, 80, 80);
        break;
      case "W":
        if (this.img == this.imgArr[18]) {
          this.img = this.imgArr[19];
        } else {
          this.img = this.imgArr[18];
        }
        newGame.ctx.drawImage(this.imgArr[22], this.x - 30, this.y - 5, 80, 80);
        break;
    }
  }
}
