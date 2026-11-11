import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.post('/', async (req, res) => {
  const nombre = typeof req.body.nombre === 'string' ? req.body.nombre.trim() : '';
  const correo = typeof req.body.correo === 'string' ? req.body.correo.trim() : '';
  const mensaje = typeof req.body.mensaje === 'string' ? req.body.mensaje.trim() : '';

  if (nombre.length < 2 || nombre.length > 80) {
    return res.status(400).json({ mensaje: 'Escribe un nombre de 2 a 80 caracteres.' });
  }
  if (correo && (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))) {
    return res.status(400).json({ mensaje: 'Revisa el formato del correo electrónico.' });
  }
  if (mensaje.length < 10 || mensaje.length > 1200) {
    return res.status(400).json({ mensaje: 'El mensaje debe tener entre 10 y 1200 caracteres.' });
  }

  try {
    await pool.query(
      `INSERT INTO mensajes_contacto (nombre, correo, mensaje)
       VALUES ($1, $2, $3)`,
      [nombre, correo || null, mensaje],
    );
    return res.status(201).json({ mensaje: 'Tu mensaje quedó guardado. Gracias por escribirnos.' });
  } catch (error) {
    console.error('Error al guardar mensaje de contacto:', error);
    return res.status(500).json({ mensaje: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' });
  }
});

export default router;
