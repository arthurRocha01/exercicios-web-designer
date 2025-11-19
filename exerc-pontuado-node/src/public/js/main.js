import { setupEventListeners } from './events.js';

// Seleciona elementos do DOM
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const btnOrdenar = document.getElementById('btn-ordenar');

// Inicializa os event listeners da aplicação
setupEventListeners(taskForm, taskList, btnOrdenar);
