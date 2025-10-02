const display = document.querySelector('#display')
const numberInput = document.querySelector('#numberInput')

const btnAdd = document.querySelector('#btn-add')
const btnRemove = document.querySelector('#btn-remove')
const btnCalculate = document.querySelector('#btn-calculate')

let medias = []

function addMedia() {
    const value = parseFloat(numberInput.value)
    if (!isNaN(value)) {
        medias.push(value)
        numberInput.value = ''
        display.textContent = `Adcionado: ${value}`
    } else alert('Insira um valor válido!')
}

function removeMedia() {
    const lastAverage = medias[medias.length - 1]
    medias.pop()
    display.textContent = `Removido: ${lastAverage}`
}

function calculateMedia() {
    if (medias.length === 0) {
        display.textContent = 'Média: 0'
        return;
    }

    const sum = medias.reduce((accumulator, current) => accumulator + current, 0)
    const average = sum / medias.length
    display.textContent = `Média: ${average.toFixed(2)}`
    medias = []
}