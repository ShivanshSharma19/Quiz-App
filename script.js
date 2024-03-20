const questions = [
    {
        question: "Who is known as the father of computers?",
        answers:[
            {text: "Clifford Berry" , correct : false},
            {text: "Alan Turing" , correct : false},
            {text: "Douglas Englebart" , correct : false},
            {text: "Charles Babbage" , correct : true},
        ]
    },

    {
        question: "In which of the following states is the Bhitarkanika National Park situated?",
        answers:[
            {text: "Goa" , correct : false},
            {text: "odisha" , correct : true},
            {text: "Meghalaya" , correct : false},
            {text: "Kerala" , correct : false},
        ]
    },

    {
        question: "Which is the largest union territory in India in terms of area?",
        answers:[
            {text: "Chandigarh" , correct : false},
            {text: "punucherry" , correct : false},
            {text: "Ladhakh" , correct : true},
            {text: "Jammu and Kashmir" , correct : false},
        ]
    },

    {
        question: "Dennis Ritchie is known as the father of which language?",
        answers:[
            {text: "Python" , correct : false},
            {text: "C" , correct : true},
            {text: "Java" , correct : false},
            {text: "None of the above" , correct : false},
        ] 
    },

    {
        question: "In which of the following countries was the first hockey association formed?",
        answers:[
            {text: "The US" , correct : false},
            {text: "Spain" , correct : false},
            {text: "India" , correct : false},
            {text: "The UK" , correct : true},
        ]
    }
];



const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
} 

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);

    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click" , () =>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});
startQuiz();