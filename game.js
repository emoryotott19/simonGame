var randomChosenColour;
var userChosenColour;

var gameStarted = false;
var currentLevel = 0;

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];





$(document).on('keypress', function() {
  if (gameStarted === false) {
    gameStarted = true;
    $("h1").css("color","white");
    nextSequence();
  }
});





$(".btn").click(function() {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});





function nextSequence() {

  userClickedPattern = [];

  currentLevel++;
  $("h1").text("Level " + currentLevel);

  var randomNum = Math.floor(Math.random() * 4);

  switch (randomNum) {
    case 0:
      randomChosenColour = buttonColours[0];
      break;
    case 1:
      randomChosenColour = buttonColours[1];
      break;
    case 2:
      randomChosenColour = buttonColours[2];
      break;
    case 3:
      randomChosenColour = buttonColours[3];
      break;
  }

  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}





function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}





function animatePress(currentColour) {
  $('.' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('.' + currentColour).removeClass("pressed");
    },100);
}





function checkAnswer(level) {
  if (userClickedPattern[level] === gamePattern[level]) {
    console.log("success");


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }

  else {
    $("body").css("background","red");
    setTimeout(function () {
      $("body").css("background-color","#011F3F");
    },200);
    $("h1").text("Game Over, Press Any Key to Start Over");
    startOver();
  }
}





function startOver() {
gamePattern = [];
gameStarted = false;
currentLevel = 0
}
