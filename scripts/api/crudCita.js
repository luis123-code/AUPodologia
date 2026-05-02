import dotenv from "dotenv";
dotenv.config();
import { handleInsert } from "./handlers/insertCita.js";
import { handleUpdate } from "./handlers/updateCita.js";
import { handleDelete } from "./handlers/deleteCita.js";

export default async function handler(req, res) {
    try {
        const rows = req.body?.data?.rows;
        if (!rows || rows.length === 0) {
            return res.status(400).json({ error: 'Sin datos' });
        }

        const cita = rows[0];
        console.log("cita recibida:", cita);

        // Evitar bucle infinito: ignorar si solo se actualizó el token
        const previousValues = req.body?.data?.previousValues;
        if (previousValues) {
            const camposActualizados = Object.keys(cita).filter(key => {
                return cita[key] !== previousValues[key];
            });
            const soloTokenActualizado = camposActualizados.length === 1 && camposActualizados[0] === 'tokenCalendario';
            if (soloTokenActualizado) {
                console.log("Ignorando webhook: solo se actualizó el token");
                return res.status(200).json({ ok: true, skipped: true });
            }
        }

        if (!cita.pacientes?.Id) {
            return res.status(400).json({ error: 'Sin paciente vinculado' });
        }

        switch (req.method) {
            case "POST":
                console.log("entro al post")
                return await handleInsert(cita, res);
            // case "PATCH":
            //     console.log("entro al PATCH")
            //     return await handleUpdate(cita, res);
            // case "DELETE":
            //     return await handleDelete(cita, res);
            default:
            return res.status(405).json({ error: `Método '${req.method}' no permitido` });
        }

    } catch (error) {
        console.error("Error en crudCita:", error.message);
        if (!res.headersSent) {
            return res.status(500).json({ error: error.message });
        }
    }
}