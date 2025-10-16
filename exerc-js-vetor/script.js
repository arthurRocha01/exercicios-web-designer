// Aplicação 01
let products = ["produto1", "produto2", "produto3", "produto4", "produto5",
    "produto6", "produto7", "produto8", "produto9", "produto10"
];

function productRegistration() {
    let input = document.getElementById("produto").value;
    let output = document.getElementById("saidaProduto");

    if (!products.includes(input)) {
        products.push(input)
        output.innerHTML = "Produto cadastrado"
    }
    else output.innerHTML = "Produto já cadastrado! Tente novamente.";
}

// Aplicação 02

const produtos = [
  { nome: "Mouse", quantidade: 12 },
  { nome: "Teclado", quantidade: 3 },
  { nome: "Monitor", quantidade: 7 },
  { nome: "Notebook", quantidade: 2 },
  { nome: "Cabo HDMI", quantidade: 8 },
  { nome: "Webcam", quantidade: 1 },
  { nome: "Impressora", quantidade: 6 },
  { nome: "Pen Drive", quantidade: 0 },
  { nome: "Headset", quantidade: 4 },
  { nome: "Fonte", quantidade: 9 }
];

function stockAnalysis() {

}