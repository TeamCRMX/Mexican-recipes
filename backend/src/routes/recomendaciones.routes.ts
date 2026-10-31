import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.post('/', async (req, res) => {
  const ingredientesSeleccionados: unknown = req.body.ingredientes;

  if (
    !Array.isArray(ingredientesSeleccionados) ||
    ingredientesSeleccionados.length === 0
  ) {
    return res.status(400).json({
      mensaje: 'Debes proporcionar al menos un ingrediente',
    });
  }

  const idsSeleccionados = new Set<number>();
  const nombresSeleccionados = new Set<string>();

  for (const ingrediente of ingredientesSeleccionados) {
    if (typeof ingrediente === 'number' && Number.isInteger(ingrediente) && ingrediente > 0) {
      idsSeleccionados.add(ingrediente);
    } else if (
      typeof ingrediente === 'string' &&
      ingrediente.trim() !== ''
    ) {
      const valor = ingrediente.trim();

      if (/^\d+$/.test(valor) && Number.isSafeInteger(Number(valor)) && Number(valor) > 0) {
        idsSeleccionados.add(Number(valor));
      } else {
        nombresSeleccionados.add(valor.toLocaleLowerCase('es-MX'));
      }
    } else {
      return res.status(400).json({
        mensaje: 'Cada ingrediente debe ser un identificador o un nombre válido',
      });
    }
  }

  try {
    const resultado = await pool.query(`
      SELECT
        r.id_receta,
        r.nombre,
        r.descripcion,
        r.tiempo_preparacion,
        r.dificultad,
        r.imagen,
        i.id_ingrediente,
        i.nombre AS nombre_ingrediente,
        i.categoria,
        ri.cantidad
      FROM recetas r
      LEFT JOIN receta_ingrediente ri
        ON r.id_receta = ri.id_receta
      LEFT JOIN ingredientes i
        ON ri.id_ingrediente = i.id_ingrediente
      ORDER BY r.id_receta, i.nombre
    `);

    const recetasMap = new Map<number, {
      id_receta: number;
      nombre: string;
      descripcion: string | null;
      tiempo_preparacion: number | null;
      dificultad: string | null;
      imagen: string | null;
      ingredientes: {
        id_ingrediente: number;
        nombre: string;
        categoria: string | null;
        cantidad: string | null;
      }[];
    }>();

    for (const fila of resultado.rows) {
      if (!recetasMap.has(fila.id_receta)) {
        recetasMap.set(fila.id_receta, {
          id_receta: fila.id_receta,
          nombre: fila.nombre,
          descripcion: fila.descripcion,
          tiempo_preparacion: fila.tiempo_preparacion,
          dificultad: fila.dificultad,
          imagen: fila.imagen,
          ingredientes: [],
        });
      }

      if (fila.id_ingrediente !== null) {
        recetasMap.get(fila.id_receta)!.ingredientes.push({
          id_ingrediente: fila.id_ingrediente,
          nombre: fila.nombre_ingrediente,
          categoria: fila.categoria,
          cantidad: fila.cantidad,
        });
      }
    }

    const recomendaciones = Array.from(recetasMap.values()).map((receta) => {
      const ingredientesDisponibles = receta.ingredientes.filter((ingrediente) =>
        idsSeleccionados.has(ingrediente.id_ingrediente) ||
        nombresSeleccionados.has(
          ingrediente.nombre.toLocaleLowerCase('es-MX')
        )
      );

      const ingredientesFaltantes = receta.ingredientes.filter(
        (ingrediente) =>
          !idsSeleccionados.has(ingrediente.id_ingrediente) &&
          !nombresSeleccionados.has(
            ingrediente.nombre.toLocaleLowerCase('es-MX')
          )
      );

      const totalIngredientes = receta.ingredientes.length;

      const porcentajeCoincidencia = totalIngredientes === 0
        ? 0
        : Math.round(
            (ingredientesDisponibles.length / totalIngredientes) * 10000
          ) / 100;

      return {
        id_receta: receta.id_receta,
        nombre: receta.nombre,
        descripcion: receta.descripcion,
        tiempo_preparacion: receta.tiempo_preparacion,
        dificultad: receta.dificultad,
        imagen: receta.imagen,
        porcentajeCoincidencia,
        ingredientesDisponibles,
        ingredientesFaltantes,
      };
    });

    recomendaciones.sort(
      (a, b) =>
        b.porcentajeCoincidencia - a.porcentajeCoincidencia ||
        a.nombre.localeCompare(b.nombre, 'es')
    );

    return res.json({
      total: recomendaciones.length,
      recomendaciones,
    });
  } catch (error) {
    console.error('Error al generar recomendaciones:', error);

    return res.status(500).json({
      mensaje: 'Error al generar las recomendaciones',
    });
  }
});

export default router;