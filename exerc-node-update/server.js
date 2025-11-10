import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;''
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})