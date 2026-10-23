import { Router } from 'express';
import { pool } from '../config/db';

const router = Router();

router.get('/:id/ingredientes', async (req, res) => {
  const idReceta = Number(req.params.id);

  if (!Number.isInteger(idReceta) || idReceta <= 0) {
    return res.status(400).json({
      mensaje: 'El identificador de la receta no es válido',
    });
  }

  try {
    const result = await pool.query(
      `SELECT
        i.id_ingrediente,
        i.nombre,
        i.categoria,
        ri.cantidad
      FROM receta_ingrediente ri
      JOIN ingredientes i
        ON i.id_ingrediente = ri.id_ingrediente
      WHERE ri.id_receta = $1
      ORDER BY i.nombre ASC`,
      [idReceta]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar ingredientes de la receta:', error);

    res.status(500).json({
      mensaje: 'Error al consultar los ingredientes de la receta',
    });
  }
});

export default router;