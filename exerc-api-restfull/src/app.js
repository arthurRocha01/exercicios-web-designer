import express from 'express';
import { materialRoutes } from './routes/materialRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/materials', materialRoutes);

module.exports = app;