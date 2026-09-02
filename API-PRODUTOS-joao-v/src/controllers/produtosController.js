import mongoose from "mongoose";
import Produto from "../models/Produto.js";

// Confirma se o id tem um formato válido de ObjectId antes de consultar o banco,
// separando erro de entrada do cliente (400) de erro de servidor (500).
function ehIdValido(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

const ProdutosController = {

    // GET /produtos            -> lista tudo, 200
    // GET /produtos?nome=Caneta -> filtra por nome, 200
    async listar(req, res) {
        try {
            const { nome } = req.query;
            const filtro = nome ? { nome } : {};
            const produtos = await Produto.find(filtro);
            res.status(200).json(produtos);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    },

    // GET /produtos/:id -> 200 (encontrado) | 400 (id inválido) | 404 (não encontrado)
    async listarPorId(req, res) {
        const { id } = req.params;
        if (!ehIdValido(id)) {
            return res.status(400).json({ message: "id inválido" });
        }
        try {
            const produto = await Produto.findById(id);
            if (!produto) {
                return res.status(404).json({ message: "produto não encontrado" });
            }
            res.status(200).json(produto);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do produto` });
        }
    },

    // POST /produtos -> 201 (criado) | 400 (dados inválidos)
    async cadastrar(req, res) {
        try {
            const novoProduto = await Produto.create(req.body);
            res.status(201).json({ message: "criado com sucesso", produto: novoProduto });
        } catch (erro) {
            if (erro instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: `${erro.message} - dados inválidos` });
            }
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar produto` });
        }
    },

    // PUT /produtos/:id -> 200 (atualizado) | 400 (id/dados inválidos) | 404 (não encontrado)
    async atualizar(req, res) {
        const { id } = req.params;
        if (!ehIdValido(id)) {
            return res.status(400).json({ message: "id inválido" });
        }
        try {
            const produtoAtualizado = await Produto.findByIdAndUpdate(
                id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!produtoAtualizado) {
                return res.status(404).json({ message: "produto não encontrado" });
            }
            res.status(200).json({ message: "produto atualizado", produto: produtoAtualizado });
        } catch (erro) {
            if (erro instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: `${erro.message} - dados inválidos` });
            }
            res.status(500).json({ message: `${erro.message} - falha na atualização do produto` });
        }
    },

    // DELETE /produtos/:id -> 200 (apagado) | 400 (id inválido) | 404 (não encontrado)
    async deletar(req, res) {
        const { id } = req.params;
        if (!ehIdValido(id)) {
            return res.status(400).json({ message: "id inválido" });
        }
        try {
            const produtoRemovido = await Produto.findByIdAndDelete(id);
            if (!produtoRemovido) {
                return res.status(404).json({ message: "produto não encontrado" });
            }
            res.status(200).json({ message: "produto apagado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao apagar o produto` });
        }
    }
};

export default ProdutosController;
