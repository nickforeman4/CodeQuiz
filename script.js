///Pointers to DOM Elements
var startbtn = document.getElementById("startbtn");
var question = document.getElementById("question");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var counter = document.getElementById("counter")


// same for question and options
var quizArray = [
    {
        question: "What does CSS mean?",
        option1: "Cascasding Style Sheet",
        option2: "Clean Silver Spoons",
        option3: "Cold Swimming Seals",
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