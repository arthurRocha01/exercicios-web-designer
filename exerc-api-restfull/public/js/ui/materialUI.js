import {
  getMateriais,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../api/material.js";

/* ===========================
   LOGIN
=========================== */
export const initLogin = () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (username === "admin" && password === "admin") {
      window.location.href = "dashboard.html";
    } else {
      alert("Usuário ou senha inválidos!");
    }
  });
};

/* ===========================
   DASHBOARD – LISTAGEM
=========================== */
export async function renderMateriais() {
  const container = document.querySelector(".materials-grid");
  if (!container) return;

  try {
    const materiais = await getMateriais();
    container.innerHTML = "";

    if (!materiais.length) {
      container.innerHTML = `<p class="empty">Nenhum material cadastrado.</p>`;
      return;
    }

    for (const mat of materiais) {
      const card = document.createElement("article");
      card.classList.add("material-card");
      card.innerHTML = `
        <h3>${escapeHtml(mat.nome)}</h3>
        <p>${escapeHtml(mat.descricao || "-")}</p>
        <div class="mat-meta">
          <span><strong>Qtd:</strong> ${mat.quantidade}</span>
          <span><strong>Unid:</strong> ${escapeHtml(mat.unidade_medida || "-")}</span>
          <span><strong>R$:</strong> ${Number(mat.preco_unitario || 0).toFixed(2)}</span>
        </div>
        <div class="card-actions">
          <button class="btn-edit" data-id="${mat.id_material}">Editar</button>
          <button class="btn-delete" data-id="${mat.id_material}">Excluir</button>
        </div>
      `;
      container.appendChild(card);
    }

    attachCardActions();
  } catch (err) {
    console.error("Erro ao carregar materiais:", err);
    container.innerHTML = `<p class="error">Erro ao carregar materiais.</p>`;
  }
}

/* ===========================
   CADASTRO / EDIÇÃO
=========================== */
export function setupForm() {
  const form = document.getElementById("materialForm");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const editingId = params.get("id");

  if (editingId) preloadMaterialData(form, editingId);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = getFormData(form);

    try {
      if (editingId) {
        await updateMaterial(editingId, data);
        alert("Material atualizado com sucesso!");
        window.location.href = "dashboard.html";
      } else {
        await createMaterial(data);
        alert("Material cadastrado!");
        form.reset();
      }
    } catch (err) {
      console.error("Erro ao salvar material:", err);
      alert("Erro ao salvar material. Verifique o console.");
    }
  });
}

/* ===========================
   FUNÇÕES AUXILIARES
=========================== */

/** Busca dados e preenche o formulário no modo edição */
async function preloadMaterialData(form, id) {
  try {
    const materiais = await getMateriais();
    const mat = materiais.find((m) => String(m.id_material) === String(id));
    if (!mat) {
      alert("Material não encontrado para edição.");
      return;
    }

    for (const [key, value] of Object.entries(mat)) {
      if (form[key]) form[key].value = value ?? "";
    }
  } catch (err) {
    console.error("Erro ao carregar material:", err);
  }
}

/** Retorna os dados do formulário em formato de objeto */
function getFormData(form) {
  return {
    nome: form.nome.value.trim(),
    descricao: form.descricao.value.trim(),
    unidade_medida: form.unidade_medida.value.trim(),
    quantidade: Number(form.quantidade.value),
    preco_unitario: Number(form.preco_unitario.value),
  };
}

/** Adiciona eventos aos botões de editar/excluir */
function attachCardActions() {
  document.querySelectorAll(".btn-edit").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `cadastrar.html?id=${encodeURIComponent(id)}`;
    })
  );

  document.querySelectorAll(".btn-delete").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!confirm("Deseja realmente excluir este material?")) return;

      try {
        await deleteMaterial(id);
        await renderMateriais(); // recarrega a lista
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir material.");
      }
    })
  );
}

/** Escapa HTML para evitar XSS */
function escapeHtml(text) {
  if (text == null) return "";
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
