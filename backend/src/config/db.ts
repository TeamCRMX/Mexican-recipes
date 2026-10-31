import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const usarNeon =
  process.env.USE_NEON === 'true' &&
  Boolean(process.env.DATABASE_URL);

export const pool = usarNeon
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'recetas_mexicanas',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
    });

pool.on('error', (error) => {
  console.error('Error inesperado en el grupo de conexiones:', error);
});