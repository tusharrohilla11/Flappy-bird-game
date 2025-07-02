var hole = document.getElementById("hole");
var block = document.getElementById("block");
var game = document.getElementById("game");
var result = document.getElementById("result");
var text = document.getElementById("text");
var bird = document.getElementById("bird");
var scoreDisplay = document.getElementById("score");
var score = 0;
var jumping = 0;

hole.addEventListener("animationiteration", RanHole);

function RanHole() {
  var minTop = window.innerHeight * 0.2;
  var maxTop = window.innerHeight * 0.6;
  var randomTop = Math.random() * (maxTop - minTop) + minTop;
  
  hole.style.top = randomTop + "px";
  
  var holeStartPercent = (randomTop / window.innerHeight) * 100;
  var holeEndPercent = ((randomTop + (window.innerHeight * 0.3)) / window.innerHeight) * 100;
  
  block.style.background = `linear-gradient(to bottom, 
    blue 0%, 
    blue ${holeStartPercent}%, 
    transparent ${holeStartPercent}%, 
    transparent ${holeEndPercent}%, 
    blue ${holeEndPercent}%, 
    blue 100%)`;
  
  score++;
  scoreDisplay.innerHTML = score;
}

var fall = setInterval(function () {
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  var birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));
  
  if (jumping == 0) {
    bird.style.top = (birdTop + 3) + "px";
  }

  var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var holeHeight = window.innerHeight * 0.3;

  var birdRight = birdLeft + 60;
  var birdBottom = birdTop + 60;
  var blockRight = blockleft + 80;

  var hitGround = birdBottom >= window.innerHeight;
  var hitCeiling = birdTop <= 0;

  var inBlockXRange = (birdRight > blockleft && birdLeft < blockRight);
  var inHoleYRange = (birdTop >= holeTop && birdBottom <= holeTop + holeHeight);
  var hitBlock = inBlockXRange && !inHoleYRange;

  if (hitGround || hitCeiling || hitBlock) {
    result.style.display = "block";
    text.innerHTML = `Your final score is: ${score}`;
    game.style.display = "none";
    // score reset removed from here
  }
}, 10);

window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
  }
  hop();
});

game.addEventListener("click", hop);
game.addEventListener("touchstart", function (e) {
  e.preventDefault();
  hop();
});

function hop() {
  jumping = 1;
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  var jumpHeight = window.innerHeight * 0.08;
  if (birdTop > jumpHeight) {
    bird.style.top = (birdTop - jumpHeight) + "px";
  } else {
    bird.style.top = "0px";
  }
  setTimeout(function () {
    jumping = 0;
  }, 150);
}

// 🔁 New function to restart game
function restartGame() {
  score = 0;
  scoreDisplay.innerHTML = "0";
  bird.style.top = "200px"; // Reset bird position
  game.style.display = "block";
  result.style.display = "none";
}
