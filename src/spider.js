function Spider(images) {
  this.hp = 3;
  this.str = 1;
  this.xp = 1;
  this.speed = 3;
  this.x;
  this.y;
  this.width = 80;
  this.height = 80;
  this.direction = "S";
  this.imgArr = [];
  this.img;
  this.imgInit = 45;
  this.imgCount= 12;
}
Spider.prototype = Object.create(Monster.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.doDamage = function() {
  if (this.x-(newChar.x+newChar.width)<=-10 && this.x-(newChar.x+newChar.width)>-110  && (this.y-newChar.y)<=30 && (this.y-newChar.y)>-55) {
    switch(newChar.direction) {
      case "N": newChar.y+=50;
      break;
      case "S": newChar.y-=50;
      break;
      case "W": newChar.x+=50;
      break;
      case "E": newChar.x-=50;
    }
    newChar.hp-=this.str;
  }
}

Spider.prototype.receiveDamage = function() {
  if (this.x-(newChar.x+newChar.width)<=10 && this.x-(newChar.x+newChar.width)>-130  && (this.y-newChar.y)<=50 && (this.y-newChar.y)>-75) {
    switch(newChar.direction) {
      case "N": this.y-=50;
      break;
      case "S": this.y+=50;
      break;
      case "W": this.x-=50;
      break;
      case "E": this.x+=50;
    }
    this.hp-=newChar.str;
    this.hasDied();
  }
}
