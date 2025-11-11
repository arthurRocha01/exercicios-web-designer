import * as userModel from '../models/userModel.js';

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
        console.log(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários ${error}' });
        console.log(error)
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await userModel.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
        console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: `Erro ao remover usuário \n${error}` });
        console.log(error);
    }
};