
var questions = [
    {
        question: "The body of the Egyptian Sphinx was based on which animal?",
        imgUrl: "assets\\images\\01.jpg",
        correct_answer: "Lion",
        answers: [
            "Bull",
            "Horse",
            "Dog",
            "Lion"
        ]
    },
    {

        question: "What state is the largest state of the United States of America?",
        imgUrl: "assets\\images\\02.png",
        correct_answer: "Alaska",
        answers: [
            "California",
            "Alaska",
            "Texas",
            "Washington"
        ]
    },
    {

        question: "All of the following are classified as Finno-Ugric languages EXCEPT:",
        imgUrl: "assets\\images\\03.jpg",
        correct_answer: "Samoyedic",
        answers: [
            "Hungarian",
            "Finnish",
            "Samoyedic",
            "Estonian"
        ]
    },
    {

        question: "Which of the following languages does NOT use the Latin alphabet?",
        imgUrl: "assets\\images\\04.jpg",
        correct_answer: "Georgian",
        answers: [
            "Georgian",
            "Turkish",
            "Swahili",
            "Vietnamese"
        ]
    },
    {
        question: "What is the capital of Spain?",
        imgUrl: "assets\\images\\05.png",
        correct_answer: "Madrid",
        answers: [
            "Madrid",
            "Barcelona",
            "Sevilla",
            "Toledo"
        ]
    },
    {

        question: "Which nation claims ownership of Antarctica?",
        imgUrl: "assets\\images\\06.jpg",
        correct_answer: "No one, but there are claims.",
        answers: [
            "United States of America",
            "No one, but there are claims.",
            "United Nations",
            "Australia"
        ]
    },
    {

        question: "Which of these is the name of the largest city in the US state Tennessee?",
        imgUrl: "assets\\images\\07.jpg",
        correct_answer: "Memphis",
        answers: [
            "Thebes",
            "Alexandria",
            "Luxor",
            "Memphis"
        ]
    },
    {

        question: "What is the name of the peninsula containing Spain and Portugal?",
        imgUrl: "assets\\images\\08.jpg",
        correct_answer: "Iberian Peninsula",
        answers: [
            "European Peninsula",
            "Iberian Peninsula",
            "Peloponnesian Peninsula",
            "Scandinavian Peninsula"
        ]
    },
    {

        question: "What is the capital of the US State of New York?",
        imgUrl: "assets\\images\\09.jpg",
        correct_answer: "Albany",
        answers: [
            "Buffalo",
            "New York",
            "Albany",
            "Rochester"
        ]
    },
    {

        question: "How many countries does Mexico border?",
        imgUrl: "assets\\images\\10.png",
        correct_answer: "3",
        answers: [
            "2",
            "3",
            "4",
            "1"
        ]
    }
]
var counter = -1, correctAnswers = 0, wrongAnswers = 0, time = 5, interval, clockRunning = false,overalTime=0;

function checkAnswer(userChose, correctAnswer) {
    console.log(userChose === correctAnswer)
    if (userChose === correctAnswer) {
        console.log("correct");
        correctAnswers++;
        $("#correctAnswersCounter").text("Correct Answers : " + correctAnswers);

        var newSpan = $("<span>").addClass("m-1 bg-success");
        newSpan.text("☺");
        $("#correctAnswers").append(newSpan);
    }
    else {
        console.log("wrong");
        wrongAnswers++;
        $("#wrongAnswersCounter").text("wrong Answers : " + wrongAnswers);

        var newSpan = $("<span>").addClass("m-1 bg-warning");
        newSpan.text("☹");
        $("#wrongAnswers").append(newSpan);
    }

}
function nextQuestion() {
    if (clockRunning) {
        clearInterval(interval);

    }
    clockRunning = false;
    time = 5
    if (!clockRunning) {
        interval = setInterval(count, 1000);
        clockRunning = true;
    }

    counter++
    if (counter < questions.length) {
        $("#question").text(questions[counter].question);
        var newImg = $("<img>").addClass("img");
        newImg.attr("src",questions[counter].imgUrl);
        $("#question").append(newImg);

        $("#options").empty();

        for (i = 0; i < 4; i++) {
            var newButton = $("<button>").text(questions[counter].answers[i]);

            newButton.addClass("btn btn-default m-1 ");
            $("#options").append(newButton)
        }

        $(".btn").click(function () {
            var userAnswer =
                checkAnswer($(this).text(), questions[counter].correct_answer);
            nextQuestion();
        })

    }
    else {
        console.log("else")
        showResult();
    }
}
function showResult() {
    $("#question").text("");
    $("#question").append("<h1>your result is : " + (correctAnswers * 10) + "%  And  &nbsp</h1>");
    $("#question").append("<br><h1>your overall time was: " + (timeConverter(overalTime)) + "</h1>");

    $("#options").empty();
    counter = -1;
    correctAnswers = 0;
    wrongAnswers = 0;
    $("#correctAnswersCounter").text("Correct Answers : ");
    $("#correctAnswers").empty();
    $("#wrongAnswersCounter").text("wrong Answers : ");
    $("#wrongAnswers").empty();
    var newButton = $("<button>").text("Restart");
    newButton.attr("id", "start");
    newButton.addClass("btn btn-default m-1");

    if (clockRunning) {
        clearInterval(interval);

    }
    clockRunning = false;
    time = 5


    $("#options").append(newButton)

    $("#start").click(function () {
        nextQuestion();
    })
}
function start() {
    $("#options").empty();
    $("#questions").empty();

    $("#question").text("Do you always know where you are when it comes to geography trivia?\\nIf you think you do, then test your knowledge now with these free geography trivia questions and answers...?");
    $("#options").text("");
    var newButton = $("<button>").text("Start");
    newButton.attr("id", "start");
    newButton.addClass("btn btn-default m-1");
    $("#options").append(newButton)

    $("#start").click(function () {
        nextQuestion();
    })

}
start();



function count() {

    // DONE: increment time by 1, remember we cant use "this" here.
    time--;
overalTime++;
    // DONE: Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    var converted = timeConverter(time);

    if (time == 0) {
        console.log("times up");
        checkAnswer(1, 2);
        $("#options").empty();
        $("#questions").empty();
        if (clockRunning) {
            clearInterval(interval);
    
        }
        clockRunning = false;
        time = 5

        $("#question").text("times up \\n the correct answer was : "+questions[counter].correct_answer);
        setTimeout(function(){ nextQuestion()}, 2000);

    }
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#timer").text(converted);
}
function timeConverter(t) {

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

    return minutes + ":" + seconds;
}