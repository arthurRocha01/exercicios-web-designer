
const input = document.querySelector('#number');
const output = document.querySelector('.output');

function gerarTabuada() {
    output.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const campo = document.createElement('p');
        campo.innerHTML = `${input.value} x ${i} = ${parseInt(input.value) * i}`;
        output.appendChild(campo);
    }
}