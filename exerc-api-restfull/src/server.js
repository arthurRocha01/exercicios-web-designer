import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import * as materialController from "./controllers/materialControllers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/api/materiais", materialController.listMaterials);
app.post("/api/materiais", materialController.registerMaterial);
app.put("/api/materiais/:id", materialController.updateMaterial);
app.delete("/api/materiais/:id", materialController.deleteMaterial);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/dashboard.html"));
});

app.get("/cadastrar", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/cadastrar.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});