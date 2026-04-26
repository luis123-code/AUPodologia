import apiServiceGoogleCalendar from "../../service/apiGoogle.js";
import { obtenerPaciente, mapColor, transformarCita, updateCitaToken } from "../helpers/citasHelpers.js";

export async function handleInsert(cita, res) {
    const paciente = await obtenerPaciente(cita.pacientes.Id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    const { Wasap, Ubicacion, nombreCompleto } = paciente.fields;

    const bodyInformacion = {
        Nombre:           nombreCompleto          || "Sin nombre",
        cita:             cita.fechaCitas,
        progreso:         cita.progreso,
        colorid:          mapColor(cita.progreso),
        whatsapp:         Wasap                   || "Sin Wasap",
        Ubicacion:        { url: Ubicacion?.url   || "Sin ubicación" },
        Tipo_de_paciente: cita.tipoPaciente        || "General",
        procedimiento:    cita.tipoProcedimientoCita
                            ? [cita.tipoProcedimientoCita]
                            : ["Sin procedimiento"],
        TokenCalendario:  cita.tokenCalendario,
    };

    console.log("Creando evento...", bodyInformacion);
    const tokenResultado = await apiServiceGoogleCalendar({ method: "insert", bodyInformacion });
    console.log("token recibido:", tokenResultado);

    cita.tokenCalendario = tokenResultado;
    const citaUpdate = await updateCitaToken(transformarCita(cita));
    console.log("cita actualizada:", citaUpdate);

    return res.status(200).json({ ok: true, tokenCalendario: tokenResultado });
}