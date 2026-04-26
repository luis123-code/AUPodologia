import apiService from "./apiService.js";
import dotenv from "dotenv";
dotenv.config();

const NOCODB_TOKEN = process.env.NOCODB_TOKEN;
const NOCODB_URL = process.env.NOCODB_URL;
const NOCODB_BASE_ID = process.env.NOCODB_BASE_ID;

function urlNocodb(tableId, query = "") {
  return `${NOCODB_URL}/api/v3/data/${NOCODB_BASE_ID}/${tableId}/records${query}`;
}

const filtrarPorCampo = (campo, valor) =>
  `?where=(${campo},eq,${valor})`;

const filtrarPorId = id =>
  `/${id}`;

// 🔹 GET
const getHandlers = {
  GetPacienteInfor: async (queryId, TABLE) => {
    try {
      const response = await apiService({
        url: urlNocodb(TABLE, filtrarPorId(queryId)),
        token: NOCODB_TOKEN
      });
      return response;
    } catch (error) {
      console.error("Error en GetPacienteInfor:", error);
      throw error;
    }
  }
};

// 🔹 POST / PUT 
const pathHanfles = {
  PathHCitaInfor: async (TABLE, body, method = "POST") => {
    try {
      const response = await apiService({
        url: urlNocodb(TABLE),
        token: NOCODB_TOKEN,
        cuerpo: body,
        method: method
      });
      return response;
    } catch (error) {
      console.error("Error en PathHCitaInfor:", error);
      throw error;
    }
  }
};






export { getHandlers, pathHanfles};