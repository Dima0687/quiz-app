import { data as questions } from "./quizData.js"

let shuffledAnswers;
let question;

function renderTheQuestionAndAnswers(){

    const spanCountFrom = document.querySelector('#count-from');
    const spanCountTo = document.querySelector('.count-to');
    const progressBar = document.querySelector('#progress-bar');

    spanCountTo.innerText = questions.length;
    spanCountFrom.innerText = getCountOfCurrentProgress();

    if(getCountOfCurrentProgress() > spanCountTo.innerText) {
        spanCountFrom.innerText = spanCountTo.innerText;
    }

    progressBar.setAttribute('max', questions.length);
    progressBar.setAttribute('value', getCountOfCurrentProgress());

    const quest = pickOneQuestion();
    question = quest?.question ?? endTheQuizRound();
    shuffledAnswers = shuffleTheAnswers(quest?.answers);
    document.querySelector('#quiz-question').innerText = question;
 
    document.querySelectorAll('.quiz-answer > span').forEach( (span, i) =>{
        const answer = shuffledAnswers[i]?.answer;
        span.innerText = answer;
    });
}
renderTheQuestionAndAnswers();


document.querySelectorAll('.btn-answer').forEach( (btn, i) => {
    btn.addEventListener('click', e => {
        const isRight = shuffledAnswers[i].rightAnswer;
        if(isRight){
            addWrongOrRight(question, isRight);
            renderTheQuestionAndAnswers();
            return
        } else {
            addWrongOrRight(question, isRight);
            renderTheQuestionAndAnswers();
            return
        }
    });
});


function endTheQuizRound(){
    createModal();
    restartButton();
}


function restartButton() {
    const restartButton = document.querySelector('#restart-game');

    restartButton.addEventListener('click', e => {
        location.reload();
    });
}

function createModal(){
    const body = document.querySelector('body');

    const modalBackground = document.createElement('div');
    const modal = document.createElement('div');

    const h2 = document.createElement('h2');
    const spanCountTo = document.createElement('span');
    
    const counterContainer = document.createElement('div');

    const pWrongAnswer = document.createElement('p');
    const pSpan1 = document.createElement('span'); 
    const iXMark = document.createElement('i');
    
    const pRightAnswer = document.createElement('p');
    const pSpan2 = document.createElement('span'); 
    const iCheck = document.createElement('i');
    
    const playAgainButton = document.createElement('button');


    h2.textContent = 'Questions: ';
    spanCountTo.setAttribute('class', 'count-to');
    spanCountTo.textContent = questions.length;
    h2.append(spanCountTo);

    iXMark.setAttribute('class', 'fa-regular fa-circle-xmark');
    iCheck.setAttribute('class', 'fa-regular fa-circle-check');

    pWrongAnswer.setAttribute('class', 'wrong-answers');
    pRightAnswer.setAttribute('class', 'right-answers');

    pSpan1.textContent = ` ${document.querySelector('.wrong-answers span').innerText}`;
    pSpan2.textContent = ` ${document.querySelector('.right-answers span').innerText}`;
    pWrongAnswer.append(iXMark, pSpan1);
    pRightAnswer.append(iCheck, pSpan2);
    
    counterContainer.setAttribute('id', 'counter-container');
    counterContainer.append(pWrongAnswer, pRightAnswer);

    playAgainButton.textContent = 'Play Again';
    playAgainButton.setAttribute('id', 'restart-game');

    modal.setAttribute('id', 'modal');
    modal.append(h2, counterContainer, playAgainButton);
    
    modalBackground.setAttribute('id', 'modal-background')
    modalBackground.append(modal);

    body.prepend(modalBackground);
}

function addWrongOrRight(question, status){
    const lookingForQuestion = questions.find( quest => quest.question === question);
    lookingForQuestion.answered = true;
    
    if(status) {
        const rightAnswer = document.querySelector('.right-answers span');
        rightAnswer.innerText = `${Number(rightAnswer.innerText) + 1}`;
    }

    if(!status) {
        const wrongAnswer = document.querySelector('.wrong-answers span');
        wrongAnswer.innerText = `${Number(wrongAnswer.innerText) + 1}`;
    }
}

function shuffleTheAnswers(answers){
    if(answers === undefined){
        return [];
    }

    const tempArr = [...answers];
    const shuffledAnswers = answers.reduce((newArr, unUsed) => {
        newArr.push( tempArr.splice(getRandomNr(tempArr),1)[0]);
        return newArr;
    }, []);
    return shuffledAnswers;
}

function pickOneQuestion() {
    const unansweredQuestions = getUnansweredQuestions();
    const pickedQuestion = unansweredQuestions[getRandomNr(unansweredQuestions)];
    return pickedQuestion;
}

function getRandomNr(arr){
    return Math.floor(Math.random() * arr.length);
}

function getCountOfCurrentProgress(){
    return (questions.length - getUnansweredQuestions().length) + 1;
}

function getUnansweredQuestions(){
    const unansweredQuestions = questions
        .filter(quest => !quest.answered);
    return unansweredQuestions;
}
