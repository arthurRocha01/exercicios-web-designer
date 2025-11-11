const fecthhUsers = async () => {
    const response = await fetch('api/users');
    if (!response.ok) throw new Error('Erro na resposta do servidor');
    return await response.json();
}

const createUserRow = (user) => {
    return `
        <tr>
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>
                <button class="edit-btn" data-id="${user.id}">Editar</button>
                <button class="delete-btn" data-id="${user.id}">Excluir</button>
            </td>
        </tr>
    `;
}

const renderUsers = async () => {
    const userList = document.getElementById('userList');
    userList.innerHTML = '<tr><td colspan="4">Carregando usuários...</td></tr>';

    try {
        const users = await fecthhUsers();

        if (!Array.isArray(users) || users.length === 0) {
            userList.innerHTML = '<tr><td colspan="4">Nenhum usuário cadastrado.</td></tr>';
            return;
        }

        userList.innerHTML = users.map(createUserRow).join('');
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        userList.innerHTML = '<tr><td colspan="4">Erro ao carregar usuários.</td></tr>';
    }
}

const deleteUser = async (id) => {
    const confirmed = confirm('Tem certeza que deseja excluir esse usuário?');
    if (!confirmed) return;

    const response = await fetch(`/api/users/:${id}`, { method: 'DELETE' });
    if (!response.ok) {
        alert('Erro ao excluir usuário');
        return;
    }

    await renderUsers();
}

const editUser = async (id) => {
    window.location.href = `/editar?id=${id}`;
}

document.addEventListener('click', async e => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const id = btn.dataset.id;

    if (btn.classList.contains('delete-btn')) {
        await deleteUser(id);
    } else if (btn.classList.contains('edit-btn')) {
        await editUser(id);
    }
});

document.addEventListener('DOMContentLoaded', renderUsers);