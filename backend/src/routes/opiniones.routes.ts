import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/', async (req, res) => {
  const receta = typeof req.query.receta === 'string'
    ? req.query.receta.trim().slice(0, 160)
    : null;

  try {
    const resultado = await pool.query(
      `SELECT id_opinion, nombre_receta, nombre_usuario, calificacion,
              comentario, creado_en
       FROM opiniones
       WHERE ($1::text IS NULL OR nombre_receta = $1)
       ORDER BY creado_en DESC
       LIMIT 100`,
      [receta],
    );
    const resumen = await pool.query(
      `SELECT COUNT(*)::int AS total,
              COALESCE(ROUND(AVG(calificacion)::numeric, 1), 0) AS promedio
       FROM opiniones
       WHERE ($1::text IS NULL OR nombre_receta = $1)`,
      [receta],
    );

    return res.json({
      ...resumen.rows[0],
      opiniones: resultado.rows,
    });
  } catch (error) {
    console.error('Error al consultar opiniones:', error);
    return res.status(500).json({ mensaje: 'No fue posible consultar las opiniones.' });
  }
});

router.post('/', async (req, res) => {
  const nombreUsuario = typeof req.body.nombre === 'string'
    ? req.body.nombre.trim()
    : 'Anónimo';
  const comentario = typeof req.body.comentario === 'string'
    ? req.body.comentario.trim()
    : '';
  const calificacion = Number(req.body.calificacion);
  const nombreSolicitado = typeof req.body.receta === 'string'
    ? req.body.receta.trim().slice(0, 160)
    : '';

  if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ mensaje: 'Selecciona una calificación de 1 a 5 estrellas.' });
  }
  if (comentario.length < 10 || comentario.length > 600) {
    return res.status(400).json({ mensaje: 'La opinión debe tener entre 10 y 600 caracteres.' });
  }
  if (nombreUsuario.length > 80) {
    return res.status(400).json({ mensaje: 'El nombre es demasiado largo.' });
  }

  try {
    let recetaId: number | null = null;
    let nombreReceta: string | null = null;

    if (nombreSolicitado && nombreSolicitado !== 'La app') {
      const receta = await pool.query<{ id_receta: number; nombre: string }>(
        'SELECT id_receta, nombre FROM recetas WHERE LOWER(nombre) = LOWER($1) LIMIT 1',
        [nombreSolicitado],
      );
      if (receta.rows.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontró esa receta. Sincroniza el catálogo e inténtalo de nuevo.' });
      }
      recetaId = receta.rows[0].id_receta;
      nombreReceta = receta.rows[0].nombre;
    }

    const guardada = await pool.query(
      `INSERT INTO opiniones
        (id_receta, nombre_receta, nombre_usuario, calificacion, comentario)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_opinion, nombre_receta, nombre_usuario, calificacion,
                 comentario, creado_en`,
      [recetaId, nombreReceta, nombreUsuario || 'Anónimo', calificacion, comentario],
    );

    return res.status(201).json({ mensaje: '¡Gracias por compartir tu opinión!', opinion: guardada.rows[0] });
  } catch (error) {
    console.error('Error al guardar opinión:', error);
    return res.status(500).json({ mensaje: 'No se pudo guardar la opinión.' });
  }
});

export default router;
