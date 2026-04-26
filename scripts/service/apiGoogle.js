import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();


try {
    const creds = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    console.log("JSON válido:", creds.client_email);
} catch (e) {
    console.error("JSON inválido:", e.message);
}

const googleCredentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);


//Credenciales
const auth = new google.auth.GoogleAuth({
    credentials: googleCredentials,
    scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events",
    ],
});

google.options({ auth });

const calendar = google.calendar("v3");



export default async function apiServiceGoogleCalendar({
    method = "insert",
    bodyInformacion }) {

    //armando la ruta     
    //const __filename = fileURLToPath(import.meta.url);
    //const __dirname = path.dirname(__filename);
    //const keyFilePath = path.join(__dirname, "../service/", "service-account.json");



    let response

    try {



        switch (method.toLowerCase()) {
            case "insert":
                let insertBody = await armandoBodyCalendar(bodyInformacion)
                console.log("Evento entro insert:", insertBody);

                response = await calendar.events.insert({
                    calendarId: "footcarepodologiazevallos@gmail.com",
                    resource: insertBody,
                });

                return response.data.id


            case "update":
                let updateBody = await armandoBodyCalendar(bodyInformacion, "actualizar")
                response = await calendar.events.update({
                    calendarId: "footcarepodologiazevallos@gmail.com",
                    eventId: bodyInformacion.TokenCalendario,             // 👈 ID DEL EVENTO A ACTUALIZAR
                    resource: updateBody
                });
                console.log("Evento actualizado:", response.data.id);
                return response.data.id


            case "delete":
                response = await calendar.events.delete({
                    calendarId: "footcarepodologiazevallos@gmail.com",
                    eventId: bodyInformacion.TokenCalendario,  // 👈 ID REAL DEL EVENTO
                });
                console.log("Evento ELIMINADO:", response);

                return "evento eliminado"
            default:
                response = "ni una validacion"
                return response
        }





    } catch (error) {
        return "vacio "
    }


}


async function armandoBodyCalendar(
    { Nombre,
        cita,
        progreso,
        colorid,
        whatsapp,
        Ubicacion,
        Tipo_de_paciente,
        procedimiento, },
    type = "insert"
) {
    const start = parseFecha(cita);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hora
    const description = `
    Tipo de paciente: ${Tipo_de_paciente}
    Celular: ${whatsapp}
    Cita proxima: ${cita}
    Tipo de procedimiento: ${procedimiento.join(' y ')}
    Progreso actual: ${progreso}
    👩‍⚕️🩺 ${type === "actualizar" ? "El evento ha sido actualizado. " : ""}
    Se recomienda realizar el seguimiento correspondiente según el progreso del paciente y mantener las indicaciones establecidas para asegurar una adecuada evolución del tratamiento.
    📌 Se solicita completar la información pertinente en NocoDB para mantener el registro correctamente actualizado.`;


    const event = {
        summary: `Pct: ${Nombre} - ${cita}`,
        description: description.trim(),
        start: {
            dateTime: start.toISOString(), timeZone: "America/Lima"
        },
        end: { dateTime: end.toISOString(), timeZone: "America/Lima" },
        location: `${Ubicacion.url}`,
        colorId: colorid
    };

    return event
}



function parseFecha(cita) {
    const [fecha, textoHora] = cita.split(" - Cita ");
    const [dia, mes, año] = fecha.split("/");

    // Toma solo HH:mm ignorando segundos y texto extra
    const hora = textoHora.trim().substring(0, 5);

    return new Date(`${año}-${mes}-${dia}T${hora}:00`);
}

