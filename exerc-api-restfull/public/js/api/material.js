// public/js/api/material.js
const API_URL = "http://localhost:5001/api/materiais";

/**
 * Função genérica para chamadas à API
 */
async function request(endpoint = "", options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    // Trata erro HTTP (ex: 404, 500)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro ${response.status}: ${errorText || response.statusText}`
      );
    }

    // Tenta converter para JSON (caso a resposta tenha corpo)
    const contentType = response.headers.get("content-type");
    return contentType && contentType.includes("application/json")
      ? await response.json()
      : null;
  } catch (error) {
    console.error("❌ Erro na requisição:", error.message);
    throw error;
  }
}

/**
 * Retorna todos os materiais
 */
export const getMateriais = () => request();

/**
 * Cria um novo material
 */
export const createMaterial = (material) =>
  request("", {
    method: "POST",
    body: JSON.stringify(material),
  });

/**
 * Atualiza um material existente
 */
export const updateMaterial = (id, material) =>
  request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(material),
  });

/**
 * Exclui um material
 */
export const deleteMaterial = (id) =>
  request(`/${id}`, { method: "DELETE" });