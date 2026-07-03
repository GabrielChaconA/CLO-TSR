import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as dotenv from 'dotenv';

// Configura dotenv para asegurar que las variables estén cargadas si no lo están por el entry point.
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

// Inicializa la conexión Neon
const sql = neon(databaseUrl);

// Crea la instancia de Drizzle ORM
export const db = drizzle(sql, { schema });
