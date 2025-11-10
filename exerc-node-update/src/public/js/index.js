import { getMateriais, updateMaterial, deleteMaterial } from '../api/mailMasterApi.js';

const rederUsuarios = async (req, res) => {
    const userList = document.getElementById('userList');
    userList.innerHTML = '<tr><td colspan="4">Carregando usuários...</td></tr>';

    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        if (users.length == 0) {
            userList.innerHTML = '<tr><td colspan="4">Nenhum usuário cadastrado.</td></tr>';
            return;
        }

        userList.innerHTML = '';
    } catch (error) {

    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const users = await getMateriais();
    if (!users.ok) throw new Error('Erro ao carregar usuário');

})