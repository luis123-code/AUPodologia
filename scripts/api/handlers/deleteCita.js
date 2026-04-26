import apiServiceGoogleCalendar from "../../service/apiGoogle.js";
import { obtenerPaciente, mapColor, transformarCita, updateCitaToken } from "../helpers/citasHelpers.js";


export async function handleDelete(cita, res) {
    const bodyInformacion = {
        TokenCalendario: cita.tokenCalendario,
    };
    console.log("Eliminando evento...", bodyInformacion);
    await apiServiceGoogleCalendar({ method: "delete", bodyInformacion });


    let cuerpo = transformarCita(cita , true)
    try {
        let promesa = await updateCitaToken(cuerpo)
        console.log("se ejecuto promesa updateCitaToken" , promesa)
    } catch (error) {
        throw new Error("ERROR es" , error )
    }

    return res.status(200).json({ ok: true, mensaje: "Evento eliminado" });
}