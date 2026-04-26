import express from "express";
import dotenv from "dotenv";
dotenv.config();
import crudCita from "../scripts/api/crudCita.js";

const app = express();
app.use(express.json());

app.post("/cita", crudCita);
app.patch("/cita", crudCita);
app.delete("/cita", crudCita);

// Para desarrollo local
if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
}

// Exportar para Vercel
export default app;
