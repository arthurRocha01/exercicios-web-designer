import { getMateriais, createMaterial, updateMaterial } from '../api/material.js';

/** Inicializa o formulário de login */
export const initLogin = async () => {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value.trim();

        if (username === 'admin' && password === 'admin') {
            window.location.href = 'dashboard.html';
        } else {
            alert('Usuário ou senha inválidos!');
        }
    });
};

/** Renderiza os materiais na dashboard */
export async function renderMateriais() {
    const container = document.querySelector('.materials-grid');
    if (!container) return;

    const materiais = await getMateriais();
    container.innerHTML = '';

    materiais.forEach((mat) => {
        const card = document.createElement('div');
        card.classList.add('material-card');
        card.innerHTML = `
            <h3>${mat.nome}</h3>
            <p><strong>Quantidade:</strong> ${mat.quantidade}</p>
            <p><strong>Preço Unitário:</strong> R$ ${Number(mat.preco_unitario || 0).toFixed(2)}</p>
            <button class="btn secondary btn-edit" data-id="${mat.id_material}">Editar</button>
        `;
        container.appendChild(card);
    });

    setupEditButtons();
}

/** Configura o formulário de criação e edição */
export function setupForm() {
    const form = document.getElementById('form-cadastro');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = form.dataset.editingId;
        const material = {
            nome: form.nome.value.trim(),
            quantidade: parseInt(form.quantidade.value, 10),
            preco_unitario: parseFloat(form.preco_unitario.value),
        };

        if (id) {
            await updateMaterial(id, material);
            alert('Material atualizado!');
            form.removeAttribute('data-editing-id');
        } else {
            await createMaterial(material);
            alert('Material cadastrado!');
        }

        form.reset();
        renderMateriais();
    });
}

/** Liga os botões de edição aos cards */
function setupEditButtons() {
    const buttons = document.querySelectorAll('.btn-edit');
    const form = document.getElementById('form-cadastro');
    if (!buttons.length || !form) return;

    buttons.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const materiais = await getMateriais();
            const mat = materiais.find(m => m.id_material == id);
            if (!mat) return alert('Material não encontrado.');

            form.nome.value = mat.nome;
            form.quantidade.value = mat.quantidade;
            form.preco_unitario.value = mat.preco_unitario;
            form.dataset.editingId = id;

            form.scrollIntoView({ behavior: 'smooth' });
        });
    });
}
