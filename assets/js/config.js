//Array variable for questions
var arrQuestions = `
 [
        {"Q":"Javascript is the best language?",
        "1":"true",
        "2":"false",
        "A":"1"}
    ,
        {"Q":"Which brackets are used to enclose an object in javascript?",
        "1":"square brackets",
        "2":"curly brackets",
        "3":"parentheses",
        "4":"double quotes",
        "A":"2"}
    ,
        {"Q":"The condition in an if/else statement is enclosed within ____.",
        "1":"quotes",
        "2":"curly brackets",
        "3":"parentheses",
        "4":"square brackets",
        "A":"3"}
    ,
        {"Q":"Arrays in javascript can be used to store ____.",
        "1":"strings and numbers",
        "2":"other arrays",
        "3":"objects",
        "4":"all of the above",
        "A":"4"}
    ,
        {"Q":"String values must be enclosed within ____ when being assigned to variables.",
        "1":"commas",
        "2":"curly brackets",
        "3":"quotes",
        "4":"parentheses",
        "A":"1"}
    ,
        {"Q":"A very useful tool used during development and debugging for printing content to the debugger is:",
        "1":"JavaScript",
        "2":"terminal/bash",
        "3":"printer",
        "4":"console.log",
        "A":"4"}
]`;

//Time var for game - in seconds
var setTime = 30;

//Time penalty for wrong answer - in seconds
var setTimePenalty = 5;