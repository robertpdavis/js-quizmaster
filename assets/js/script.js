//Javascript Quizmaster code


var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer-display");
var questionText = document.querySelector("#question-text");
var answerList = document.querySelector("#answer-list");
var timeLeft = setTime;
var correct = 0;
var wrong = 0;
var questionCount = 0;
var questionNum = 0;


//Listeners
//Start button
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    startQuiz();
});

//Answer selection
answerList.addEventListener("click", function(event) {
    event.preventDefault();
    //Check the answer and call the next question
    checkAnswer();
});



function startQuiz () {

    //Shuffle questions so no in the same order for each quiz
    arrQuestions = shuffle(arrQuestions);
    
    //Display first question
    displayQuestion();

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timer = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0) {

            timeLeft--;
            timerDisplay.textContent = timeLeft;
        //Quiz over    
        } else {
            // Use `clearInterval()` to stop the timer
            clearInterval(timer);
            // Call the `displayResult()` function
            displayResult();
        }
    }, 1000);

}

function displayQuestion() {
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
    return;
}

//Check the answer selected - dislay result on screen and record result
function checkAnswer() {

}

//Display quiz result on sreen
function displayResult() {
    timerDisplay.textContent ="";

}

//Save reesult to high scores list
function saveResult() {
    
 // set new submission to local storage 
 localStorage.setItem("user", JSON.stringify(user));
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
    questionCount = arrQuestions.length;

}

init();