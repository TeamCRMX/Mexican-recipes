import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import recetasRoutes from './routes/recetas.routes.js';
import ingredientesRoutes from './routes/ingredientes.routes.js';
import recetaIngredientesRoutes from './routes/receta-ingredientes.routes.js';
import recomendacionesRoutes from './routes/recomendaciones.routes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', healthRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/ingredientes', ingredientesRoutes);
app.use('/api/recetas', recetaIngredientesRoutes);
app.use('/api/recomendaciones', recomendacionesRoutes);

app.get('/', (_req, res) => {
  res.json({
    mensaje: 'API de Recetas Mexicanas funcionando correctamente',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    estado: 'correcto',
    mensaje: 'El servidor está funcionando',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});