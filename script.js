
// Set-up the calculator for initial process

// global variables
let num1 = null;
let operator = null;
let num2 = null;

const buttons = document.getElementsByClassName('button');
const inputBox = document.getElementById('screen');


// reset calculator
function reset() {

    inputBox.value = 0;
    num1 = null;
    operator = null;
    num2 = null;

}

// CE (clear entry) button is clicked: clear inputBox only
function ceButton() {
    inputBox.value = 0;
}

// C (clear all input): reset all variables/states
function cButton() {
    reset();
}

// decimal point button clicked
function decimalPointClicked() {

    (inputBox.value.includes('.')) ? (0) : (inputBox.value = String(inputBox.value + '.'));
}

// positive/negative button clicked
function inverseSignClicked() {

    (inputBox.value.includes('-')) ? (inputBox.value = inputBox.value.slice(1)) : (inputBox.value = String('-' + inputBox.value));
    
}

// backspace button clicked
function backSpaceClicked() {

    // if inputBox has a positive or negative single-digit number
    if((inputBox.value.length === 1) || ((inputBox.value.length === 2) && (inputBox.value.includes('-')))) {
        inputBox.value = '0';
    }
    // any other value
    else {
        inputBox.value = inputBox.value.slice(0, inputBox.value.length-1);
    }
}



// calculate answer
function calculate() {

    let answer = null;

    // operator determines path
    switch (operator) {
        // addition
        case '+':
            answer = num1 + num2;
            break;
        // subtraction
        case '-':
            answer = num1 - num2;
            break;
        // multiplication
        case 'x':
            answer = num1 * num2;
            break;
        // division
        case '÷':
            answer = num1 / num2;
            break;
        default:
            console.log('Error: Unable to perform calculation.')
    }

    inputBox.value = answer;
    num1 = null;
    operator = null;
    num2 = null;

}

// add number to inputBox (helper function) 
function addNumberToScreen(buttonIndex) {

    // if only number in inputBox is 0, and button clicked was 0, ignore clickEvent
    if((inputBox.value === '0') && (buttons[buttonIndex].textContent === '0')) {

        console.log('Error: Only value in inputBox is 0');
        return;

    }
    // if only number in inputBox is 0, and button clicked was a digit, replace zero with the digit
    else if((inputBox.value === '0') && (Number(buttons[buttonIndex].textContent))) {

        inputBox.value = buttons[buttonIndex].textContent;

    }
    // if button clicked was a digit and there is already another number in the inputBox, concatenate the numbers
    else if((inputBox.value !== '0') && (typeof Number(buttons[buttonIndex].textContent) === 'number')) {

        inputBox.value += buttons[buttonIndex].textContent;
    }
}

// operator button clicked
function operatorClicked(buttonIndex) {
    
    // if num1 is empty, set num1 equal to inputBox current value, set operator equal to button value that was clicked
    if(num1 === null) {

        num1 = Number(inputBox.value);
        console.log(`Num1: ${num1}`);
        operator = buttons[buttonIndex].textContent;
        console.log(`Operator: ${operator}`);

        inputBox.value = '0';
        return;

    }
    // if num1 and operator already have a value
    else if(operator !== null) {

        console.log('Error: operator has already been chosen.');
    }
}

// equal button clicked
function equalClicked(buttonIndex) {

    // if num1 or operator is null/empty, ignore click event
    if((num1 === null) || (operator === null)) {

        return;

    }
    // if num1 and operator have been given values
    else {
        num2 = Number(inputBox.value);
        console.log(`Num2: ${num2}`)
        
        // call function to solve equation
        calculate();
    }

}

// eventHandler for click events
function handleButtonClick(buttonIndex) {

    // the state of 'num1', 'operator', and 'num2' will determine what we do

    // CE button
    if(buttons[buttonIndex].textContent === 'CE') {

        ceButton();
        return;
    }
    // C button
    else if(buttons[buttonIndex].textContent === 'C') {

        cButton();
        return;
    }
    // if decimal point button was clicked
    else if(buttons[buttonIndex].textContent === '.') {

        decimalPointClicked();
        return;

    }
    // if the '+/-' button was clicked
    else if(buttons[buttonIndex].textContent === '+/-') {

        inverseSignClicked();
        return;
    }
    // if backspace button was clicked 
    else if(buttons[buttonIndex].textContent === '←') {

        backSpaceClicked();
        return;

    }
    // if the equal '=' button was clicked
    else if (buttons[buttonIndex].textContent === '=') {

        equalClicked(buttonIndex);
        return;

    }
    // if an operator button was clicked
    else if((buttons[buttonIndex].textContent === '+') || (buttons[buttonIndex].textContent === '-') || (buttons[buttonIndex].textContent === 'x') || (buttons[buttonIndex].textContent === '÷')) {

        operatorClicked(buttonIndex);
        return;

    }
    // if we don't have a 1st number
    else if(num1 === null) {

        addNumberToScreen(buttonIndex);
        return;

    }
    // if we have num1, and an operator (we need num2)
    else if((num1 !== null) && (operator !== null)) {

        addNumberToScreen(buttonIndex);
        return;
    }



}


// add eventListeners + eventHandlers to buttons for click event
for(let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener('click', () => { handleButtonClick(i)});
}
