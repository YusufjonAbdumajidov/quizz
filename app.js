const start = document.getElementById("start");
const quiz = document.getElementById('quiz');
const counter = document.getElementById('counter');
const timeGauge = document.getElementById("timeGauge");
const questionPut = document.getElementById('question');
const pic = document.getElementById('pic');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const progress = document.getElementById('progress');
const scoreContainer = document.getElementById('scoreContainer');


start.addEventListener("click", ()=>{
    quiz.style.display = 'block';
    start.style.display = 'none';
    startQuiz();
});

document.body.addEventListener('keyup', event=>{
    if(event.code == 'Space'){
        quiz.style.display = 'block';
        start.style.display = 'none';
        startQuiz();
    }
});

// Start Quiz 

const startQuiz = () =>{
    renderQuestion();
    renderTime();
    TIME = setInterval(renderTime, 1000);
    ProgressCircles();
}


// Questions

let questions = [
    {
        question : "Book helps you develop many skills",
        pic : "p1.jpg",
        choiceA : "True",
        choiceB : "False",
        correct : "A"
    },
    {
        question : "Going to gym makes you healthy",
        pic : "gym.jpg",
        choiceA : "False",
        choiceB : "True",
        correct : "B"
    },
    {
        question : "Eating healthy food is better than eating fast food",
        pic : "food.jpg",
        choiceA : "False",
        choiceB : "True",
        correct : "B"
    },
    {
        question : "Sleeping 8 hours a day is very good",
        pic : "sleep.jpg",
        choiceA : "True",
        choiceB : "False",
        correct : "A"
    },
    {
        question : "Drinking 2 litres of water better that drinking alcohol",
        pic : "water.jpg",
        choiceA : "False",
        choiceB : "True",
        correct : "B"
    },
    {
        question : "Studying one subject professionlly is better that studying many subjects partially!",
        pic : "study.jpg",
        choiceA : "True",
        choiceB : "False",
        correct : "A"
    },
    
];

const lastQuestion = questions.length - 1; //2
let currentQuestion = 0;
const questionTime = 10;
const gaugeWidth = 220; 
const gaugeUnit = gaugeWidth/questionTime;
let count = 0;
let TIME;
let score = 0;  

// Circle Container

function ProgressCircles(){
    for(let j=0; j<questions.length; j++){
        progress.innerHTML += "<div class='pro' id="+ j +"></div>"; 
    }
}


function renderQuestion(){
    let q = questions[currentQuestion];

    questionPut.innerHTML = "<p>"+ q.question +"</p>"; 
    pic.innerHTML = "<img src="+ q.pic +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
}

const renderTime = () =>{
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }else{
        count = 0;
        wrongAnswer();
        if(currentQuestion < lastQuestion){
            currentQuestion++;
            renderQuestion();
        }else{
            endCounter();
        }
    }
}





// Checking Answers

function checkAnswer(answer){
    if(answer == questions[currentQuestion].correct){
        correctAnswer();
        score++;
    }else{
        wrongAnswer();
      
    }
    count = 0;
        if(currentQuestion < lastQuestion){
            currentQuestion++;
            renderQuestion();
        }else{
            endCounter();
        }
}



const correctAnswer = () =>{
    document.getElementById(`${currentQuestion}`).style.backgroundColor = "green";
    document.getElementById(`${currentQuestion}`).style.borderColor = "green";
}

const wrongAnswer = () =>{
    document.getElementById(`${currentQuestion}`).style.backgroundColor = "red";
    document.getElementById(`${currentQuestion}`).style.borderColor = "red";
}


// End counter 

function endCounter(){
    if(currentQuestion >= lastQuestion){
        clearInterval(TIME);
        scoreCalculator()
    }
}



//Score Calculator

function scoreCalculator(){
    scoreContainer.style.display = "block";
    const result = Math.round(score * 100/questions.length);

    let img = (result >= 80) ? "5.png" :
              (result >= 60) ? "4.png" :
              (result >= 40) ? "5.png" :
              (result >= 20) ? "5.png" : "1.png";
    scoreContainer.innerHTML = "<img src="+ img +">";;
    scoreContainer.innerHTML += "<p>"+ result +"%</p>";
    scoreContainer.innerHTML += "<div class='back' >Back</div>"
}


scoreContainer.addEventListener("click", ()=>{
    window.location.reload();
})








