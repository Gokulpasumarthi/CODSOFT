const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.dataset.number;
        const operation = button.dataset.operation;

        if (number) {
            handleNumber(number);
        } else if (operation) {
            handleOperation(operation);
        } else if (button.id === 'clear') {
            handleClear();
        } else if (button.id === 'backspace') {
            handleBackspace();
        } else if (button.id === 'equals') {
            handleEquals();
        }

        updateDisplay();
    });
});

function handleNumber(number) {
    if (currentInput.length < 15) {
        currentInput += number;
    }
}

function handleOperation(operation) {
    if (currentInput === '' && previousInput === '') {
        return;
    }

    if (currentInput !== '') {
        if (previousInput !== '') {
            previousInput = calculate(previousInput, currentInput, operator);
        } else {
            previousInput = currentInput;
        }
        currentInput = '';
    }

    operator = operation;
}

function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = '';
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
}

function handleEquals() {
    if (currentInput !== '' && previousInput !== '' && operator !== '') {
        currentInput = calculate(previousInput, currentInput, operator);
        previousInput = '';
        operator = '';
    }
}

function updateDisplay() {
    display.textContent = currentInput || previousInput || '0';
}

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (operator === '+') return (a + b).toString();
    if (operator === '-') return (a - b).toString();
    if (operator === '*') return (a * b).toString();
    if (operator === '/') return (a / b).toString();

    return '';
}