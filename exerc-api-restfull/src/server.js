import express from "express";
import cors from "cors";
import path from "path";
import app from './app.js';
import { fileURLToPath } from "url";
import materialRoutes from "./routes/materialRoutes.js";

// Configuração de paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../public")));

// Rotas
app.use("/api/materiais", materialRoutes);

// Páginas estáticas
const pages = ["index", "dashboard", "cadastrar"];
pages.forEach(page => {
  app.get(`/${page === "index" ? "" : page}`, (req, res) =>
    res.sendFile(path.resolve(__dirname, `../public/${page}.html`))
  );
});

// Inicializa o servidor
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
