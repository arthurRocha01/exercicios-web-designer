import * as taskModel from '../models/taskModel.js';

/**
 * Controller para obter todas as tasks.
 * Chama a função do model que busca todas as tarefas no banco de dados.
 */
export const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.findAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Erro ao buscar tasks: ${error}` });
    }
};

/**
 * Controller para criar uma nova task.
 * Recebe os dados da requisição e delega a criação para o model.
 */
export const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        await taskModel.createTask(taskData);
        res.status(201).json({ message: 'Task criada com sucesso' });
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ message: 'Erro ao criar tarefa.' });
    }
};

/**
 * Controller para atualizar uma task existente.
 * Recebe o ID da task via parâmetros e os dados atualizados via body.
 */
export const updateTask = async (req, res) => {
    try {
        const task = await taskModel.updateTask(req.params.id, req.body);
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar task' });
    }
};

/**
 * Controller para deletar uma task pelo ID.
 * Chama o model para remover a task e retorna confirmação.
 */
export const deleteTask = async (req, res) => {
    try {
        await taskModel.deleteTask(req.params.id);
        res.json({ message: 'Task removida com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Erro ao remover task: ${error}` });
    }
};
