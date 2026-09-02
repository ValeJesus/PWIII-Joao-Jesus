import express from "express";
import ProdutosController from "../controllers/produtosController.js";

const rotas = express.Router();

rotas.get("/produtos", ProdutosController.listar);           // aceita ?nome= opcional
rotas.get("/produtos/:id", ProdutosController.listarPorId);
rotas.post("/produtos", ProdutosController.cadastrar);
rotas.put("/produtos/:id", ProdutosController.atualizar);
rotas.delete("/produtos/:id", ProdutosController.deletar);

export default rotas;
