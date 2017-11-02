function Timer(images) {
  this.sec = 30;
  this.secStack = 30;
  this.mil = 0;
  this.img = images.sign;;
  this.imgArr = [];
}

Timer.prototype.pushImgs = function(images) {
  this.imgArr = Object.values(images).splice(72, 11);
}
// Starts a counter to set play time.
Timer.prototype.timeDown = function() {
  var time = setInterval(function() {
    // Discount a second if miliseconds are 0.
    if (this.mil == 0) {
      this.sec--;
      this.mil = 99;
    }
    this.mil--;
    // When time's up, stop the counter and activate timeIsUp.
    if (this.sec < 0) {
      this.timeIsUp();
    }
  }.bind(this), 10);
}

Timer.prototype.showTime = function(images) {
  newGame.ctx.font = "bold 45px Georgia";
  newGame.ctx.fillStyle = "#FFFFFF";
  newGame.ctx.fillText("Health: ", 10, 55);
  newGame.ctx.strokeText("Health: ", 10, 55);
  if(newChar.hp <= 10 && newChar.hp>=0) {
    newGame.ctx.drawImage(this.imgArr[newChar.hp], 160, 20, 170, 40);
  } else if(newChar.hp > 10){
    newGame.ctx.drawImage(this.imgArr[this.imgArr.length-1], 160, 20, 170, 40);
  } else {
    newGame.ctx.drawImage(this.imgArr[0], 160, 20, 170, 40);
  }
  if (this.sec < 0) {
    newGame.ctx.fillText("Time Left: 00:00", 320, 55);
    newGame.ctx.strokeText("Time Left: 00:00", 320, 55);
  } else {
    newGame.ctx.fillText("Time Left: " + this.sec + ":" + this.mil, 320, 55);
    newGame.ctx.strokeText("Time Left: " + this.sec + ":" + this.mil, 320, 55);
  }
}

// Function to show the banner when time's up.
Timer.prototype.timeIsUp = function() {
  newGame.ctx.drawImage(this.img, 150, 200);
  newGame.ctx.fillStyle = "#FFFFFF";
  newGame.ctx.font = "bold 60px Georgia";
  newGame.ctx.fillText("Time's Up!!", 180, 320);
  newGame.ctx.strokeText("Time's Up!!", 180, 320);
}
