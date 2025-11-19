import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

/**
 * Rotas relacionadas a tasks.
 * Define endpoints para operações CRUD.
 */

// Obtém todas as tasks
router.get('/', taskController.getTasks);

// Cria uma nova task
router.post('/', taskController.createTask);

// Atualiza uma task existente pelo ID
router.put('/:id', taskController.updateTask);

// Remove uma task pelo ID
router.delete('/:id', taskController.deleteTask);

export default router;
