var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).on('keydown', function(){
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



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
    
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(color) {
    switch(color) {
        case 'green':
            var green = new Audio('./sounds/green.mp3');
            green.play();
            break;

        case 'red':
            var red = new Audio('./sounds/red.mp3');
            red.play();
            break;

        case 'yellow':
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;
        
        case 'blue':
            var blue = new Audio('./sounds/blue.mp3');
            blue.play();
            break;

        default:
            var wrong = new Audio('.sounds/wrong.mp3');
            wrong.play();
    }
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
    }
}
