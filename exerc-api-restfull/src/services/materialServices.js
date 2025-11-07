// src/services/materialServices.js
import pool  from "../config/db.js";

/**
 * Retorna todos os materiais cadastrados
 */
export const getAllMaterials = async () => {
  const [rows] = await pool.query("SELECT * FROM materiais");
  return rows;
};

/**
 * Busca um material pelo ID
 */
export const getMaterialById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM materiais WHERE id = ?", [id]);
  return rows[0] || null;
};

/**
 * Cria um novo material
 */
export const createMaterial = async ({ nome, descricao, unidade_medida, quantidade, preco_unitario }) => {
  const [result] = await pool.query(
    `INSERT INTO materiais (nome, descricao, unidade_medida, quantidade, preco_unitario)
     VALUES (?, ?, ?, ?, ?)`,
    [nome, descricao, unidade_medida, quantidade, preco_unitario]
  );

  return {
    id: result.insertId,
    nome,
    descricao,
    unidade_medida,
    quantidade,
    preco_unitario,
  };
};

/**
 * Atualiza um material existente
 */
export const updateMaterial = async (id, { nome, descricao, unidade_medida, quantidade, preco_unitario }) => {
  const [result] = await pool.query(
    `UPDATE materiais
     SET nome = ?, descricao = ?, unidade_medida = ?, quantidade = ?, preco_unitario = ?
     WHERE id = ?`,
    [nome, descricao, unidade_medida, quantidade, preco_unitario, id]
  );

  if (result.affectedRows === 0) return null;

  return {
    id: id,
    nome,
    descricao,
    unidade_medida,
    quantidade,
    preco_unitario,
  };
};

/**
 * Exclui um material
 */
export const deleteMaterial = async (id) => {
  const [result] = await pool.query("DELETE FROM materiais WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
