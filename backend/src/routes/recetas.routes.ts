import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_receta, nombre, descripcion, tiempo_preparacion,
              dificultad, imagen
       FROM recetas
       ORDER BY nombre ASC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar recetas:', error);
    res.status(500).json({
      mensaje: 'Error al consultar las recetas',
    });
  }
});

export default router;