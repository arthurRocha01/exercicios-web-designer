const pool = require('../config/db');

exports.getAllMaterials = async () => {
    const [results] = await pool.query('SELECT * FROM materiais');
    return results;
};

exports.getMaterialById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM materiais WHERE id_material = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0];
};

exports.createMaterial = async ({ nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status }) => {
    const [result] = await pool.query(
        `INSERT INTO materiais (nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status]
    );
    return { id_material: result.insertId, nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status };
};

exports.updateMaterial = async (id, { nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status }) => {
    const [result] = await pool.query(
        `UPDATE materiais
         SET nome = ?, descricao = ?, unidade_medida = ?, quantidade = ?, preco_unitario = ?, categoria = ?, status = ?
         WHERE id_material = ?`,
        [nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status, id]
    );
    if (result.affectedRows === 0) return null;
    return { id_material: id, nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status };
};

exports.deleteMaterial = async (id) => {
    const [result] = await pool.query('DELETE FROM materiais WHERE id_material = ?', [id]);
    if (result.affectedRows === 0) return null;
    return true;
};