let lastOperator = '';
let decimalUsed = false;
let firstNumberEntered = false;
let firstNumber = '';
let displayValue = '';

function appendToDisplay(value) {
  const display = document.getElementById('display');
  displayValue = display.value;

  if (isNaN(value)) {
    if (!firstNumberEntered && displayValue === '') {
      if (value === '-') {
        display.value += value;
        firstNumberEntered = true;
      }
    } else if (!isNaN(displayValue[displayValue.length - 1]) || value === '.') {
      lastOperator = value;
      decimalUsed = false;
      display.value += value;
    }
  } else if (value === '.') {
    if (!decimalUsed) {
      display.value += value;
      decimalUsed = true;
    }
  } else if (value === '^') {
    if (firstNumber) {
      lastOperator = value;
      decimalUsed = false;
      display.value += value;
    }
  } else if (value === '=') {
    if (lastOperator === '^' && firstNumber) {
      const parts = displayValue.split('^');
      if (parts.length === 2) {
        const base = parseFloat(parts[0]);
        const exponent = parseFloat(parts[1]);
        const result = Math.pow(base, exponent);
        display.value = result;
        firstNumber = result.toString();
        firstNumberEntered = true;
        lastOperator = '';
        decimalUsed = false;
      }
    } else if (lastOperator) {
      calculate();
      lastOperator = value;
      decimalUsed = false;
    }
  } else {
    display.value += value;
    if (lastOperator === '^') {
      firstNumberEntered = true;
    }
  }
}

function calculate() {
  const displayValue = document.getElementById('display').value;

  try {
    let expression = displayValue.replace(/\^/g, '**');

    if (expression.includes('/0')) {
      document.getElementById('display').value = 'Dalyba iš nulio negalima';
      return;
    }

    const result = eval(expression);
    document.getElementById('display').value = result;
    lastOperator = '';
    decimalUsed = false;
  } catch (error) {
    document.getElementById('display').value = 'Error';
    lastOperator = '';
    decimalUsed = false;
  }
}




function clearDisplay() {
  const display = document.getElementById('display');
  display.value = '';
  lastOperator = '';
  decimalUsed = false;
  firstNumberEntered = false;
}


function squareRoot() {
  const displayValue = document.getElementById('display').value;
  const value = parseFloat(displayValue);

  if (!isNaN(value)) {
    if (value < 0) {
      document.getElementById('display').value = 'Šaknies traukti negalima';
    } else {
      document.getElementById('display').value = Math.sqrt(value);
    }
    lastOperator = '';
    decimalUsed = false;
  }
}

function percent() {
  const displayValue = document.getElementById('display').value;
  const value = parseFloat(displayValue);

  if (!isNaN(value)) {
    document.getElementById('display').value = value / 100;
    lastOperator = '';
    decimalUsed = false;
  }
}

function square() {
  const displayValue = document.getElementById('display').value;
  const value = parseFloat(displayValue);

  if (!isNaN(value)) {
    document.getElementById('display').value = value * value;
    lastOperator = '';
    decimalUsed = false;
  }
}

function power() {
  const display = document.getElementById('display');
  const currentValue = display.value;

  if (!lastOperator && currentValue) {
    display.value += '^';
    lastOperator = '^';
  }
}


function backspace() {
  const display = document.getElementById('display');
  const currentValue = display.value;

  display.value = currentValue.slice(0, -1);
}
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else if (n < 0) {
    return "Netinkama įvestis";
  } else {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}
function calculateFactorial() {
  const display = document.getElementById('display');
  const displayValue = parseFloat(display.value);

  if (!isNaN(displayValue)) {
    if (displayValue >= 0 && Number.isInteger(displayValue)) {
      const result = factorial(displayValue);
      display.value = result;
    } else {
      display.value = "Netinkama įvestis";
    }
  } else {
    display.value = "Netinkama įvestis";
  }
}
function toggleSign() {
  const display = document.getElementById('display');
  const displayValue = display.value;

  if (displayValue === 'Netinkama įvestis') {
    return;
  }

  if (displayValue === '') {
    display.value = '-';
  } else if (displayValue === '-') {
    display.value = '';
  } else if (displayValue.startsWith('-')) {
    display.value = displayValue.substring(1);
  } else {
    display.value = '-' + displayValue;
  }
}
