let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0"; // default value on calc screen
let shouldRestDisplay = false;

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

// event listeners
function updateDisplay() {
  const displayElement = document.querySelector(".display");
  displayElement.textContent = displayValue;
}

function inputDigit(digit) {
  if (shouldRestDisplay) {
    displayValue = digit;
    shouldRestDisplay = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (shouldRestDisplay) {
    displayValue = "0.";
    shouldRestDisplay = false;
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
