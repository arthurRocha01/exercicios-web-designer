// Exercício 1
function showMessage() {
    const input = document.getElementById('showMessage-input')
    const messageField = document.getElementById('showMessage-fieldDisplay')

    messageField.textContent = input.value
}

// Exercício 2
function sum() {
    const resultField = document.getElementById('sum-fieldDisplay')

    const number1 = Number(document.getElementById('sum-number1').value)
    const number2 = Number(document.getElementById('sum-number2').value)
    const sum = number1 + number2;
    resultField.innerHTML = sum.toString()
}

// Exercício 3
function changeColor(element) {
    const field = document.getElementById('changeColor-text')

    const color = element.id
    field.style.color = color.toLowerCase()
}

// Exercício 4
function addList() {
    const input = document.getElementById('addList-input')
    const listField = document.getElementById('addList-fieldDisplay')

    const textInput = input.value
    const newItem = document.createElement('li')
    newItem.textContent = textInput
    listField.append(newItem)
}

// Exercício 5
function parityNumber() {
    const input = document.getElementById('parity-numbers-input')
    const displayField = document.getElementById('parity-numbers-field')

    const number = input.value
    if (number % 2 === 0) displayField.textContent = "O número é PAR"
    else displayField.textContent = "O número é IMPAR"
}
