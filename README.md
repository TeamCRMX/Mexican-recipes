# Recetas mexicanas

Aplicación para descubrir qué cocinar con los ingredientes disponibles. Incluye 29 recetas mexicanas en seis categorías, búsqueda y filtros combinables, recomendaciones por coincidencia, pasos interactivos, opiniones y un formulario de contacto conectado a PostgreSQL.

## Estructura

- `mobile/`: aplicación Expo y React Native. El catálogo local permite buscar recetas aunque el API no esté disponible.
- `backend/`: API REST en Express y TypeScript, con persistencia en PostgreSQL.
- `mobile/src/data/recetas.ts`: catálogo que usa la app y que carga el comando de seed del backend.

## Preparar y ejecutar

1. Configura PostgreSQL local o una base Neon. En `backend/`, copia `.env.example` a `.env` y completa las credenciales.
2. Instala las dependencias del servidor y carga el catálogo:

   ```powershell
   cd backend
   npm ci
   npm run seed
   npm run dev
   ```

   El seed crea o actualiza las tablas necesarias, agrega los campos de categoría, porciones y preparación, y carga las 29 recetas. También prepara las tablas para opiniones y mensajes de contacto. Se puede volver a ejecutar sin duplicar recetas ni ingredientes.

3. En otra terminal, inicia la app:

   ```powershell
   cd mobile
   npm ci
   Copy-Item .env.example .env
   npx expo start
   ```

   Expo detecta la dirección del servidor de desarrollo cuando se usa la misma red. Si se configura `EXPO_PUBLIC_API_URL`, indica la dirección alcanzable del backend; en un teléfono físico usa la IP local de la computadora, por ejemplo `http://192.168.1.20:3000`.

El servidor usa las variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`. Para Neon, define `USE_NEON=true` y `DATABASE_URL`.

## Desplegar el backend en Render con Neon

El archivo `render.yaml` configura el servicio Node dentro de `backend/`, usa `/api/health` como verificación y solicita `DATABASE_URL` sin guardar credenciales en Git. Antes de vincularlo como Blueprint, confirma en Render que el servicio existente tenga el nombre `mexican-recipes`; si su nombre es distinto, actualiza ese campo para que el Blueprint corresponda al servicio correcto y no cree otro.

1. En Neon, abre la rama de producción y copia la cadena de conexión PostgreSQL (preferentemente la opción pooled).
2. En Render, conecta el repositorio y la rama que quieres publicar. Revisa el Blueprint `render.yaml` y configura `DATABASE_URL` con la cadena de Neon. `USE_NEON=true` habilita esa conexión; Render asigna `PORT` automáticamente.
3. Cuando el servicio compile y esté disponible, ejecuta una vez `npm run seed` desde `backend/` con el entorno conectado a la base Neon. El comando crea las tablas e índices y carga/actualiza recetas, opiniones y contacto. El seed es transaccional e idempotente.
4. Comprueba `https://mexican-recipes.onrender.com/api/health` y verifica que la respuesta indique conexión exitosa con PostgreSQL. En `mobile/.env.production`, `EXPO_PUBLIC_API_URL` ya apunta a ese backend.

No publiques `DATABASE_URL` en Git ni la compartas en Jira. Si el servicio de Render existente tiene otro dominio, actualiza `EXPO_PUBLIC_API_URL` para que coincida.

## API

- `GET /api/health`: conexión con PostgreSQL.
- `GET /api/recetas`: catálogo resumido.
- `GET /api/recetas/:id`: detalle con ingredientes y cantidades.
- `GET /api/ingredientes`: ingredientes disponibles.
- `POST /api/recomendaciones`: recibe `{ "ingredientes": ["Aguacate", "Jitomate"] }` y devuelve coincidencia, ingredientes disponibles y faltantes, preparación, utensilios y equipo.
- `GET /api/opiniones`: opiniones y promedio general; acepta `?receta=Nombre` para filtrar una receta.
- `POST /api/opiniones`: publica una calificación de 1 a 5 y un comentario; puede asociarse a una receta o a la aplicación.
- `POST /api/contacto`: guarda el nombre, correo opcional y mensaje en `mensajes_contacto`.

Las opiniones y los mensajes se guardan en PostgreSQL. Los mensajes de contacto quedan disponibles para seguimiento en la tabla `mensajes_contacto`; el formulario no envía correo automáticamente.

## Fuentes del catálogo

Las recetas se resumieron y adaptaron para mantener una lista de ingredientes seleccionable. Las fichas enlazan a sus referencias cuando existe una página concreta.

- [Cocina Fácil: tinga de pollo](https://www.cocinafacil.com.mx/recetas/comida-mexicana-como-hacer-tacos-caseros-de-tinga-de-pollo), [enfrijoladas](https://www.cocinafacil.com.mx/recetas/como-hacer-enfrijoladas), [pozole rojo](https://www.cocinafacil.com.mx/recetas/pozole-rojo-receta), [tacos dorados de papa](https://www.cocinafacil.com.mx/recetas/como-hacer-tacos-dorados-de-papa), [calabacitas a la mexicana](https://www.cocinafacil.com.mx/recetas/calabacitas-a-la-mexicana), [esquites](https://www.cocinafacil.com.mx/recetas/receta-para-hacer-unos-autenticos-esquites), [arroz rojo](https://www.cocinafacil.com.mx/recetas/arroz-rojo-delicioso) y [tacos de pollo](https://www.cocinafacil.com.mx/recetas/tacos-de-pollo-con-sabor-tradicional).
- [Recetas Nestlé: chilaquiles rojos](https://www.recetasnestle.com.mx/recetas/chilaquiles-rojos), [chilaquiles verdes](https://www.recetasnestle.com.mx/recetas/chilaquiles-verdes), [enchiladas verdes](https://www.recetasnestle.com.mx/recetas/enchiladas-verdes-facil) y [huevos ahogados a la mexicana](https://www.recetasnestle.com.mx/index.php/recetas/huevos-ahogados-mexicana).
- [Secretaría de Agricultura: sopa de tortilla](https://www.gob.mx/agricultura/articulos/sopa-de-tortilla-manjar-mexicano-inigualable?idiom=es).
- [Larousse Cocina: guacamole](https://laroussecocina.mx/palabra/guacamole/).
- [Cocina Fácil: huevos rancheros](https://www.cocinafacil.com.mx/recetas/huevos-rancheros), [sopa de fideos](https://www.cocinafacil.com.mx/recetas/como-hacer-sopa-de-fideos) y [flan napolitano](https://www.cocinafacil.com.mx/recetas/flan-napolitano-receta-original).
- [Recetas Nestlé: molletes con pico de gallo](https://www.recetasnestle.com.mx/recetas/molletes-pico-gallo), [pico de gallo](https://www.recetasnestle.com.mx/recetas/pico-de-gallo), [arroz con leche](https://www.recetasnestle.com.mx/recetas/facil-arroz-leche), [ensalada de nopales](https://www.recetasnestle.com.mx/recetas/ensalada-nopales), [chiles poblanos rellenos](https://www.recetasnestle.com.mx/recetas/chiles-poblanos-rellenos), [sopes](https://www.recetasnestle.com.mx/recetas/sopes) y [pan de elote](https://www.recetasnestle.com.mx/recetas/pan-de-elote-al-horno).
