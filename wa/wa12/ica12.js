const newBtn = document.querySelector("#js-new-quote");

const question = document.querySelector("#js-quote-text");
const answer = document.querySelector("#js-answer-text");
const image = document.querySelector("#js-cocktail-img");
newBtn.addEventListener("click",getQuote);
const endpoint = "https://thecocktaildb.com/api/json/v1/1/random.php";


async function getQuote(){
    try {
        console.log("here")
        const response= await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json.drinks[0])
        let questiontxt = json.drinks[0].strDrink;
        let picURL = json.drinks[0].strDrinkThumb;
        displayImage(picURL);
        displayQuote(questiontxt);
    }
    catch(err) {
        console.log(err);
        alert("Failed to fetch new quote.");

    }
}
function displayImage(cUrl){
    image.src = cUrl;
}
function displayQuote(qTxt){
    question.textContent = qTxt;
    newBtn.textContent = "Generate a new cocktail!";
}

getQuote();