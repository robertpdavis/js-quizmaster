//Javascript Quizmaster code


var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer-display");
var answerList = document.querySelector("#answer-list");
var timeLeft = setTime;
var correct = 0;
var wrong = 0;
var questionCount = 0;
var questionNum = 0;


startButton.addEventListener("click", function(event) {
    event.preventDefault();
    startQuiz();
});

function startQuiz () {

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
    question = arrQuestions[];

    // Render a new li for each todo
    for (var i = 0; i < todos.length; i++) {
    var answers = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

 
    answerList.appendChild(li);
    }
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

function init() {
    //Display timer start time
    timerDisplay.textContent = setTime;

    //Shuffle questions
    // console.log(arrQuestions);
    arrQuestions = shuffle(arrQuestions);
    // console.log(arrQuestions);

    questionCount = arrQuestions.length;
    console.log(questionCount);
}

init();