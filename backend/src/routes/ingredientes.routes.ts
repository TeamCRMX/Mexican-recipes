import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_ingrediente, nombre, categoria
       FROM ingredientes
       ORDER BY nombre ASC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar ingredientes:', error);
    res.status(500).json({
      mensaje: 'Error al consultar los ingredientes',
    });
  }
});

export default router;