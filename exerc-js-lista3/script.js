
// E1
const inputTabuada = document.querySelector('#tabuada');
const output1 = document.querySelector('#output-tabuada');

function tabuada() {
    output1.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const campo = document.createElement('p');
        campo.innerHTML = `${inputTabuada.value} x ${i} = ${parseInt(inputTabuada.value) * i}`;
        output1.appendChild(campo);
    }
}

// E2
const output2 = document.querySelector('#output-pares');

function somar() {
    let soma = 2;
    for (let i = 2; i < 100; i+=2) {
        output2.innerHTML += `${i}, `;
        soma += i;
    }
    output2.innerHTML += `<br><br>Soma: ${soma}`;
}

// E3
const output3 = document.querySelector('#output-primos');

function primos() {
    for (let i = 1; i <= 100; i++) {
        (i / i == 1) && (i / 1 == i) ? output3.innerHTML += `${i}, ` : null;
    }
}

// E4
function fibonacci() {
    let a = 0;
    let b = 1;
    let output = '';

    for (let i = 0; i < 15; i++) {
        output += `${a}, `
        let temp = a + b;
        a = b;
        b = temp;
    }

    document.getElementById("output-fibonacci").innerHTML = output;
}

// E5
function regressiva() {
    const num = document.getElementById('regressiva').value;
    let output = '';

    for(let i = parseInt(num); i >= 0; i--) {
        output += `${i}, `;
    }

    document.getElementById('output-regressiva').innerHTML = output;
}

// E6
function multiplos() {
    let output = '';
    for (let i = 1; i <= 50; i++) {
        (i % 3 == 0) || (i % 5 == 0) ? output += `${i}, ` : null;
    }

    document.getElementById('output-multiplos').innerHTML = output;
}

// E7
function fatorial() {
    // const num = parseInt(document.getElementById('fatorial').value);
    // let soma = 0;

    // for (let i = parseInt(num); i > 0; i--) {
    //     soma *= i * i -1;
    // }

    // document.getElementById('output-fatorial').innerHTML = soma;
}