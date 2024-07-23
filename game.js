var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(".close").on('click', closePopup);
$('.close').on('touchstart', closePopup);

function closePopup() {
    $(".popup").css("display", "none")
}


$(document).on('keydown', handleEvent);
$(document).on('touchstart', handleEvent);

function handleEvent(){
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}



$('.btn').click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {

    userClickedPattern = [];

    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(color) {
    var audio = new Audio('./sounds/' + color + '.mp3');
    audio.play();
}



function animatePress(currentColour) {
    var activeButton = $("div." + currentColour);
    if(!!activeButton){
        activeButton.addClass("pressed");
    }
    
    setTimeout(function(){
        if(!!activeButton){
            activeButton.removeClass("pressed");
        }
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success!");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong.");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
