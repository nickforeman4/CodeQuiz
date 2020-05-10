///DOM Elements
var startbtn = document.getElementById("startbtn");
var game = document.getElementById("gameContainer");
var question = document.getElementById("question");
var result = document.getElementById("result");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var userResults = document.getElementById("userResults");
var resultsContainer = document.getElementById("resultsContainer");
var previoususer = document.getElementById("previoususer")
var scorePerCent = 0;

game.style.display = "none";
userResults.style.display = "none";

// Local Storage
var userInitial = localStorage.getItem("userId") || "Welcome User";
var maxScore = localStorage.getItem("maxScore") || 0;
displaylocalstorage();
function displaylocalstorage(){
    var userInitial = localStorage.getItem("userId") || "Welcome User";
var maxScore = localStorage.getItem("maxScore") || 0;
previoususer.innerHTML = `
<h3>User with Max Score</h3>
<p>User : ${userInitial}</p>
<p>Max Score: ${maxScore}</p>
`
}

// Questions and Options
var quizArray = [
    {
        question: "What does CSS mean?",
        option1: "Cascasding Style Sheet",
        option2: "Clean Silver Spoons",
        option3: "Cool Swimming Seals",
        answer: 0
    },{
        question: "What is HTML mean?",
        option1: "Hip To My Lingo",
        option2: "Hyper Text Markup Language",
        option3: "Hot Tamales & Meat Loaf",
        answer: 1
    },{
        question: "Where is the University of Texas?",
        option1: "Dallas",
        option2: "Houston",
        option3: "Austin",
        answer: 2
    }
];

// Additional Variables

const lastQuestion = quizArray.length-1 ;
let runningQuestion = 0;
let count = 10 *  quizArray.length;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let losses = 0;

// Renders Question
function renderQuestion(){
    let q = quizArray[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    option1.innerHTML = q.option1;
    option2.innerHTML = q.option2;
    option3.innerHTML = q.option3;
}

startbtn.addEventListener("click",startQuiz);

// Starts Quiz
function startQuiz(){
    startbtn.style.display = "none";
    game.style.display = "block";
    renderQuestion();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// Renders Counter
function renderCounter(){
    counter.innerHTML = count;
    console.log(count)
    if(count > 0){
        count--
        
    }else{
        count = 0;
        counter.innerHTML = "Time Up!";
        clearInterval(TIMER);
        scoreRender();
    }
}

// Checks Answer
function checkAnswer(event){
    var answer = event.getAttribute("data-value");
    console.log("On click",answer,"The user clicked this");
    console.log(`On Click ${answer} The user clicked this`)
    if( answer == quizArray[runningQuestion].answer){
        // If answer is correct
        score++;
        result.innerHTML = `<p class="bg-success"> You are correct! </p>`
    }else{
        // If answer is incorrect
        losses++;
        count -= 10;
        result.innerHTML = `<p class="bg-danger"> Wrong! You just lost 10 seconds. </p>`
        }
    
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        //Ends the quiz and show score
        clearInterval(TIMER);
        scoreRender();
    }
}

// Renders Score
function scoreRender(){
    game.style.display = "none";
    resultsContainer.style.display = "block";
    userResults.style.display = "block";
    
    // Calculates the user's score
    scorePerCent = Math.round(100 * score/quizArray.length);
    console.log("Score",scorePerCent)

    resultsContainer.innerHTML += "<p>"+ scorePerCent +"%</p>";
    
}

function saveUser(){
    var user = document.getElementById("user").value;

    if ( parseInt(scorePerCent) > parseInt(maxScore)){
        console.log(scorePerCent,user)
        localStorage.setItem("userId",user)
        localStorage.setItem("maxScore",scorePerCent)
        displaylocalstorage()
    }
}