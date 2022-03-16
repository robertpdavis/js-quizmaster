//Javascript Quizmaster code

//Set variables
//Set DOM object vars
var headerCard = document.querySelector("#header-card");
var headerText = document.querySelector("#header-text");
var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer-display");
var timerLabel = document.querySelector("#timer-label");
var questionText = document.querySelector("#question-text");
var listCard = document.querySelector("#list-card");
var answerList = document.querySelector("#answer-list");
var resultText = document.querySelector("#result-text");
var listButton1 = document.querySelector("#list-button1");
var listButton2 = document.querySelector("#list-button2");
var initialsInput = document.querySelector("#initials-input");
//Set other global vars
var timer;
var timeLeft;
var correctCount;
var questionCount = 0;
var questionNum;


//Listeners---------------------------------------------------
//Start button
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    if (startButton.value === "Redo Quiz") {
        resetQuiz();
    }

    startButton.disabled = true;
    startButton.style.opacity = 0.5;
    startQuiz();
});

//Answer selection buttons
answerList.addEventListener("click", function(event) {
    event.preventDefault();
    //Check the answer and call the next question
    checkAnswer(event);
    displayQuestion();
});

//List input button
listButton1.addEventListener("click", function(event) {
    event.preventDefault();
    //Go back to quiz from high scores
    if (event.target.value === "Go Back") {
        resetQuiz();
    //Go to high scores from main screen
    } else if (event.target.value === "High Scores") {
        displayScores();
    //Must be save high score
    } else {
        //User does not want to saves score. Go back to start
        if (saveHighScore() === false) {
            resetQuiz();
        }
    }
});
//-----------------------------------------------------------


//Functions--------------------------------------------------

function startQuiz () {
    //Set vars
    timeLeft = setTime;
    correctCount = 0;
    questionNum = 0;

    //Apply DOM changes
    listButton1.style.display = "none";
    listCard.classList.add("list-card-questions");
    timerLabel.textContent = "Seconds Remaining";

    //Shuffle questions so not in the same order for each quiz
    arrQuestions = shuffle(arrQuestions);
    
    //Display first question
    displayQuestion();

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds or 1 second
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

            //Apply DOM changes
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
        questionText.textContent = "Q" + Math.round(questionNum + 1) + ":" + question["Q"];

        //Establish an unordered list of answers
        for (var key in question) {
            if (Object.hasOwnProperty.call(question, key)) {
                if (key != "Q" && key != "A") {         
                    var answer = key + "." + question[key];
                    var li = document.createElement("li");
                    var button = document.createElement("button");
                    button.classList.add("list-card-button");
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
            //If answer correct, increment correct counter
            correctCount++;
            resultText.innerHTML= "<br><hr><br>Correct";
        } else  {
            //Take time off for wrong answer
            timeLeft = timeLeft - setTimePenalty;
            resultText.innerHTML = "<br><hr><br>Wrong";
        }
        //Dispay if answer was correct or wrong for a period
        setTimeout(function () {
            resultText.innerHTML = "";       
        },750);

        //Increment the quesiton counter to get the next question
        questionNum++;
    }
}

//Display quiz result on sreen
function displayResult() {
    //Apply DOM changes
    listCard.className = "list-card";
    timerDisplay.textContent = "Your Score: " + Math.round(correctCount/questionCount * 100) + "%";
    timerLabel.textContent = "";
    questionText.textContent = "Please enter your initials and click save to save your score in the high scores list";
    //Clear and hide answer list
    answerList.innerHTML = "";
    answerList.style.display = "none";
    //Show input box and submit button
    initialsInput.style.display = "block";
    listButton1.style.display= "inline-block";
    listButton1.value= "Save Score";
}

//Save result to high scores list in local storage
function saveHighScore() {
    var initials= initialsInput.value;
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    //Check initialsInput were submitted
    if (initials === null || initials === "" || initials.length > 3) {
        if (!confirm("No intials submitted or too long. Please try again or cancel")) {
            //Clear initials from input
            initialsInput.value = "";
            return false;
        } else {
            //Clear initials from input
            initialsInput.value = "";
            return true;
        }
    }

    //Make sure initals are uppercase
    initials = initials.toUpperCase();

    //Check if stored scores are set. If not initialise object first.
    if (highScores === null) {
        var highScores = {};
        highScores[initials] = Math.round(correctCount/questionCount * 100) ;
    } else {
        highScores[initials] = Math.round(correctCount/questionCount * 100) ;
    }

    // set new entry to local storage 
    localStorage.setItem("highScores", JSON.stringify(highScores));

    //Clear initials from input
    initialsInput.value = "";

    //Display scores after saving
    displayScores();
}

//Display scores
function displayScores () {
    var savedScores = JSON.parse(localStorage.getItem("highScores"));
    var sortedScores = [];

    //Hide unused elements and set style
    headerCard.style.display = "none";
    questionText.style.display = "none";
    initialsInput.style.display = "none";
    listCard.classList.add("list-card-scorelist");

    //Unhide answer list, button and change text postion near bottom
    answerList.style.display = "block";
    listButton1.style.display = "inline-block";
    listButton2.style.display = "inline-block";
    listButton1.value= "Go Back";

    //Set header text
    headerText.textContent = "Javascript Quizmaster High Scores";

    //Build high scores list
    if (savedScores != "" && savedScores != null && Object.keys(savedScores).length > 0) {

        //Convert object to array
        for (var score in savedScores) {
            sortedScores.push([score, savedScores[score]]);
        }

        //Sort the array - descending
        sortedScores.sort(function(a, b) {
            return b[1] - a[1];
        });

        //Display the scores in a ul list
        sortedScores.forEach( function(value, index, array) {
            //Top 15 scores only
            if (index < 15) {
                var score = value[0] + " : " + value[1] + "%";
                var li = document.createElement("li");
                //Apply the stores style
                li.classList.add("list-card-scores");
                li.textContent = score;
                answerList.appendChild(li);
            }
        })
    } else {
        questionText.style.display = "block";
        questionText.textContent = "No scores to display"
    }
}

//Resets the quiz to inital display
function resetQuiz() {
    headerCard.style.display= "block";
    headerText.textContent="Javascript Quizmaster";
    startButton.value = "Start Quiz";
    startButton.style.opacity = 1.0;
    timerDisplay.textContent = setTime;
    timerLabel.textContent = "Total Time For Quiz"
    questionText.style.display = "block";
    questionText.textContent = `Try to answer the following javascript questions within the set time. Wrong answer will
    penalise your score and time remaining. Good luck!`;
    listCard.className = "list-card";
    answerList.style.display = "block";
    answerList.innerHTML = "";
    initialsInput.style.display = "none";
    listButton1.style.display= "inline-block";
    listButton2.style.display = "none";
    listButton1.value= "High Scores";
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
    listButton2.style.display = "none";
}

//-----------------------------------------------------------

init();

//End