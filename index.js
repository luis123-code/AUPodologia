import express from "express";
import dotenv from "dotenv";
dotenv.config();
import crudCita from "./scripts/api/crudCita.js";

const app = express();
app.use(express.json());

app.post("/api/cita", crudCita);
app.patch("/api/cita", crudCita);
app.delete("/api/cita", crudCita);

// Para desarrollo local
if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
}

// Exportar para Vercel
export default app;
