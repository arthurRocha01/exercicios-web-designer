import db from '../config/db.js';

export const findAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
};

export const findUserById = async (id) => {
    const [rows] = db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows || null;
};

export const updateUser = async (id, data) => {
    const { nome, email} = data;
    await db.query('UPDATE usuarios SET name = ?, email = ? WHERE id = ?', [nome, email, id]);
    return findUserById(id);
};

export const deleteUser = async (id) => {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
};