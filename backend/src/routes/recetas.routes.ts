import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_receta, nombre, descripcion, categoria, tiempo_preparacion,
              porciones, dificultad, imagen, emoji, consejo, preparacion,
              utensilios, equipos, fuente_url
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

router.get('/:id', async (req, res) => {
  const idReceta = Number(req.params.id);

  if (!Number.isInteger(idReceta) || idReceta <= 0) {
    return res.status(400).json({ mensaje: 'El identificador de la receta no es válido' });
  }

  try {
    const result = await pool.query(
      `SELECT
         r.id_receta,
         r.nombre,
         r.descripcion,
         r.categoria,
         r.tiempo_preparacion,
         r.porciones,
         r.dificultad,
         r.imagen,
         r.emoji,
         r.consejo,
         r.preparacion,
         r.utensilios,
         r.equipos,
         r.fuente_url,
         COALESCE(
           json_agg(json_build_object(
             'id_ingrediente', i.id_ingrediente,
             'nombre', i.nombre,
             'categoria', i.categoria,
             'cantidad', ri.cantidad
           ) ORDER BY i.nombre) FILTER (WHERE i.id_ingrediente IS NOT NULL),
           '[]'::json
         ) AS ingredientes
       FROM recetas r
       LEFT JOIN receta_ingrediente ri ON ri.id_receta = r.id_receta
       LEFT JOIN ingredientes i ON i.id_ingrediente = ri.id_ingrediente
       WHERE r.id_receta = $1
       GROUP BY r.id_receta`,
      [idReceta],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró la receta solicitada' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al consultar el detalle de la receta:', error);
    return res.status(500).json({ mensaje: 'Error al consultar el detalle de la receta' });
  }
});

export default router;
