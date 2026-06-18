# WearLab - Backend API

Este es el backend para la tienda de ropa WearLab. Está construido utilizando **Node.js**, **Express** y **TypeScript**.

## Tecnologías Principales
*   **Lenguaje:** TypeScript (`.ts`)
*   **Framework:** Express.js
*   **Base de Datos (DB):** PostgreSQL (hospedado en Neon.tech)
*   **ORM:** Drizzle ORM / Prisma ORM
*   **Validación:** Zod

## Estructura de Directorios
*   `src/config/`: Configuración global y variables de entorno.
*   `src/db/`: Esquemas de base de datos, migraciones y cliente del ORM.
*   `src/controllers/`: Controladores con la lógica de negocio de la API.
*   `src/routes/`: Definición de rutas y endpoints de la API.
*   `src/middlewares/`: Middlewares globales (autenticación, manejo de errores, validaciones).
*   `src/types/`: Interfaces y tipos de TypeScript compartidos.
