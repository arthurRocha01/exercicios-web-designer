import * as userModel from '../models/userModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.findAllUsers();
        res.json(users);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await userModel.updateUser(req.params, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params);
        res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
        res.status(500),json({ error: `Erro ao remover usuário \n${error}` });
    }
};