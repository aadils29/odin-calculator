let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0"; // default value on calc screen
let shouldResetDisplay = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "Error";
      }
      return divide(a, b);
    default:
      return "Error";
  }
}

// event listeners for digits + decimal
function updateDisplay() {
  const displayElement = document.querySelector(".display");
  displayElement.textContent = displayValue;
}

function inputDigit(digit) {
  if (shouldResetDisplay) {
    displayValue = digit;
    shouldResetDisplay = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    displayValue = "0.";
    shouldResetDisplay = false;
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

document.querySelectorAll(".digit").forEach((button) => {
  if (!button.classList.contains("decimal")) {
    button.addEventListener("click", () => {
      inputDigit(button.getAttribute("data-digit"));
    });
  }
});

document.querySelector(".decimal").addEventListener("click", inputDecimal);

updateDisplay();

// event listeners for operators + equal sign + toggleSign + clear
function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (firstNumber !== null && operator !== null) {
    const result = operate(operator, firstNumber, inputValue);
    displayValue = String(result);
    firstNumber = result;
  } else {
    firstNumber = inputValue;
  }

  shouldResetDisplay = true;
  operator = nextOperator;
  updateDisplay();
}

function handleEquals() {
  if (firstNumber === null || operator === null) return;

  const inputValue = parseFloat(displayValue);
  let result = operate(operator, firstNumber, inputValue);

  displayValue = String(result);
  updateDisplay();

  firstNumber = null;
  operator = null;
  shouldResetDisplay = true;
}

function clear() {
  displayValue = "0";
  firstNumber = null;
  operator = null;
  shouldResetDisplay = false;

  updateDisplay();
}
