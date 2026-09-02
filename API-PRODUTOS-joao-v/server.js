import "dotenv/config";
import app from "./src/app.js";

const PORTA = process.env.PORT || 8000;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
