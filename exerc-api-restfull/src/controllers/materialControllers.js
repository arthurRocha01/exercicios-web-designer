// src/controllers/materialControllers.js
import * as materialService from "../services/materialServices.js";

/**
 * Envia resposta JSON padronizada
 */
const sendResponse = (res, status, data, message) => {
  const response = message ? { message, data } : data;
  return res.status(status).json(response);
};

/**
 * Valida os campos obrigatórios de material
 */
const validateFields = ({ nome, unidade_medida, quantidade, preco_unitario }) => {
  return nome && unidade_medida && quantidade !== undefined && preco_unitario !== undefined;
};

/**
 * Lista todos os materiais
 */
export const listMaterials = async (req, res) => {
  try {
    const materiais = await materialService.getAllMaterials();
    return sendResponse(res, 200, materiais);
  } catch (error) {
    console.error("❌ Erro ao listar materiais:", error);
    return sendResponse(res, 500, null, "Erro interno no servidor");
  }
};

/**
 * Cadastra um novo material
 */
export const registerMaterial = async (req, res) => {
  try {
    if (!validateFields(req.body)) {
      return sendResponse(res, 400, null, "Todos os campos são obrigatórios!");
    }

    const novoMaterial = await materialService.createMaterial(req.body);
    return sendResponse(res, 201, novoMaterial, "Material criado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao registrar material:", error);
    return sendResponse(res, 500, null, "Erro ao registrar material");
  }
};

/**
 * Atualiza um material existente
 */
export const updateMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    if (!validateFields(req.body) || !req.body.descricao) {
      return sendResponse(res, 400, null, "Todos os campos são obrigatórios!");
    }

    const materialAtualizado = await materialService.updateMaterial(id, req.body);

    if (!materialAtualizado) {
      return sendResponse(res, 404, null, "Material não encontrado");
    }

    return sendResponse(res, 200, materialAtualizado, "Material atualizado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao atualizar material:", error);
    return sendResponse(res, 500, null, "Erro ao atualizar material");
  }
};

/**
 * Exclui um material
 */
export const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    const materialDeletado = await materialService.deleteMaterial(id);

    if (!materialDeletado) {
      return sendResponse(res, 404, null, "Material não encontrado");
    }

    return sendResponse(res, 200, null, "Material excluído com sucesso");
  } catch (error) {
    console.error("❌ Erro ao excluir material:", error);
    return sendResponse(res, 500, null, "Erro ao excluir material");
  }
};
