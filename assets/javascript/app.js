/* Pseudo Code

Need a timer to count down 3 seconds after the page loads
Game needs to have multiple choice and true or false questions



If the user doesn't submit the trivia before the countdown timer, display correct or incorrect results.


If the user does answer all questions and submits before the timer is up, display total correct and total wrong.

Don't allow more than one answer to be picked per question

*/

// ===========================================================================
//                                   VARIABLES
// ===========================================================================

var answeredCorrect = 0;
var answeredIncorrect = 0;
var unanswered = 0;
var time = 180; // 3 mins for the trivia timer (180)
var isClockRunning = false;
var timerId;
var formatted;

// DOCUMENT READY


// This code will run when page has loaded.
$( document ).ready (function (){
    
    $(".play-theme").on("click", theme);

// Game Setup
//When the start button is clicked start timer, count down from 3 mins
    $(".start").on("click", startGame);

// End Game
// When user clicks to submit answers, will show count and reset the timer
    $(".end").on("click", end);

// Replay Game
// When user clicks to replay, user is able to restart the game
    $(".replay").on("click", replay);

// End of document ready function (do not remove)!
});



// ============================================================================
//                                  FUNCTIONS
// ============================================================================

// This is for the timer countdown when user clicks start button.

$(".end").hide();
$(".replay").hide();
$("#display").hide();
$("#the-office-team").hide();
$("#trivia").hide();

// Starts the clock
function start(){

    if (!isClockRunning) {
        timerId = setInterval(count, 1000);
        isClockRunning = true;
    }

}

function stop() {

    if(time <= 0) {
        console.log();
        clearInterval(timerId);
        isClockRunning = false;
    }
}

function count() {

    time--;
    formatted = timeConverter(time);
    $("#timer-display").text(formatted);

    if (time <= 0) {
        end();
    }
}

// This converts timer in to a readable time.
function timeConverter(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return "Timer Countdown: " + minutes + ":" + seconds;
}

function reset() {

    time = 180;
    $("#timer-display").text(formatted);
}


//Theme Song

function theme(){

    var themeSong= document.getElementById("theme-song");
    themeSong.load();
    themeSong.currentTime = 0;
    themeSong.play();

    setInterval(function(){
        if(themeSong.currentTime>36) {
            themeSong.pause();
            }
        }, 1000);
}

function themeStop(){

    var themeSong= document.getElementById("theme-song");
    themeSong.pause();
}

// Game functions

function startGame() {

    start();
    // this displays the questions and answer selections to the questions
    $("body").css('background-image', 'none');
    $("#display").show();
    $(".end").show();
    $("#the-office-team").show()
    $("#trivia").show();
    $("#trivia").animate({
        width: "300px",
        left: "840px"
    }, 50, function(){});
    $(".replay").hide();
    themeStop();
}



function end() {
    
    userChoice("q1", "b");
    userChoice("q2", "c");
    userChoice("q3", "d");
    userChoice("q4", "a");
    userChoice("q5", "c");
    userChoice("q6", "d");
    userChoice("q7", "b");
    userChoice("q8", "c");
    userChoice("q9", "b");
    userChoice("q10", "d");
    userChoice("q11", "a");
    userChoice("q12", "b");
    
    $("#display-end").html(
        "<div class='container'><h2 class='end-game'>End of Game</h2><h5 class='end-game'>How did you do?</h5><p class='end-game'>Correct Answers: " + answeredCorrect + "</p><p class='end-game'>Incorrect Answers: " + answeredIncorrect + "</p><p class='end-game'>Unaswered: " + unanswered + "</p></div>"
    );
    stop();
    reset();
    $("#display").hide();
    $("#display-end").show();
    $("#timer-display").hide();
    $(".end").hide();
    $(".replay").show();

}

function replay() {

    startGame();
    $("#display").show();
    $("#timer-display").show();
    $(".end").show();
    $("#display-end").hide();
    clearChoices();
}

function clearChoices() {

    $("input[name=q1]").val([]);
    $("input[name=q2]").val([]);
    $("input[name=q3]").val([]);
    $("input[name=q4]").val([]);
    $("input[name=q5]").val([]);
    $("input[name=q6]").val([]);
    $("input[name=q7]").val([]);
    $("input[name=q8]").val([]);
    $("input[name=q9]").val([]);
    $("input[name=q10]").val([]);
    $("input[name=q11]").val([]);
    $("input[name=q12]").val([]);
}

function userChoice(question, answer) {

    var choice = $("input[name=" + question + "]:checked").val();
    console.log(choice);

    if (choice === answer) {
        answeredCorrect++;
        console.log(answeredCorrect);
    }

    if (choice !== answer) {
        answeredIncorrect++;
    }

    if (choice === undefined) {
        unanswered++;
        answeredIncorrect--;
    }
}



