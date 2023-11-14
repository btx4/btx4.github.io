const newBtn = document.querySelector("#js-new-quote");
const answerBtn = document.querySelector("#js-tweet");

const question = document.querySelector("#js-quote-text");
const answer = document.querySelector("#js-answer-text");
let answertxt = "";
newBtn.addEventListener("click",getQuote);
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

answerBtn.addEventListener("click",displayAnswer);

async function getQuote(){
    try {
        const response= await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        let questiontxt = json['question'];
        answertxt =json['answer'];
        displayQuote(questiontxt);
    }
    catch(err) {
        console.log(err);
        alert("Failed to fetch new quote.");

    }
}

function displayQuote(qTxt){
    question.textContent = qTxt;
    answer.textContent = "";
}

function displayAnswer(){
    console.log("TEST");
    answer.textContent = answertxt;
}

getQuote();