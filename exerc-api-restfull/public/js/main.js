document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
    initMaterialForm();
    initDashboard();
});

//////////////////////////
// LOGIN
//////////////////////////
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    loginForm.addEventListener('submit', handleLogin);
}

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const isAuthenticated = await authenticateUser(username, password);

    if (isAuthenticated) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
}

// Autenticação estática
async function authenticateUser(username, password) {
    return username === 'admin' && password === 'admin';
}

//////////////////////////
// FORMULÁRIO DE MATERIAIS
//////////////////////////
function initMaterialForm() {
    const materialForm = document.getElementById('materialForm');
    if (!materialForm) return;

    // Listener de submit
    materialForm.addEventListener('submit', handleMaterialFormSubmit);
}

async function handleMaterialFormSubmit(event) {
    event.preventDefault();
    const materialForm = event.target;
    const editingId = materialForm.dataset.editingId || null;
    const materialData = getMaterialFormData();

    // Validações
    if (!materialData.nome) return alert('Nome do material é obrigatório!');
    if (materialData.quantidade < 0) return alert('Quantidade não pode ser negativa!');
    if (materialData.preco_unitario < 0) return alert('Preço não pode ser negativo!');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/materiais/${editingId}` : '/api/materiais';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(materialData),
        });

        if (response.ok) {
            alert('Material salvo com sucesso!');
            materialForm.dataset.editingId = '';
            window.location.href = 'dashboard.html';
        } else {
            const result = await response.json();
            alert(result.message || 'Erro ao salvar material!');
        }
    } catch (error) {
        console.error('Erro ao salvar material:', error);
        alert('Erro de rede ao salvar material!');
    }
}

function getMaterialFormData() {
    return {
        nome: document.getElementById('nome').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        unidade_medida: document.getElementById('unidade_medida').value.trim(),
        quantidade: parseFloat(document.getElementById('quantidade').value) || 0,
        preco_unitario: parseFloat(document.getElementById('preco_unitario').value) || 0,
        categoria: document.getElementById('categoria').value.trim(),
        status: document.getElementById('status').value.trim()
    };
}

function populateMaterialForm(material) {
    document.getElementById('nome').value = material.nome;
    document.getElementById('descricao').value = material.descricao;
    document.getElementById('unidade_medida').value = material.unidade_medida;
    document.getElementById('quantidade').value = material.quantidade;
    document.getElementById('preco_unitario').value = material.preco_unitario;
    document.getElementById('categoria').value = material.categoria;
    document.getElementById('status').value = material.status;

    const materialForm = document.getElementById('materialForm');
    materialForm.dataset.editingId = material.id; // Marca como edição
}

//////////////////////////
// DASHBOARD / LISTAGEM
//////////////////////////
function initDashboard() {
    if (!window.location.pathname.includes('dashboard.html')) return;
    fetchMateriais();
}

async function fetchMateriais() {
    try {
        const response = await fetch('/api/materiais');
        if (!response.ok) throw new Error('Erro ao buscar materiais');
        const materiais = await response.json();
        renderMaterialList(materiais);
    } catch (error) {
        console.error('Erro ao carregar materiais:', error);
        alert('Erro ao carregar materiais!');
    }
}

function renderMaterialList(materiais) {
    const materialList = document.getElementById('materialList');
    if (!materialList) return;

    materialList.innerHTML = '';
    materiais.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${m.nome}</strong> - Quantidade: ${m.quantidade}
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        `;
        materialList.appendChild(li);

        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        // Passa o objeto completo para edição
        editBtn.addEventListener('click', () => populateMaterialForm(m));
        deleteBtn.addEventListener('click', () => deleteMaterial(m.id));
    });
}

async function deleteMaterial(id) {
    if (!confirm('Deseja realmente excluir este material?')) return;

    try {
        const response = await fetch(`/api/materiais/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Material excluído com sucesso!');
            fetchMateriais();
        } else {
            const result = await response.json();
            alert(result.message || 'Erro ao excluir material!');
        }
    } catch (error) {
        console.error('Erro ao excluir material:', error);
        alert('Erro de rede ao excluir material!');
    }
}
