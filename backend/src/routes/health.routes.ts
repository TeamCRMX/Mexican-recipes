import { Router } from 'express';
import { pool } from '../config/db';

const router = Router();

router.get('/health', async (_req, res) => {
  try {
    const result = await pool.query('SELECT current_database()');

    res.json({
      estado: 'correcto',
      mensaje: 'Conexión con PostgreSQL exitosa',
      baseDatos: result.rows[0].current_database,
    });
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);

    res.status(500).json({
      estado: 'error',
      mensaje: 'No se pudo conectar con la base de datos',
    });
  }
});

export default router;