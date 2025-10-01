// Exercício 1
function showMessage() {
    const messageField = document.getElementsByClassName('message-field')[0]
    const input = document.getElementById('input').value
    console.log(input)
    messageField.innerHTML = input
}

// Exercício 2
function sum() {
    const number1 = Number(document.getElementById('number1').value)
    const number2 = Number(document.getElementById('number2').value)
    const sum = number1 + number2;

    const resultField = document.getElementById('result-field')
    resultField.innerHTML = sum.toString()
}

// Exercício 3
function changeColor(element) {
    const field = document.getElementById('text-change-color')

    const color = element.id
    console.log(color)
    field.style.color = color.toLowerCase()
}