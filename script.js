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

function RanHole(){
  // Random position for the transparent gap (20% to 60% of screen height)
  var minTop = window.innerHeight * 0.2; // 20% from top
  var maxTop = window.innerHeight * 0.6; // 60% from top
  var randomTop = Math.random() * (maxTop - minTop) + minTop;
  
  hole.style.top = randomTop + "px";
  
  // Update the block gradient to match the hole position
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

var fall = setInterval(function(){
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  var birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));
  
  if(jumping == 0){
    bird.style.top = (birdTop + 3) + "px";
  }
  
  var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var holeHeight = window.innerHeight * 0.3; // 30% of screen height
  
  // Bird boundaries
  var birdRight = birdLeft + 60;
  var birdBottom = birdTop + 60;
  
  // Block boundaries
  var blockRight = blockleft + 80;
  
  // Check collision with ground or ceiling
  var hitGround = birdBottom >= window.innerHeight;
  var hitCeiling = birdTop <= 0;
  
  // Check collision with blue block (not in transparent hole area)
  var inBlockXRange = (birdRight > blockleft && birdLeft < blockRight);
  var inHoleYRange = (birdTop >= holeTop && birdBottom <= holeTop + holeHeight);
  var hitBlock = inBlockXRange && !inHoleYRange;
  
  if (hitGround || hitCeiling || hitBlock) {
    result.style.display = "block";
    text.innerHTML = `Your final score is: ${score}`;
    game.style.display = "none";
    score = 0;
    scoreDisplay.innerHTML = "0";
  }
}, 10);

window.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
  }
  hop();
});

// Add click/touch support for mobile devices
game.addEventListener("click", hop);
game.addEventListener("touchstart", function(e) {
  e.preventDefault();
  hop();
});

function hop(){
  jumping = 1;
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  var jumpHeight = window.innerHeight * 0.08; // 8% of screen height
  if(birdTop > jumpHeight){
    bird.style.top = (birdTop - jumpHeight) + "px";
  } else {
    bird.style.top = "0px";
  }
  setTimeout(function(){
    jumping = 0;
  }, 150);
}
