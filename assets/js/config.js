//Array variable for questions
var arrQuestions = `
 [
        {"Q":"Javascript is the best language?",
        "1":"True",
        "2":"False",
        "A":"1"}
    ,
        {"Q":"Which brackets are used to create an object in javascript?",
        "1":"[ ]",
        "2":"{ }",
        "3":"( )",
        "4":"| |",
        "A":"2"}
]
`
//Levels object
var objLevels = {
    Level1 : "Study Up",
    Level2 : "Newbie",
    Level3 : "Average",
    Level4 : "Expert",
    Level5 : "Guru"
}

//Time var for game - in seconds
var setTime = 30;

//Time penalty for wrong answer - in seconds
var setTimePenalty = 5;