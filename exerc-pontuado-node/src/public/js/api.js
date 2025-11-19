// URL base da API de tasks
const API_BASE_URL = 'http://localhost:5010/tasks';

/**
 * Busca todas as tasks da API.
 * @returns {Promise<Array>} Lista de tasks ou array vazio em caso de erro.
 */
export const fetchTasks = async () => {
    try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err);
        alert('Não foi possível conectar à API. Verifique o servidor.');
        return [];
    }
};

/**
 * Adiciona uma nova task via API.
 * @param {Object} task - Objeto com título e data de vencimento.
 */
export const addTask = async ({ title, due_date }) => {
    try {
        const res = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, due_date }),
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Falha ao adicionar tarefa.');
        }
        
        return await res.json();
    } catch (err) {
        console.error(err);
        alert(`Erro ao adicionar tarefa: ${err.message}`);
    }
};

/**
 * Atualiza o status de uma task (concluída ou pendente) via API.
 * @param {number} taskId - ID da task.
 * @param {boolean} completed - Indica se a task está concluída.
 */
export const updateTaskStatus = async (taskId, completed) => {
    try {
        const status = completed ? 'concluida' : 'pendente';
        const res = await fetch(`${API_BASE_URL}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error('Falha ao atualizar status da tarefa.');
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

/**
 * Remove uma task via API após confirmação do usuário.
 * @param {number} taskId - ID da task a ser removida.
 */
export const deleteTask = async (taskId) => {
    if (!confirm('Deseja realmente excluir esta tarefa?')) return;
    try {
        const res = await fetch(`${API_BASE_URL}/${taskId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Falha ao excluir tarefa.');
    } catch (err) {
        console.error(err);
        alert('Erro ao excluir tarefa.');
    }
};
