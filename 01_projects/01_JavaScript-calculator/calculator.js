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
          return
    }
    this.current = computation
    this.operation = undefined
    this.previous = ''
  }

  updateDisplayField() {
    this.currentTextElement.innerText = this.current
    if(this.operation != null) {
      this.previousTextElement.innerText = this.previous
    }
  }
}

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

const calculator = new Calculator(previousTextElement, currentTextElement)
