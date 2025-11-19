/**
 * Cria um elemento <li> representando uma task.
 * @param {Object} task - Objeto da task.
 * @param {number|string} task.id - ID da task.
 * @param {string} task.title - Título da task.
 * @param {string} task.due_date - Data de vencimento da task.
 * @param {string} task.status - Status da task ('concluida' ou 'pendente').
 * @returns {HTMLLIElement} Elemento <li> pronto para inserção no DOM.
 */
export const createTaskElement = ({ id, title, due_date, status }) => {
    const completed = status === 'concluida';
    const li = document.createElement('li');
    li.className = `task-item ${completed ? 'task-completed' : 'task-pending'}`;
    li.dataset.taskId = id;

    // Formata a data para exibição
    const formattedDate = new Date(due_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const deadlineText = completed
        ? '<span class="task-deadline deadline-completed">Concluído!</span>'
        : `<span class="task-deadline">Prazo: ${formattedDate}</span>`;

    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" id="task-${id}" class="task-checkbox" ${completed ? 'checked' : ''}>
            <label for="task-${id}" class="task-title">${title}</label>
            ${deadlineText}
        </div>
        <div class="task-actions">
            ${!completed ? `<button class="btn btn-action btn-concluir" data-id="${id}">&#x2714; Concluir</button>` : ''}
            <button class="btn btn-action btn-excluir" data-id="${id}">&#x1F5D1; Excluir</button>
        </div>
    `;
    return li;
};

/**
 * Renderiza a lista de tasks no container fornecido, ordenando por status e data.
 * @param {HTMLElement} taskListEl - Container onde as tasks serão renderizadas.
 * @param {Array<Object>} tasks - Lista de tasks.
 * @param {boolean} isAscending - Define se a ordenação por data será crescente ou decrescente.
 */
export const renderTasks = (taskListEl, tasks, isAscending) => {
    // Ordena tasks: pendentes primeiro, depois concluídas; dentro de cada grupo, por data
    tasks.sort((a, b) => {
        const aDone = a.status === 'concluida';
        const bDone = b.status === 'concluida';
        if (aDone !== bDone) return aDone ? 1 : -1;

        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return isAscending ? dateA - dateB : dateB - dateA;
    });

    // Limpa lista antes de renderizar
    taskListEl.innerHTML = '';

    // Mensagem caso não haja tasks
    if (!tasks.length) {
        taskListEl.innerHTML = '<li class="task-item" style="justify-content:center;opacity:0.7;">Nenhuma tarefa encontrada. Adicione uma nova!</li>';
        return;
    }

    // Fragment para melhor desempenho ao adicionar múltiplos elementos
    const fragment = document.createDocumentFragment();
    tasks.forEach(task => fragment.appendChild(createTaskElement(task)));
    taskListEl.appendChild(fragment);
};
