import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import taskRoutes from './src/routes/taksRoutes.js'; // Rotas das tasks

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Configurações para obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT; // Porta do servidor
const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outras origens
app.use(express.json()); // Permite receber requisições com body em JSON
app.use(express.static(path.join(__dirname, 'src', 'public'))); // Servir arquivos estáticos

// Rotas da aplicação
app.use('/tasks', taskRoutes);

// Rota principal da aplicação
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
