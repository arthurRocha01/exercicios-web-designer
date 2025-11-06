const express = require('express');
const cors = require('cors');
const path = require('path');
const materialController = require('./controllers/meterial.controller');
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/materiais', materialController.listMaterials);
app.post('/api/materiais', materialController.registerMaterial);
app.put('/api/materiais/:id', materialController.updateMaterial);
app.delete('/api/materiais/:id', materialController.deleteMaterial);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.get('/cadastrar', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cadastrar.html'));
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
