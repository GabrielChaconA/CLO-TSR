# Directorio: `src/db/`

Este directorio se encargará de toda la lógica de acceso y modelado de datos para PostgreSQL (hospedado en Neon).

## Contenido de la carpeta:
*   **`connection.ts`**: Inicializa la conexión con la base de datos utilizando el controlador correspondiente (por ejemplo, el SDK de Neon `@neondatabase/serverless`).
*   **`schema.ts`**: Definición de las tablas, relaciones y tipos utilizando Drizzle ORM (o archivos de esquema de Prisma).
*   **Migraciones**: Carpeta con los scripts de migración SQL autogenerados para sincronizar el esquema del código con la base de datos de Neon.
