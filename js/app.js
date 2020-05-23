// ES6 class => Calculator
class Calculator {
    constructor(previousOperationElement, currentOperationElement){
        this.previousOperationElement = previousOperationElement;
        this.currentOperationElement = currentOperationElement;
        this.clearAll()
    }


    // Methods for the super class => Calculator

    clearAll() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operand = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    currentElementClear() {
        this.currentOperand = '';
    }

    appendNumber(number) {
        if(number == '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString() 

    }

    singleChooseOperation(operation){
        if(operation === '1/x'){
            this.previousOperand = `1/(${this.currentOperand})`
            this.currentOperand = 1 / (this.currentOperand)
            this.operand = operation;

            return this.previousOperand, this.currentOperand, this.operand
        } 
        if(operation === '√'){
            this.previousOperand = `√${this.currentOperand}`
            this.currentOperand = Math.sqrt(this.currentOperand)
            this.operand = operation;

            return this.previousOperand, this.currentOperand, this.operand

        } 
    }

    chooseOperatiion(operation){
        if(this.currentOperand === '') return 
            if(this.previousOperand !== '') {
                this.compute()
            }
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
            this.operand = operation
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current =  parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return 
            switch(this.operand){
                case '−':
                        computation = prev - current
                        break;
                case '+':
                        computation = prev + current
                        break;
                case '×':
                        computation = prev * current;
                        break;
                case '÷':
                        computation = prev / current;
                        break;
                case '%':
                        computation = prev % current;
                        break;
                case 'x²':
                        computation = prev ** current;
                        break;
            }  
                
            this.currentOperand = computation
            this.previousOperand = ''
            this.operand = undefined
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(intergerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }
    updateDisplay() {
        let currentUpdate = this.currentOperationElement.innerHTML;
        let previousUpdate = this.previousOperationElement.innerHTML;
        this.currentOperationElement.innerHTML = this.getDisplayNumber(this.currentOperand);
        
        if(this.operand != null) {
            this.previousOperationElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operand}`;

            
        }
        else{
            this.previousOperationElement.innerHTML = '';
        }
        

        return  currentUpdate;
    }
    singleUpdateDisplay() {
        this.currentOperationElement.innerHTML = this.currentOperand;
        this.previousOperationElement.innerHTML = this.previousOperand;
    }

}

// Catching DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const currentAllClearButton = document.querySelector('[data-current-all-clear]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperationElement = document.querySelector('[data-previous-operation');
const currentOperationElement = document.querySelector('[data-current-operation');
const historyHeader = document.querySelector('.history-header');
const historyBody = document.querySelector('.history-body');
const historyClear = document.querySelector('#trash');
const historyImg = document.querySelector('#history-img');
const mainHistory = document.querySelector('.history');
const toggleHistory = document.querySelector('#toggle');

// new calculator Object
const calculator = new Calculator(previousOperationElement, currentOperationElement)

// EventListener => Numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

// EventListener => Operations
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if((button.innerHTML == '1/x') || (button.innerHTML == '√')){
            calculator.singleChooseOperation(button.innerHTML)
            calculator.singleUpdateDisplay()
        }
        else {
            calculator.chooseOperatiion(button.innerHTML)
            calculator.updateDisplay()
        }

        
        
    })
})

// EventListener => EqualButton
equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()

    historyHeader.classList.add('hide')
    const answerOperationHistory = document.createElement('p')
    answerOperationHistory.classList.add('operation')
    answerOperationHistory.innerHTML = calculator.updateDisplay()
    historyBody.appendChild(answerOperationHistory)   
})

// EventListener => DeleteButton
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

// EventListener => Clear Current Element
currentAllClearButton.addEventListener('click', () => {
    calculator.currentElementClear()
    calculator.updateDisplay()
})

// EventListener => All Clear Element
allClearButton.addEventListener('click', () => {
calculator.clearAll()
calculator.updateDisplay()
})

// EventListener => History Clear
historyClear.addEventListener('click', () => {
    historyBody.innerHTML = ''
})

// EventListener => toggle history menu
historyImg.addEventListener('click', () => {
    mainHistory.style.cssText = 'right: 0px'
})
toggleHistory.addEventListener('click', () => {
    mainHistory.style.cssText = 'right: -300px'
})