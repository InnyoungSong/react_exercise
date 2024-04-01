$(document).ready(function() {
    var answer;
    var time = 10;
    var score = 0;
    var highScore = 0;
    var timeInterval
    var range = 10;

    $("#slider").on('input', function(){
        var sliderValue = $("#slider").val();
        range = parseInt(sliderValue);
        $("#range p:last-child").html(range);
    })

    var createPrompt = function(){
        var firstNumber = Math.floor(Math.random() * range);;
        var secondNumber = Math.floor(Math.random() * range);;
        var prompt = firstNumber + ' + ' + secondNumber;
        answer = firstNumber + secondNumber;
        $("#prompt").html(prompt);
    }
    var startGame = function(){
        timeInterval = setInterval(function(){
            time--;
            $("#timer").html("Timer: " + time);

            if (time == 0){
                gameOver();
                clearInterval(timeInterval);
            }
        }, 1000);
    }

    var updateTimer = function(){
        $("#timer").html("Timer: " + time);
    }
    var updateScore = function(){
        $("#scores p:first-child").html('score: ' + score);
        console.log( $("#scores p:last-child").html())
    }

    var gameOver = function(){
        time = 0;
        clearInterval(timeInterval)
        if (score > highScore){
            highScore = score;
            $("#prompt").html("Congratulations! <br> You've set a new record of " + score);
            $("#scores p:last-child").html("high score: " + highScore);
            console.log($("#scores p:last-child").html())
        }else{
            $("#prompt").html("TIMEOUT! <br> Your score is " + score);
        }
    }

    createPrompt();
    updateTimer();

    $("input").on('keyup', function(){
        var inputValue = $("input").val();
        
        if (inputValue == answer){
//            console.log('correct')
            inputValue = $("input").val('');
            time++;
            score++;
            updateTimer();
            updateScore();
            return createPrompt();
        }else{
            console.log('Incorrect');
        }
    });

    $("#start_button").on("click", function(){
        $("#restart_button").css('display', 'inline-block');
        $("#start_button").css('display', 'none');
        startGame();
        
    })

    $("#restart_button").on('click', function(){
        gameOver();
        time = 10;
        score = 0;
        createPrompt();
        $("#timer").html("Timer: " + time);
        startGame();
    })

})