const form = document.getElementById('edit-form');
const nameInput = document.getElementById('nome');
const emailInput = document.getElementById('email');

const getUserIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const fetchUserData = async (id) => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    return await response.json();
}

const updateUser = async (id, userData) => {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })

    if (!response.ok) throw new Error('Erro ao atualizar usuário');
}

const initEditForm = async () => {
    const id = getUserIdFromUrl();
    if (!id) {
        alert('ID de usuário não encontrado');
        window.location.href = '/';
        return;
    }

    try {
        const [user] = await fetchUserData(id);
        nameInput.value = user.nome;
        emailInput.value = user.email;
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário.');
        window.location.href = 'index.html';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedUser = {
            nome: nameInput.value.trim(),
            email: emailInput.value.trim()
        }

        try {
            await updateUser(id, updatedUser);
            alert('Usuário atualizado com sucesso');
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            alert('Erro ao salvar alterações.');
        }
    });
};

document.addEventListener('DOMContentLoaded', initEditForm);