// Ponto central de configuração das rotas da aplicação
import express from "express";
import rotasProdutos from "./produtosRoutes.js";

const configurarRotas = (app) => {
    app.route("/").get((req, res) => res.status(200).send("API-PRODUTOS"));

    app.use(express.json(), rotasProdutos); // converte o corpo das requisições para JSON
};

export default configurarRotas;
