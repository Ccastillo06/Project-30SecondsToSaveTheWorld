function Wolf(images) {
  this.hp = 5;
  this.str = 3;
  this.xp = 2;
  this.speed = 4;
  this.x;
  this.y;
  this.width = 100;
  this.height = 80;
  this.direction = "W";
  this.imgArr = [];
  this.img;
  this.imgInit = 57;
  this.imgCount= 12;
}
Wolf.prototype = Object.create(Monster.prototype);
Wolf.prototype.constructor = Wolf;

Wolf.prototype.doDamage = function() {
  if (this.x - (newChar.x + newChar.width) <= -10 && this.x - (newChar.x + newChar.width) > -130 && (this.y - newChar.y) <= 20 && (this.y - newChar.y) > -60) {
    switch (newChar.direction) {
      case "N":
        newChar.y += 50;
        break;
      case "S":
        newChar.y -= 50;
        break;
      case "W":
        newChar.x += 50;
        break;
      case "E":
        newChar.x -= 50;
    }
    newChar.hp -= this.str;
  }
}

Wolf.prototype.receiveDamage = function() {
  if (this.x - (newChar.x + newChar.width) <= 10 && this.x - (newChar.x + newChar.width) > -150 && (this.y - newChar.y) <= 40 && (this.y - newChar.y) > -80) {
    switch (newChar.direction) {
      case "N":
        this.y -= 50;
        break;
      case "S":
        this.y += 50;
        break;
      case "W":
        this.x -= 50;
        break;
      case "E":
        this.x += 50;
    }
    this.hp -= newChar.str;
  }
}
