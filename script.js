///Pointers to DOM Elements
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
var maxscore = localStorage.getItem("maxscore") || 0;
displaylocalstorage();
function displaylocalstorage(){
    var userInitial = localStorage.getItem("userId") || "Welcome User";
var maxscore = localStorage.getItem("maxscore") || 0;
previoususer.innerHTML = `
<h3>User with Max Score</h3>
<p>User : ${userInitial}</p>
<p>Max Score: ${maxscore}</p>
`
}

// same for question and options
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

// create some variables

const lastQuestion = quizArray.length-1 ;
let runningQuestion = 0;
let count = 10 *  quizArray.length;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let losses = 0;

// render a question
function renderQuestion(){
    let q = quizArray[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    option1.innerHTML = q.option1;
    option2.innerHTML = q.option2;
    option3.innerHTML = q.option3;
}

startbtn.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    startbtn.style.display = "none";
  
    game.style.display = "block";
    renderQuestion();
    //renderProgress();
    //renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

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
        // change progress color to red
      
    }
}

// checkAnwer

function checkAnswer(event){
    var answer = event.getAttribute("data-value");
    console.log("On click",answer,"The user clicked this");
    console.log(`On Click ${answer} The user clicked this`)
    if( answer == quizArray[runningQuestion].answer){
        // answer is correct
        score++;
        count += 5;
        result.innerHTML = `<p class="bg-success">You got it! You gained 5 secs </p>`
        // change progress color to green
        //answerIsCorrect();
    }else{
        losses++;
        count -= 10;
        result.innerHTML = `<p class="bg-danger"> Wrong! TYou lost 10 secs </p>`
        // answer is wrong
        // change progress color to red
        //answerIsWrong();
    }
    
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
//function answerIsCorrect(){
//    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
//}

//// answer is Wrong
//function answerIsWrong(){
//    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
//}

// score render
function scoreRender(){
    
     game.style.display = "none";

    resultsContainer.style.display = "block";
    userResults.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    scorePerCent = Math.round(100 * score/quizArray.length);
    console.log("Score",scorePerCent)
    
    resultsContainer.innerHTML += "<p>"+ scorePerCent +"%</p>";


}

function saveuser(){
    var user = document.getElementById("user").value;
    
    if ( parseInt(scorePerCent) > parseInt(maxscore)){
        console.log(scorePerCent,user)
        localStorage.setItem("userId",user)
        localStorage.setItem("maxscore",scorePerCent)
        displaylocalstorage()
    }
}