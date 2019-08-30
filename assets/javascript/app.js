//main object contains question a related image url correct answer and 4 options for each question

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


// global variables
var counter = -1, correctAnswers = 0, wrongAnswers = 0, time = 5, interval, clockRunning = false, overalTime = 0;
// functions 

// checkAnswer gets parameter , first one is the button lable and 2nd is the correct answer from our object
function checkAnswer(userChose, correctAnswer) {

    if (userChose === correctAnswer) {
        // if correct answer , adds number of correct answers and a green smily face to the html 
        correctAnswers++;
        $("#correctAnswersCounter").text("Correct Answers : " + correctAnswers);

        var newSpan = $("<span>").addClass("m-1 bg-success").css("opacity", "0").animate({ opacity: '1' }, "slow");
        newSpan.text("☺");
        $("#correctAnswers").append(newSpan);
        return true;

    }
    else {
        // if NOT correct answer , adds number of NOT correct answers and a red sad face to the html 
        wrongAnswers++;
        $("#wrongAnswersCounter").text("wrong Answers : " + wrongAnswers);

        var newSpan = $("<span>").addClass("m-1 bg-warning").css("opacity", "0").animate({ opacity: '1' }, "slow");
        newSpan.text("☹");
        $("#wrongAnswers").append(newSpan);
        return false;

    }

}

//  empty the containers and shows new question an image and generats 4 options , resets the timer
function nextQuestion() {
    $("p").remove();
    $(".img").remove();

    console.log("next empty");
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

        // show question and image wraped in myDiv inside questions container

        var newImg = $("<img>").addClass("img p-1 m-2 img-thumbnail");
        newImg.attr("src", questions[counter].imgUrl);
        var newDiv = $("<div>").addClass("d-flex justify-content-center").attr("id", "myDiv");
        // with css and animate , new question has a Fade-in effect
        newDiv.append($("<p>").text(questions[counter].question), newImg).css("opacity", "0").animate({ opacity: '1' }, "slow");
        $("#question").append(newDiv);


        // generats 4 options
        $("#options").empty();

        for (i = 0; i < 4; i++) {
            var newButton = $("<button>").text(questions[counter].answers[i]);
            // newButton.attr("id","")
            newButton.addClass("btn btn-default m-1 optButton");
            $("#options").append(newButton)
        }


        // on options click we check the answer and recall new question
        $(".btn").click(function () {

        })

    }


    // if there is no more question left we show overall result
    else {
        showResult();
    }
}
$(document).on("click", ".optButton", function (event) {
    // disable buttons after click
    $(".optButton").attr("disabled", true);
    // stop the clock
    if (clockRunning) {
        clearInterval(interval);

    }
    clockRunning = false;
    time = 5

    // checkAnswer will return True or False
    if (checkAnswer($(this).text(), questions[counter].correct_answer)) {
        // tell user the answer was correct
        $("#question").empty();

        //  correct answer for 2 seconds
        var newP = $("<p>").text("well done!! the correct answer was : "+questions[counter].correct_answer);
        newP.css("color", "green");
        
        $("#question").prepend(newP);


        setTimeout(function () { nextQuestion() }, 2000);
    } else {
        // tell user the answer was NOT correct
        $("#question").empty();


        //  correct answer for 2 seconds
        var newP = $("<p>").text("Sorry , Wrong answer!! the correct answer was : " + (questions[counter].correct_answer));
        newP.css("color", "red");
     
        $("#question").prepend(newP);


        setTimeout(function () { nextQuestion() }, 2000);
    };

    // nextQuestion();


});

// shows overall result , resets all variables and html , stop the timer
function showResult() {
    $("#questions").empty();

    $("#question").append("<h1 id=\"result\">your result is : " + (correctAnswers * 10) + "%  And  your overall time was: " + (timeConverter(overalTime)) + "</h1>");


    $("#options").empty();
    counter = -1;
    correctAnswers = 0;
    wrongAnswers = 0;
    overalTime = 0;
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
        $("#result").remove();
        nextQuestion();
    })
}

// starts the app , creat start button
function start() {
    $("#options").empty();
    $("#questions").empty();
    console.log("start empty");
    $("#question").append($("<p>").text("Do you always know where you are when it comes to geography trivia? \t If you think you do, then test your knowledge now with these free geography trivia questions and answers...?"));
    var newImg = $("<img>").addClass("img p-1 m-2");
    newImg.attr("src", "assets\\images\\ng.jpg");
    $("#question").append(newImg);
    $("#options").text("");
    var newButton = $("<button>").text("Start");
    newButton.attr("id", "start");
    newButton.addClass("btn btn-default m-1");
    $("#options").append(newButton)

    $("#start").click(function () {
        nextQuestion();
    })

}



// timer function ,count down , and keeps the overal time spent
function count() {


    time--;
    overalTime++;

    var converted = timeConverter(time);

    // if we ran out of time 
    if (time == 0) {

        //  we compare apple to oranges , result is a wrong answer
        checkAnswer("apple", "oranges");
        $("#options").empty();

        if (clockRunning) {
            clearInterval(interval);

        }
        clockRunning = false;
        time = 5;

        $("p").remove();
        $(".img").remove();

        // let user know that times up and correct answer for 2 seconds
        var newP = $("<p>").text("times up!! the correct answer was : " + questions[counter].correct_answer);
        newP.css("color", "red");
        $("#question").prepend(newP);


        setTimeout(function () { nextQuestion() }, 2000);

    }
    // show timer on screen
    $("#timer").text(converted);
}

// convert timer to 00:00 format
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


$(document).ready(function () {
    start();
});