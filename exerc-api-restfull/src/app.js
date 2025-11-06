const express = require('express');
const materialRoutes = require('./routes/material.routes');

const app = express();

app.use(express.json());
app.use('/api/materials', materialRoutes);

module.exports = app;