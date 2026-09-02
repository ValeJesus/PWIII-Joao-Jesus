import mongoose from "mongoose";

// Estrutura de dados de um produto
const esquemaProduto = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    quantidade: { type: Number, default: 0 }
}, { versionKey: false });

// A coleção "produtos" é criada automaticamente no MongoDB
const Produto = mongoose.model("produtos", esquemaProduto);

export default Produto;
