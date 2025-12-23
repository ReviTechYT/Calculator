const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calc-button");

let displayValue = "";    // what user sees
let currentValue = "";    // current number
let previousValue = null; // previous number
let operator = null;

function updateDisplay() {
    display.textContent = displayValue || "0";
}

function clearAll() {
    displayValue = "";
    currentValue = "";
    previousValue = null;
    operator = null;
}

function backspace() {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        currentValue = currentValue.slice(0, -1);
    }
}

function inputNumber(number) {
    currentValue += number;
    displayValue += number;
}

function setOperator(op) {
    if (currentValue === "") return;

    if (previousValue !== null && operator !== null) {
        calculate();
    }

    previousValue = currentValue;
    operator = op;
    displayValue += ` ${op} `;
    currentValue = "";
}

function calculate() {
    if (previousValue === null || operator === null || currentValue === "") return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "−":
            result = prev - current;
            break;
        case "×":
            result = prev * current;
            break;
        case "÷":
            if (current === 0) {
                alert("Cannot divide by zero");
                clearAll();
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
    }

    displayValue = result.toString(); // show only the result
    currentValue = result.toString();
    previousValue = null;
    operator = null;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (!isNaN(value)) {
            inputNumber(value);
        } else if (value === "C") {
            clearAll();
        } else if (value === "←") {
            backspace();
        } else if (value === "=") {
            calculate();
        } else {
            setOperator(value);
        }

        updateDisplay();
    });
});

updateDisplay();