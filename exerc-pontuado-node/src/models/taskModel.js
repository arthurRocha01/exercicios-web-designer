import db from '../config/db.js';

/**
 * Busca todas as tasks no banco de dados.
 * @returns {Promise<Array>} Lista de tasks.
 */
export const findAllTasks = async () => {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
};

/**
 * Busca uma task pelo ID.
 * @param {number} id - ID da task a ser buscada.
 * @returns {Promise<Object|null>} Task encontrada ou null se não existir.
 */
export const findTaskById = async (id) => {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows || null;
};

/**
 * Cria uma nova task no banco de dados.
 * @param {Object} data - Dados da task (title, due_date).
 */
export const createTask = async (data) => {
    const { title, due_date } = data;
    await db.query('INSERT INTO tasks (title, due_date) VALUES (?, ?)', [title, due_date]);
};

/**
 * Atualiza o status de uma task existente.
 * @param {number} id - ID da task a ser atualizada.
 * @param {Object} data - Dados a serem atualizados (status).
 * @returns {Promise<Object|null>} Task atualizada.
 */
export const updateTask = async (id, data) => {
    const { status } = data;
    await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
    return findTaskById(id);
};

/**
 * Remove uma task do banco de dados pelo ID.
 * @param {number} id - ID da task a ser removida.
 */
export const deleteTask = async (id) => {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
};
