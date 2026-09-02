import mongoose from "mongoose";

// Abre a conexão com o MongoDB usando a string definida no .env
async function conectarBanco() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
}

export default conectarBanco;
