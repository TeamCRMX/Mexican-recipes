import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT i.id_ingrediente, i.nombre, i.categoria
       FROM ingredientes i
       INNER JOIN receta_ingrediente ri ON ri.id_ingrediente = i.id_ingrediente
       ORDER BY i.nombre ASC`
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
