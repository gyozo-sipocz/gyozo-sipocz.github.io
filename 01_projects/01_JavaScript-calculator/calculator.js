const numberButtons = document.querySelectorAll('.js-number')
const operationButtons = document.querySelectorAll('.js-operation')
const equalsButton = document.querySelector('.js-equal')
const deleteButton = document.querySelector('.js-del')
const allClearButton = document.querySelector('.js-ac')
const previousTextElement = document.querySelector('.js-previous')
const currentTextElement = document.querySelector('.js-current')

class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement
    this.currentTextElement = currentTextElement
    this.clear()
  }

  clear() {
    this.current = ''
    this.previous = ''
    this.operation = undefined
  }

  delete() {
    this.current = this.current.toString().slice(0, -1)
  }

  appendNumber(number) {
    if(number === '.' && this.current.includes('.')) return
    this.current = this.current.toString() + number.toString()
  }

  selectOperation(operation) {
    if(this.current === '') return
    if(this.previous !== '') {
      this.compute()
    }
    this.operation = operation
    this.previous = this.current
    this.current = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previous)
    const curr = parseFloat(this.current)

    if(isNaN(prev) || isNaN(curr)) return

    switch (this.operation) {
      case '+':
          computation = prev + curr
          break
      case '-':
          computation = prev - curr
          break
      case '*':
          computation = prev * curr
          break
      case '÷':
          computation = prev / curr
          break
      default:
          return;
    }
    this.current = computation.toString()
    this.operation = undefined
    this.previous = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplayField() {
    if (this.current === NaN) {
      this.currentTextElement.innerText = 'Cannot divide by zero'
    } else {
      this.currentTextElement.innerText = this.getDisplayNumber(this.current)
    }

    if (this.operation != null) {
      this.previousTextElement.innerText = 
      `${this.getDisplayNumber(this.previous)} ${this.operation}`
    } else {
      this.previousTextElement.innerText = ''
    }
  }
}

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplayField()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperation(button.innerText)
    calculator.updateDisplayField()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplayField()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplayField()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplayField()
})

document.addEventListener('keydown', (event) => {
  const key = event.key;

  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      calculator.appendNumber(key);
      calculator.updateDisplayField();
      break;
    case '.':
      calculator.appendNumber(key);
      calculator.updateDisplayField();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      calculator.selectOperation(key);
      calculator.updateDisplayField();
      break;
    case 'Enter':
      calculator.compute();
      calculator.updateDisplayField();
      break;
    case 'Backspace':
      calculator.delete();
      calculator.updateDisplayField();
      break;
    case 'Escape':
      calculator.clear();
      calculator.updateDisplayField();
      break;
  }
});

function handleNumberInput(number) {
  calculator.appendNumber(number);
  calculator.updateDisplayField();
}

function handleOperationInput(operation) {
  calculator.selectOperation(operation);
  calculator.updateDisplayField();
}

function handleEquals() {
  calculator.compute();
  calculator.updateDisplayField();
}

function handleDelete() {
  calculator.delete();
  calculator.updateDisplayField();
}

function handleAllClear() {
  calculator.clear();
  calculator.updateDisplayField();
}

/*numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleNumberInput(button.innerText);
  });
});*/

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleOperationInput(button.innerText);
  });
});

equalsButton.addEventListener('click', () => {
  handleEquals();
});

deleteButton.addEventListener('click', () => {
  handleDelete();
});

allClearButton.addEventListener('click', () => {
  handleAllClear();
});

