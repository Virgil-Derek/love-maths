//Wait for the DOM to finish loading before running the game
// Get Button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    runGame("addition");
    runGame("multiply");
    runGame("subtraction");
});

/**
 * The main game loop called when the script is first loaded
 * and after user's answer has been processed
 */
function runGame(gameType){
    //Creates 2 random numbers between 1 and 25
    //Math.random method is used to generate the random numbers.
    //Math.floor rounds the numbers to an integer; the whole method runs 25 times (Beware for capitalization in Math)
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if(gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)

    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}
/**
 * 
 * checks answer against first element in 
 * the returned calculatecorrectAnswer array
 */
function checkAnswer(){

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if(isCorrect) {
        alert("Hey! You got it right! :D ");
        incrementScore();
    } else {
        alert(`Awww... You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
}

   runGame(calculatedAnswer[1]);

}


/**
 * Gets the operands (numbers) and the operators (+, -, x, /)
 * directly from DOM and returns correct answer
 */
function calculateCorrectAnswer(){
    //read variale form dom and store in variable.
    //get inner text and pass it and returns it as a integer with parseInt
    //By default, when JavaScript gets data from the dom it returns it as a string so change from string to number

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        //return and array if operator is the mentioned operator
        return [operand1 + operand2, "addition"];
    } else if (operator === "x"){
        return [operand1 * operand2, "multiply"];

    } else {
        alert (`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}. Aborting!`;
    }

}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore(){
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer(){
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2){
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}


function displaySubtractQuestion(){



}

 function displayMultiplyQuestion(operand1, operand2){
     document.getElementById('operand1').textContent = operand1;
     document.getElementById('operand2').textContent = operand2;
     document.getElementById('operator').textContent = "x";

 }

