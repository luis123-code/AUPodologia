# Footcare Podología - Automatización de Citas

Sistema de automatización para sincronizar citas de podología entre NocoDB y Google Calendar.

## 🚀 Despliegue en Vercel

### 1. Configurar Variables de Entorno en Vercel

Después de importar el proyecto en Vercel, configura las siguientes variables de entorno en Settings → Environment Variables:

- `NOCODB_WEBHOOK_SECRET`: Secreto del webhook de NocoDB
- `GOOGLE_CREDENTIALS`: JSON de credenciales de cuenta de servicio Google (string JSON)
- `NOCODB_TOKEN`: Token de API de NocoDB
- `NOCODB_URL`: URL de NocoDB (https://app.nocodb.com)
- `NOCODB_BASE_ID`: ID de la base en NocoDB
- `TABLE_CITA`: ID de la tabla de citas
- `TABLE_PACIENTE`: ID de la tabla de pacientes
- `TABLE_HSITORIALMEDICO`: ID de la tabla de historial médico

### 2. Desplegar

Opción A: Desde Vercel CLI
```bash
npm install -g vercel
vercel
```

Opción B: Desde GitHub
1. Sube el código a GitHub
2. Importa el proyecto en Vercel desde GitHub
3. Configura las variables de entorno
4. Deploy

### 3. Configurar Webhook en NocoDB

Después del despliegue, configura el webhook en NocoDB:
- URL: `https://tu-proyecto.vercel.app/api/cita`
- Método: POST/PATCH/DELETE
- Headers: `Authorization: Bearer NOCODB_WEBHOOK_SECRET`

## 📁 Estructura del Proyecto

```
AU.Footcare/
├── api/
│   └── index.js              # Entry point para Vercel
├── scripts/
│   ├── api/
│   │   ├── crudCita.js       # Router principal de citas
│   │   ├── handlers/         # Handlers para insert/update/delete
│   │   └── helpers/          # Funciones auxiliares
│   └── service/
│       ├── apiGoogle.js      # Integración con Google Calendar
│       ├── apiOcodb.js       # Cliente NocoDB
│       └── apiService.js     # Wrapper HTTP genérico
├── vercel.json               # Configuración de Vercel
├── package.json
└── .env                      # Variables de entorno (local)
```

## 🔧 Desarrollo Local

```bash
npm install
npm run dev
```

El servidor correrá en `http://localhost:3000`

## 📡 Endpoints

- `POST /api/cita` - Crear nueva cita
- `PATCH /api/cita` - Actualizar o eliminar cita
- `DELETE /api/cita` - Eliminar cita

## 🎯 Funcionalidades

- **Crear cita**: Crea evento en Google Calendar y guarda el token en NocoDB
- **Actualizar cita**: Modifica evento existente
- **Eliminar cita**: Borra evento del calendario
- **Colores por estado**: Confirmada(5), Pendiente(4), Cancelada(11), Descontinuado(2), Programado(1)

## 🔐 Seguridad

- Usa cuenta de servicio de Google para autenticación
- Variables de entorno configuradas en Vercel
- Webhook protegido con secreto
