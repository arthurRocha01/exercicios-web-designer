const express = require('express');
const path = require('path');

const app = express();
const PORT = 5001;
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contato.html'));
})

const cursos = [
  { id: 1, area: "Tecnologia", titulo: "Node.js com Express", descricao: "Curso de back-end com foco em Node e Express.", nivel: "Intermediário" },
  { id: 2, area: "Desenvolvimento Pessoal", titulo: "A Ciência do Bem-Estar", descricao: "Explora a psicologia da felicidade baseada na ciência.", nivel: "Iniciante" },
  { id: 3, area: "Marketing", titulo: "Estratégia de SEO", descricao: "Técnicas para otimizar conteúdo para buscadores.", nivel: "Intermediário" },
];

app.get('/cursos:id', (req, res) => {
    const cursoId = parseInt(req.params.id);
    const curso = curso.find(c => c.id === id);

    if (curso) {
        res.json(cursos);
    } else {
        res.status(404).json({ error: 'Curso não encontrado' });
    }
});

app.use((req, res) => {
    res.status(404).send(
        `
            <h1>404 - Página não encontrada</h1>
            <a href="/">Voltar</a>
        `
    );
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://locahost:${PORT}`);
});