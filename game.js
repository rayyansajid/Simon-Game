var btns = ["red", "green", "blue", "yellow"];
var pattern = [];
var userpattern = [];
var started = false;
var level = 0;

$(document).on("keypress", function () {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    userpattern.push(this.classList[1]);
    playSound(this.classList[1]);
    blink(this.classList[1]);
    checkAnswer(userpattern.length-1);
});

function checkAnswer(currentlevel) {

    if (userpattern[currentlevel] === pattern[currentlevel]) {
        if (userpattern.length === pattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }

function startOver() {
    pattern = [];
    started = false;
    level = 0;
}



function blink(btn){
    console.log("btn: "+btn);
    $("."+btn).addClass("pressed");
    setTimeout(function() {
        $("."+btn).removeClass("pressed");
    }, 100);
    return btn;
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
  }

function nextSequence() {
    userpattern = [];
    level++;
    $("#level-title").text("level " + level);
    var index = Math.floor(Math.random()*4);
    var randomChosenColor = btns[index];
    pattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}