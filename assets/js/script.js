//Javascript Quizmaster code

//Set variables
var headerSection = document.querySelector("#header-section");
var headerText = document.querySelector("#header-text");
var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer-display");
var timerLabel = document.querySelector("#timer-label");
var questionText = document.querySelector("#question-text");
var answerList = document.querySelector("#answer-list");
var resultText = document.querySelector("#result-text");
var initialButton = document.querySelector("#initial-button");
var initialsInput = document.querySelector("#initials-input");
var timer;
var timeLeft;
var correctCount;
var wrong;
var questionCount = 0;
var questionNum;


//Listeners---------------------------------------------------
//Start button
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    if (startButton.value === "Redo Quiz") {
        resetQuestionCard();
    }

    startButton.disabled = true;
    startButton.style.opacity = 0.5;
    startQuiz();
});

//Answer selection
answerList.addEventListener("click", function(event) {
    event.preventDefault();
    //Check the answer and call the next question
    checkAnswer(event);
    displayQuestion();
});

//initials input submit
initialButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveHighScore();
});
//-----------------------------------------------------------


//Functions--------------------------------------------------

function startQuiz () {
    timeLeft = setTime;
    correctCount = 0;
    wrong = 0;
    questionNum = 0;
    
    timerLabel.textContent = "seconds remaining";

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
            startButton.style.opacity = 1.0;
            startButton.value= "Redo Quiz";
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
                    var button = document.createElement("button");
                    button.setAttribute("data-index", key);
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
        var userAnswer = event.target.dataset.index;
        if (userAnswer === answer) {
            correctCount++;
            resultText.innerHTML= "<br><hr><br>Correct";
        } else  {
            wrong++;
            timeLeft = timeLeft - setTimePenalty;
            resultText.innerHTML = "<br><hr><br>Wrong";
        }
        //Dispay if answer was correctCount or wrong for period
        setTimeout(function () {
            resultText.innerHTML = "";       
        },750);

        questionNum++;
    }
}

//Display quiz result on sreen
function displayResult() {
    timerDisplay.textContent = "Your Score: " + (correctCount/questionCount * 100);
    timerLabel.textContent = "";
    questionText.textContent = "Please enter your initials and submit for the highsscores list";
    answerList.style.display = "none";
    initialsInput.style.display = "block";
    initialButton.style.display= "block";
}

//Save result to high scores list and go to page
function saveHighScore() {
    
    var initals= initialsInput.value;
    //Check initialsInput were submitted
    if (initals === null || initals === "" || initals.length > 3) {
        if (!confirm("No intials submitted or too long. Please try again or cancel")) {
            return;
        }
    }
    
    var savedScores = JSON.parse(localStorage.getItem("highScores"));
    if (savedScores===null) {
        var highScores = {};
    }

    highScores = savedScores;
    highScores[initialsInput.value] = (correctCount/questionCount * 100) ;
    // set new entry to local storage 
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayScores () {
    var savedScores = JSON.parse(localStorage.getItem("highScores"));

    //Clear unused elements
    headerSection.style.display = "none";
    questionText.style.display = "none";

    //Set header text
    headerText.textContent = "Javascript Quizmaster High Scores";

    //Build high scores list
    if (savedScores != "" && savedScores != null && Object.keys(savedScores).length > 0) {
        for (var key in savedScores) {
            if (Object.hasOwnProperty.call(savedScores, key)) {       
                var score = key + " : " + savedScores[key] + "%";
                var li = document.createElement("li");
                li.textContent = score;
                li.style.textAlign = "center";
                answerList.appendChild(li);
            }
        }
    }
}

function resetQuestionCard() {
    headerSection.style.display= "block";
    headerText.textContent="Javascript Quizmaster";
    startButton.value = "Start Quiz";
    startButton.style.opacity = 1.0;
    timerDisplay.textContent = setTime;
    questionText.textContent = `Try to answer the following javascript questions within the set time. Wrong answer will
    penalise your score and time remaining. Good luck!`;
    answerList.style.display = "block";
    initialsInput.style.display = "none";
    initialButton.style.display= "none";

    return;
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
    initialsInput.style.display = "none";
    initialButton.style.display = "none";

    // displayScores();
}

//-----------------------------------------------------------

init();