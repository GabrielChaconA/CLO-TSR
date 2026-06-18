# Directorio: `src/middlewares/`

Este directorio contiene funciones middleware de Express que interceptan las peticiones para realizar tareas comunes antes de que lleguen a los controladores.

## Middlewares Planificados:
*   **`auth.middleware.ts`**: Verifica y valida el JSON Web Token (JWT) en los headers de autorización para proteger rutas privadas.
*   **`validation.middleware.ts`**: Middleware genérico que valida el cuerpo (`req.body`), parámetros (`req.params`) o queries (`req.query`) de la petición utilizando esquemas de Zod antes de continuar.
*   **`error.middleware.ts`**: Middleware de manejo de errores centralizado que captura excepciones y retorna respuestas JSON formateadas al cliente de manera segura.
