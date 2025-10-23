const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));

const PORT = 50001;
app.listen(PORT, () => {
    console.log(`Página rodando em http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/contatos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contatos.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

app.get('/servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'pulic', 'servicos.html'));
});
