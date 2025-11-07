import * as materialService from '../services/materialServices.js'

export const listMaterials = async (req, res) => {
    try {
        const materiais = await materialService.getAllMaterials();
        return res.status(200).json(materiais);
    } catch (error) {
        console.error("Erro ao listar materiais:", error);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
};

export const registerMaterial = async (req, res) => {
    const { nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status } = req.body;

    if (!nome || !unidade_medida || quantidade === undefined || preco_unitario === undefined || !status) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    try {
        const novoMaterial = await materialService.createMaterial({ nome, descricao, unidade_medida, quantidade, preco_unitario, categoria, status });
        return res.status(201).json(novoMaterial); // Envia o material criado
    } catch (error) {
        console.error("Erro ao registrar material:", error);
        return res.status(500).json({ message: "Erro ao registrar material" });
    }
};

export const updateMaterial = async (req, res) => {
    const { id } = req.params;
    const { nome, quantidade } = req.body;

    if (!nome || !quantidade) {
        return res.status(400).json({ message: "Nome e quantidade são obrigatórios" });
    }

    try {
        const materialAtualizado = await materialService.updateMaterial(id, { nome, quantidade });

        if (!materialAtualizado) {
            return res.status(404).json({ message: "Material não encontrado" });
        }

        return res.status(200).json(materialAtualizado); // Retorna material atualizado
    } catch (error) {
        console.error("Erro ao atualizar material:", error);
        return res.status(500).json({ message: "Erro ao atualizar material" });
    }
};

export const deleteMaterial = async (req, res) => {
    const { id } = req.params;

    try {
        const materialDeletado = await materialService.deleteMaterial(id);

        if (!materialDeletado) {
            return res.status(404).json({ message: "Material não encontrado" });
        }

        return res.status(200).json({ message: "Material excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir material:", error);
        return res.status(500).json({ message: "Erro ao excluir material" });
    }
};