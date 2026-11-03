import { fileURLToPath } from 'node:url';
import { pool } from '../config/db.js';

type Ingrediente = { nombre: string; cantidad: string; categoria: string };
type Receta = {
  nombre: string;
  descripcion: string;
  categoria: string;
  tiempoMin: number;
  porciones: number;
  dificultad: string;
  emoji: string;
  consejo?: string;
  ingredientes: Ingrediente[];
  utensilios: string[];
  equipos: string[];
  preparacion: string[];
  fuenteUrl?: string;
};

const rutaCatalogo = fileURLToPath(
  new URL('../../../mobile/src/data/recetas.ts', import.meta.url),
);

async function sembrarRecetas() {
  const { RECETAS } = (await import(rutaCatalogo)) as {
    RECETAS: Receta[];
  };
  const cliente = await pool.connect();

  try {
    await cliente.query('BEGIN');
    await cliente.query(`
      CREATE TABLE IF NOT EXISTS recetas (
        id_receta SERIAL PRIMARY KEY,
        nombre VARCHAR(160) NOT NULL,
        descripcion TEXT,
        categoria VARCHAR(40) NOT NULL DEFAULT 'Comida',
        tiempo_preparacion INTEGER,
        porciones INTEGER NOT NULL DEFAULT 4,
        dificultad VARCHAR(40),
        imagen TEXT,
        emoji VARCHAR(16),
        consejo TEXT
      );
      CREATE TABLE IF NOT EXISTS ingredientes (
        id_ingrediente SERIAL PRIMARY KEY,
        nombre VARCHAR(160) NOT NULL,
        categoria VARCHAR(80)
      );
      CREATE TABLE IF NOT EXISTS receta_ingrediente (
        id_receta INTEGER NOT NULL REFERENCES recetas(id_receta) ON DELETE CASCADE,
        id_ingrediente INTEGER NOT NULL REFERENCES ingredientes(id_ingrediente) ON DELETE CASCADE,
        cantidad TEXT,
        PRIMARY KEY (id_receta, id_ingrediente)
      );
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS preparacion TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS utensilios TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS equipos TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS fuente_url TEXT;
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS categoria VARCHAR(40) NOT NULL DEFAULT 'Comida';
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS porciones INTEGER NOT NULL DEFAULT 4;
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS emoji VARCHAR(16);
      ALTER TABLE recetas ADD COLUMN IF NOT EXISTS consejo TEXT;
      ALTER TABLE ingredientes ADD COLUMN IF NOT EXISTS categoria VARCHAR(80);
      ALTER TABLE receta_ingrediente ADD COLUMN IF NOT EXISTS cantidad TEXT;
      CREATE UNIQUE INDEX IF NOT EXISTS ux_recetas_nombre ON recetas (nombre);
      CREATE UNIQUE INDEX IF NOT EXISTS ux_ingredientes_nombre ON ingredientes (nombre);
      CREATE UNIQUE INDEX IF NOT EXISTS ux_receta_ingrediente_pair ON receta_ingrediente (id_receta, id_ingrediente);
      CREATE TABLE IF NOT EXISTS opiniones (
        id_opinion SERIAL PRIMARY KEY,
        id_receta INTEGER REFERENCES recetas(id_receta) ON DELETE SET NULL,
        nombre_receta VARCHAR(160),
        nombre_usuario VARCHAR(80) NOT NULL DEFAULT 'Anónimo',
        calificacion SMALLINT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
        comentario VARCHAR(600) NOT NULL,
        creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS ix_opiniones_receta_fecha ON opiniones (id_receta, creado_en DESC);
      CREATE TABLE IF NOT EXISTS mensajes_contacto (
        id_mensaje SERIAL PRIMARY KEY,
        nombre VARCHAR(80) NOT NULL,
        correo VARCHAR(254),
        mensaje VARCHAR(1200) NOT NULL,
        estado VARCHAR(20) NOT NULL DEFAULT 'nuevo',
        creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS ix_contacto_estado_fecha ON mensajes_contacto (estado, creado_en DESC);
    `);

    for (const receta of RECETAS) {
      const guardada = await cliente.query<{ id_receta: number }>(
        `INSERT INTO recetas
          (nombre, descripcion, categoria, tiempo_preparacion, porciones, dificultad, emoji, consejo, preparacion, utensilios, equipos, fuente_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (nombre) DO UPDATE SET
          descripcion = EXCLUDED.descripcion,
          categoria = EXCLUDED.categoria,
          tiempo_preparacion = EXCLUDED.tiempo_preparacion,
          porciones = EXCLUDED.porciones,
          dificultad = EXCLUDED.dificultad,
          emoji = EXCLUDED.emoji,
          consejo = EXCLUDED.consejo,
          preparacion = EXCLUDED.preparacion,
          utensilios = EXCLUDED.utensilios,
          equipos = EXCLUDED.equipos,
          fuente_url = EXCLUDED.fuente_url
         RETURNING id_receta`,
        [
          receta.nombre,
          receta.descripcion,
          receta.categoria,
          receta.tiempoMin,
          receta.porciones,
          receta.dificultad,
          receta.emoji,
          receta.consejo ?? null,
          receta.preparacion,
          receta.utensilios,
          receta.equipos,
          receta.fuenteUrl,
        ],
      );
      const idReceta = guardada.rows[0].id_receta;

      for (const ingrediente of receta.ingredientes) {
        const guardado = await cliente.query<{ id_ingrediente: number }>(
          `INSERT INTO ingredientes (nombre, categoria)
           VALUES ($1, $2)
           ON CONFLICT (nombre) DO UPDATE SET categoria = EXCLUDED.categoria
           RETURNING id_ingrediente`,
          [ingrediente.nombre, ingrediente.categoria],
        );

        await cliente.query(
          `INSERT INTO receta_ingrediente (id_receta, id_ingrediente, cantidad)
           VALUES ($1, $2, $3)
           ON CONFLICT (id_receta, id_ingrediente) DO UPDATE SET cantidad = EXCLUDED.cantidad`,
          [idReceta, guardado.rows[0].id_ingrediente, ingrediente.cantidad],
        );
      }
    }

    await cliente.query('COMMIT');
    console.log(`Catálogo cargado: ${RECETAS.length} recetas mexicanas.`);
  } catch (error) {
    await cliente.query('ROLLBACK');
    console.error('No se pudo cargar el catálogo de recetas:', error);
    process.exitCode = 1;
  } finally {
    cliente.release();
    await pool.end();
  }
}

void sembrarRecetas();
