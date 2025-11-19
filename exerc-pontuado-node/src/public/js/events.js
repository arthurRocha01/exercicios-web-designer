import { addTask, updateTaskStatus, deleteTask, fetchTasks } from './api.js';
import { renderTasks } from './render.js';

/**
 * Configura os event listeners da aplicação.
 * Responsável por:
 * - Submissão do formulário para adicionar tarefas.
 * - Clique em tarefas para atualizar status ou excluir.
 * - Ordenação das tarefas por data.
 * - Carregamento inicial das tasks ao carregar a página.
 * 
 * @param {HTMLFormElement} taskForm - Formulário de criação de tarefas.
 * @param {HTMLElement} taskList - Container onde as tasks serão renderizadas.
 * @param {HTMLButtonElement} btnOrdenar - Botão que alterna a ordem das tasks.
 */
export const setupEventListeners = (taskForm, taskList, btnOrdenar) => {
    let isAscending = true; // Define ordem inicial de exibição das tarefas

    // Função para buscar e renderizar tasks
    const loadAndRenderTasks = async () => {
        const tasks = await fetchTasks();
        renderTasks(taskList, tasks, isAscending);
    };

    // Submissão do formulário: cria nova task
    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('nome-tarefa').value.trim();
        const due_date = document.getElementById('data-prevista').value;
        if (title && due_date) {
            addTask({ title, due_date }).then(loadAndRenderTasks);
            taskForm.reset();
        }
    });

    // Interações dentro da lista de tasks
    taskList.addEventListener('click', e => {
        const taskId = e.target.closest('.task-item')?.dataset.taskId;
        if (!taskId) return;

        if (e.target.classList.contains('task-checkbox')) {
            updateTaskStatus(taskId, e.target.checked).then(loadAndRenderTasks);
        } else if (e.target.classList.contains('btn-concluir')) {
            updateTaskStatus(taskId, true).then(loadAndRenderTasks);
        } else if (e.target.classList.contains('btn-excluir')) {
            deleteTask(taskId).then(loadAndRenderTasks);
        }
    });

    // Botão de ordenação: alterna entre crescente e decrescente
    btnOrdenar.addEventListener('click', () => {
        isAscending = !isAscending;
        btnOrdenar.textContent = isAscending
            ? '📅 Ordenar por Data (Crescente)'
            : '📅 Ordenar por Data (Decrescente)';
        loadAndRenderTasks();
    });

    // Carrega tasks ao iniciar a página
    document.addEventListener('DOMContentLoaded', loadAndRenderTasks);
};
