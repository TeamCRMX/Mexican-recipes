# Recetas mexicanas

Aplicación para encontrar qué cocinar con los ingredientes disponibles. Recomienda platillos de la gastronomía mexicana, ordenados por coincidencia, y muestra cantidades, faltantes, preparación, utensilios y equipo.

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

   El seed crea las tablas si hacen falta, agrega los campos de preparación y equipo y actualiza las 18 recetas. Se puede volver a ejecutar sin duplicar registros.

3. En otra terminal, inicia la app:

   ```powershell
   cd mobile
   npm ci
   Copy-Item .env.example .env
   npx expo start
   ```

   Expo detecta la dirección del servidor de desarrollo cuando se usa la misma red. Si se configura `EXPO_PUBLIC_API_URL`, indica la dirección alcanzable del backend; en un teléfono físico usa la IP local de la computadora, por ejemplo `http://192.168.1.20:3000`.

El servidor usa las variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`. Para Neon, define `USE_NEON=true` y `DATABASE_URL`.

## API

- `GET /api/health`: conexión con PostgreSQL.
- `GET /api/recetas`: catálogo resumido.
- `GET /api/recetas/:id`: detalle con ingredientes y cantidades.
- `GET /api/ingredientes`: ingredientes disponibles.
- `POST /api/recomendaciones`: recibe `{ "ingredientes": ["Aguacate", "Jitomate"] }` y devuelve coincidencia, ingredientes disponibles y faltantes, preparación, utensilios y equipo.

## Fuentes del catálogo

Las recetas se resumieron y adaptaron para mantener una lista de ingredientes seleccionable. Las fichas enlazan a sus referencias cuando existe una página concreta.

- [Cocina Fácil: tinga de pollo](https://www.cocinafacil.com.mx/recetas/comida-mexicana-como-hacer-tacos-caseros-de-tinga-de-pollo), [enfrijoladas](https://www.cocinafacil.com.mx/recetas/como-hacer-enfrijoladas), [pozole rojo](https://www.cocinafacil.com.mx/recetas/pozole-rojo-receta), [tacos dorados de papa](https://www.cocinafacil.com.mx/recetas/como-hacer-tacos-dorados-de-papa), [calabacitas a la mexicana](https://www.cocinafacil.com.mx/recetas/calabacitas-a-la-mexicana), [esquites](https://www.cocinafacil.com.mx/recetas/receta-para-hacer-unos-autenticos-esquites), [arroz rojo](https://www.cocinafacil.com.mx/recetas/arroz-rojo-delicioso) y [tacos de pollo](https://www.cocinafacil.com.mx/recetas/tacos-de-pollo-con-sabor-tradicional).
- [Recetas Nestlé: chilaquiles rojos](https://www.recetasnestle.com.mx/recetas/chilaquiles-rojos), [chilaquiles verdes](https://www.recetasnestle.com.mx/recetas/chilaquiles-verdes), [enchiladas verdes](https://www.recetasnestle.com.mx/recetas/enchiladas-verdes-facil) y [huevos ahogados a la mexicana](https://www.recetasnestle.com.mx/index.php/recetas/huevos-ahogados-mexicana).
- [Secretaría de Agricultura: sopa de tortilla](https://www.gob.mx/agricultura/articulos/sopa-de-tortilla-manjar-mexicano-inigualable?idiom=es).
- [Larousse Cocina: guacamole](https://laroussecocina.mx/palabra/guacamole/).
