function calculateIMC() {
    const weightInput = document.querySelector('#weightInput')
    const heightInput = document.querySelector('#heightInput')
    const resultField = document.querySelector('#resultField')

    let weight = parseFloat(weightInput.value)
    let height = parseFloat(heightInput.value)

    let valuesIsEmpty = weight == '' || height === ''
    let valueIsUndefined = weight === undefined || height === undefined
    let valuesIsNegative = weight < 0 || height < 0

    if (valuesIsEmpty || valueIsUndefined || valuesIsNegative) {
        resultField.textContent = "Por favor, insira valores válidos!"
    }
    
    const imc = weight / (height * height)
    const classification = getClassification(imc)
    resultField.textContent = `IMC: ${imc.toFixed(2)} ${classification}`
}

function getClassification(imc) {
    if (imc < 18.5) return "Abaixo do peso"
    if (imc <= 24.9) return "Peso normal"
    if (imc <= 29.9) return "Sobrepeso"
    if (imc <= 34.9) return "Obesidade grau 1"
    if (imc <= 39.9) return "Obesidade grau 2"
    return "Obesidade grau 3"
}