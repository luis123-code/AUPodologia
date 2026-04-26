import { getHandlers } from "../../service/apiOcodb.js";
import { pathHanfles } from "../../service/apiOcodb.js";

export function mapColor(progreso) {
    switch (progreso) {
        case "Confirmada": return "5";
        case "Pendiente": return "4";
        case "Cancelada": return "11";
        case "Descontinuado": return "2";
        case "Programado": return "1";
        default: return "1";
    }
}

export function transformarCita(cita, status) {
    return [
        {
            id: String(cita?.Id ?? ""),
            fields: {
                tokenCalendario: status
                    ? "SE ELIMINÓ CORRECTAMENTE"
                    : (cita?.tokenCalendario || "no hay")
            }
        }
    ];
}

export async function obtenerPaciente(pacienteId) {
    try {
        const tabla = process.env.TABLE_PACIENTE;
        const respuesta = await getHandlers.GetPacienteInfor(pacienteId, tabla);
        return respuesta?.cuerpo ?? null;
    } catch (error) {
        console.error("Error obteniendo paciente:", error.message);
        return null;
    }
}

export async function updateCitaToken(cuerpo) {
    try {
        const tabla = process.env.TABLE_CITA;
        return await pathHanfles.PathHCitaInfor(tabla, cuerpo, "PATCH");
    } catch (error) {
        console.error("Error actualizando cita:", error.message);
        return null;
    }
}






