var newGame, newChar, newBoss, newTimer;
var mapAudio, shopAudio, winAudio, bossFight, roar, explosion, buy;
var enemyArr = [];
// Request Animation Frame initializing variables.
var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;
// Object with all images used ingame.
var allPics = {
  faceDown1: "./images/Character/FaceDown.png",
  faceDown2: "./images/Character/FaceDown2.png",
  faceDown3: "./images/Character/FaceDown3.png",
  faceUp1: "./images/Character/FaceUp.png",
  faceUp2: "./images/Character/FaceUp2.png",
  faceUp3: "./images/Character/FaceUp3.png",
  faceLeft1: "./images/Character/FaceLeft.png",
  faceLeft2: "./images/Character/FaceLeft2.png",
  faceLeft3: "./images/Character/FaceLeft3.png",
  faceRight1: "./images/Character/FaceRight.png",
  faceRight2: "./images/Character/FaceRight2.png",
  faceRight3: "./images/Character/FaceRight3.png",
  attackDown1: "./images/Character/Attack1.png",
  attackDown2: "./images/Character/Attack12.png",
  attackUp1: "./images/Character/Attack2.png",
  attackUp2: "./images/Character/Attack22.png",
  attackRight1: "./images/Character/Attack3.png",
  attackRight2: "./images/Character/Attack32.png",
  attackLeft1: "./images/Character/Attack4.png",
  attackLeft2: "./images/Character/Attack42.png",
  slashTop: "./images/Character/SlashTop.png",
  slashDown: "./images/Character/SlashDown.png",
  slashLeft: "./images/Character/SlashLeft.png",
  slashRight: "./images/Character/SlashRight.png",
  main: "./images/center.png",
  woods1: "./images/woodsides.png",
  woods2: "./images/woodsides2.png",
  desert1: "./images/desertsides.png",
  desert2: "./images/desertsides2.png",
  desert3: "./images/desertsides3.png",
  dungeon: "./images/dungeon.png",
  boss1: "./images/Boss/Boss1.png",
  boss2: "./images/Boss/Boss2.png",
  boss3: "./images/Boss/Boss3.png",
  boss4: "./images/Boss/Boss4.png",
  boss5: "./images/Boss/Boss5.png",
  boss6: "./images/Boss/Boss6.png",
  boss7: "./images/Boss/Boss7.png",
  boss8: "./images/Boss/Boss8.png",
  boss9: "./images/Boss/Boss9.png",
  boss10: "./images/Boss/Boss10.png",
  boss11: "./images/Boss/Boss11.png",
  boss12: "./images/Boss/Boss12.png",
  bossAttack: "./images/Boss/BossAttack.png",
  bossFire: "./images/Boss/Fire.png",
  spiderUp1: "./images/Spider/FaceUp1.png",
  spiderUp2: "./images/Spider/FaceUp2.png",
  spiderUp3: "./images/Spider/FaceUp3.png",
  spiderDown1: "./images/Spider/FaceDown1.png",
  spiderDown2: "./images/Spider/FaceDown2.png",
  spiderDown3: "./images/Spider/FaceDown3.png",
  spiderRight1: "./images/Spider/FaceRight1.png",
  spiderRight2: "./images/Spider/FaceRight2.png",
  spiderRight3: "./images/Spider/FaceRight3.png",
  spiderLeft1: "./images/Spider/FaceLeft1.png",
  spiderLeft2: "./images/Spider/FaceLeft2.png",
  spiderLeft3: "./images/Spider/FaceLeft3.png",
  wolfUp1: "./images/Wolf/FaceUp.png",
  wolfUp2: "./images/Wolf/FaceUp1.png",
  wolfUp3: "./images/Wolf/FaceUp2.png",
  wolfDown1: "./images/Wolf/FaceDown.png",
  wolfDown2: "./images/Wolf/FaceDown1.png",
  wolfDown3: "./images/Wolf/FaceDown2.png",
  wolfRight1: "./images/Wolf/FaceRight.png",
  wolfRight2: "./images/Wolf/FaceRight1.png",
  wolfRight3: "./images/Wolf/FaceRight2.png",
  wolfLeft1: "./images/Wolf/FaceLeft.png",
  wolfLeft2: "./images/Wolf/FaceLeft1.png",
  wolfLeft3: "./images/Wolf/FaceLeft2.png",
  rock: "./images/Extras/Rock.png",
  arrow: "./images/Extras/Arrow.png",
  sign: "./images/Extras/Sign.png",
  hp0: "./images/Extras/0hp.png",
  hp1: "./images/Extras/1hp.png",
  hp2: "./images/Extras/2hp.png",
  hp3: "./images/Extras/3hp.png",
  hp4: "./images/Extras/4hp.png",
  hp5: "./images/Extras/5hp.png",
  hp6: "./images/Extras/6hp.png",
  hp7: "./images/Extras/7hp.png",
  hp8: "./images/Extras/8hp.png",
  hp9: "./images/Extras/9hp.png",
  hp10: "./images/Extras/10hp.png",
};
// Loader function.
function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}
// Keydown function using WASD and SpaceBar.
$(document).on("keydown", function(e) {
  if (e.which == 83) {
    newChar.direction = "S";
    newChar.move();
  } else if (e.which == 65) {
    newChar.direction = "W";
    newChar.move();
  } else if (e.which == 87) {
    newChar.direction = "N";
    newChar.move();
  } else if (e.which == 68) {
    newChar.direction = "E";
    newChar.move();
  } else if (e.which == 32) {
    newChar.attack();
  }
});
$(document).on("keyup", function(e) {
  if (e.which == 32) {
    newChar.attack();
  }
});
// HERE STARTS THE GAME.
$(document).ready(function() {
  mapAudio = document.getElementsByTagName('audio')[0];
  shopAudio = document.getElementsByTagName('audio')[1];
  winAudio = document.getElementsByTagName('audio')[2];
  bossFight = document.getElementsByTagName('audio')[3];
  roar = document.getElementsByTagName('audio')[4];
  explosion = document.getElementsByTagName('audio')[5];
  buy = document.getElementsByTagName('audio')[6];
  // Wait for the images to be loaded and then start.
  loadImages(allPics, function(images) {
    // Create the game objects.
    newGame = new MyGame();
    newGame.pushTiles(images);
    newChar = new MainChar();
    newChar.pushImgs(images);
    newBoss = new Boss();
    newBoss.pushImgs(images);
    newTimer = new Timer(images);
    newTimer.pushImgs(images);
    // Function to animate
    function animate() {
      if (!stop) {
        requestAnimationFrame(animate);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
          //Starts rendering the game.
          newGame.update();
          newGame.generateMonsters(images);
          newTimer.showTime(images);
          // STOPS THE ANIMATION WITH A STOP=TRUE;
          if (newChar.hp <= 0 || newTimer.sec < 0 || newBoss.hp <= 0) {
            stop = true;
            // Check character hp to call the "You Died!" message.
            if (newChar.hp <= 0) {
              newChar.checkHp();
              bossFight.pause()
              bossFight.currentTime = 0;
            }
            if (newBoss.hp <= 0) {
              $("#congrats").css("display", "block");
              bossFight.pause();
              winAudio.play();
            }
            // Show the button to change to the shop.
            $("#shop").css("display", "block");
            $("#exptext").text("Current experience: " + newChar.xp);
          }
        }
      }
    }
    newTimer.timeDown();
    startAnimating(20);
    // Function to start animating the game on call.
    function startAnimating(fps) {
      fpsInterval = 1000 / fps;
      then = Date.now();
      startTime = then;
      animate();
    }
    // Button to go to the shop when dead or time's up.
    $("#shop").click(function() {
      $("#shop").css("display", "none");
      $("#shoppage").css("display", "block");
      bossFight.pause();
      bossFight.currentTime = 0;
      mapAudio.pause();
      mapAudio.currentTime = 0;
      shopAudio.play()
    });
    // Buttons to interact with the shop page.
    $("#play2").click(function() {
      $("#shoppage").css("display", "none");
      enemyArr = [];
      newChar.restart();
      newGame.restart();
      newTimer.sec = newTimer.secStack;
      stop = false;
      shopAudio.pause()
      shopAudio.currentTime = 0;
      mapAudio.play();
      startAnimating(20);
    });
    $("#attack").on("click", function() {
      if (newChar.xp >= 10 && newChar.strStack < 10) {
        newChar.strStack += 1;
        newChar.xp -= 10;
        $("#exptext").text("Current experience: " + newChar.xp);
        buy.play();
      }
    });
    $("#health").on("click", function() {
      if (newChar.xp >= 20 && newChar.hpStack < 10) {
        newChar.hpStack += 1;
        newChar.xp -= 20;
        $("#exptext").text("Current experience: " + newChar.xp);
        buy.play();
      }
    });
    $("#time").on("click", function() {
      if (newChar.xp >= 30 && newTimer.secStack <= 50) {
        newTimer.secStack += 10;
        newChar.xp -= 30;
        $("#exptext").text("Current experience: " + newChar.xp);
        buy.play();
      }
    });
  });
});
