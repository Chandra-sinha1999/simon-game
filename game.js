var gamePattern = [];
var userClickedPattern = [];
var buttonSequence = ["red","blue","green","yellow"];
var level = 0;
var started = false;

//start process
$(document).on("keydown",function(){
  if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//event listener to check clicks
$(".btn").on("click",function(event){
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

//generating next sequence to be followed
function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonSequence[randomNumber];
  gamePattern.push(randomChoosenColor);
  playSound(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("h1").text("Level " + level);
  level = level + 1;
}

//for comparing answers
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }
  else{
    $("h1").text("Game Over, Press Any Key to Restart")
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

//starting over after wrong answer
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}

//playing sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//adding animation
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100)
}
