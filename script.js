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
  let result;

  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      // Handle division by zero
      if (b === 0) {
        return "Error: Cannot divide by zero!";
      }
      result = divide(a, b);
      break;
    default:
      return "Error";
  }

  return roundResult(result);
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

function toggleSign() {
  displayValue = String(parseFloat(displayValue) * -1);
  updateDisplay();
}

function roundResult(number) {
  if (typeof number !== "number") return number;

  return Math.round(number * 100000000) / 100000000;
}

// Add event listeners for special buttons
document.querySelector(".clear").addEventListener("click", clear);
document.querySelector(".sign").addEventListener("click", toggleSign);
document.querySelector(".equals").addEventListener("click", handleEquals);

// Percent button: convert current display value to percent
document.querySelector(".percent").addEventListener("click", () => {
  displayValue = String(parseFloat(displayValue) / 100);
  updateDisplay();
});

// Add event listeners for operator buttons
document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    handleOperator(button.getAttribute("data-op"));
  });
});
