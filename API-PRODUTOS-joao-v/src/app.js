import express from "express";
import conectarBanco from "./config/dbConnect.js";
import configurarRotas from "./routes/index.js";

const app = express();

const conexao = await conectarBanco();

conexao.on("error", (erro) => {
    console.error("Erro na conexão com o banco:", erro);
});

conexao.once("open", () => {
    console.log("Conectado ao banco de dados com sucesso!");
});

configurarRotas(app);

export default app;
