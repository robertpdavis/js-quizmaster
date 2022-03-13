//Javascript Quizmaster code

//Set variables
var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer-display");
var timeRemaining = document.querySelector("#time-remaining");
var questionText = document.querySelector("#question-text");
var answerList = document.querySelector("#answer-list");
var resultText = document.querySelector("#result-text");
var initialButton = document.querySelector("#initial-button");
var initials = document.querySelector("#initials");
var timer;
var timeLeft;
var correct;
var wrong;
var questionCount = 0;
var questionNum;


//Listeners---------------------------------------------------
//Start button
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    startButton.textContent === "Start Quiz";

    startButton.disabled = true;

    startQuiz();
});

//Answer selection
answerList.addEventListener("click", function(event) {
    event.preventDefault();
    //Check the answer and call the next question
    checkAnswer(event);
    displayQuestion();
});

//Initials submit
initialButton.addEventListener("click", function(event) {
    event.preventDefault();
    //Check the answer and call the next question
    saveHighScore();
});
//-----------------------------------------------------------


//Functions--------------------------------------------------

function startQuiz () {
    timeLeft = setTime;
    correct = 0;
    wrong = 0;
    questionNum = 0;
    


    timeRemaining.textContent = "seconds remaining"

    //Shuffle questions so no in the same order for each quiz
    arrQuestions = shuffle(arrQuestions);
    
    //Display first question
    displayQuestion();

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timer = setInterval(function () {
        // As long as the `timeLeft` is 1 second or more
        if (timeLeft > 0 && questionNum < questionCount) {

            timeLeft--;
            timerDisplay.textContent = timeLeft;
        //Quiz over    
        } else {
            // Use `clearInterval()` to stop the timer
            clearInterval(timer);
            // Call the `displayResult()` function
            displayResult();

            startButton.disabled = false;
            startButton.textContent= "Redo Quiz";

        }
    }, 1000);

}

function displayQuestion() {
    if (timeLeft > 0 && questionNum < questionCount) {
        // Clear previous question answers
        answerList.innerHTML = "";

        //Get question/answers from question array
        question = arrQuestions[questionNum];

        //Dispay question
        questionText.textContent = question["Q"];

        for (var key in question) {
            if (Object.hasOwnProperty.call(question, key)) {
                if (key != "Q" && key != "A") {         
                    var answer = key + "." + question[key];
                    var li = document.createElement("li");
                    li.setAttribute("data-index", 1);

                    var button = document.createElement("button");
                    button.textContent = answer;
                
                    li.appendChild(button);
                    answerList.appendChild(li);
                }
            }
        }
    }
}

//Check the answer selected - dislay result on screen and record result
function checkAnswer(event) {
    if (timeLeft > 0 && questionNum < questionCount) {
        var answer = arrQuestions[questionNum]["A"];
        var userAnswer = event.target.textContent.charAt(0);

        if (userAnswer === answer) {
            correct++;
            resultText.innerHTML= "<br><hr><br>Correct";

        } else  {
            wrong++;
            timeLeft = timeLeft - setTimePenalty;
            resultText.innerHTML = "<br><hr><br>Wrong";
        }

        //Dispay if answer was correct or wrong for period
        setTimeout(function () {
            resultText.innerHTML = "";       
        },750);

        questionNum++;
    }
}

//Display quiz result on sreen
function displayResult() {
    timerDisplay.textContent = "Your Score: " + correct;
    timeRemaining.textContent = "";
    questionText.textContent = "Please enter your initials and submit for the highsscores list";
    answerList.style.display = "none";
    initials.style.display = "block";
    initialButton.style.display= "block";
}

//Save result to high scores list and go to page
function saveHighScore() {
    var savedScores = JSON.parse(localStorage.getItem("highScores"));

    if (savedScores===null) {
        var highScores = {};
    }
    console.log(highScores);
    console.log(initials.value);
    highScores[initials.value] = correct;

    // set new entry to local storage 
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

//Shuffle function using Fisher-Yates Shuffle - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
//items is array
function shuffle (items) {
{
    for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
        return items;
    } 
}

// This function is being called below and will run when the page loads.
function init() {
    //Display timer start time
    timerDisplay.textContent = setTime;
    //Parse questions
    arrQuestions = JSON.parse(arrQuestions);
    //Get number of questions
    questionCount = arrQuestions.length;

    initials.style.display= "none";
    initialButton.style.display= "none";
}

//-----------------------------------------------------------

init();