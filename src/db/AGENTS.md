# DB AGENTS

## Alcance
- Capa de datos y persistencia.
- Queries Postgres y adaptadores agnosticos.

## Responsabilidades
- Contratos de acceso a datos y serializacion consistente.
- Adaptadores de persistencia (localStorage ahora, DB despues).
- Integracion de datasets locales estables.

## Reglas de implementacion
- No leer/escribir localStorage fuera de la capa de datos.
- Queries en `src/db/queries/` con tipos claros.
- Operaciones criticas en transaccion cuando aplique.
- Evitar acoplar datos con UI o rutas.

## Tipos y validacion
- Zod para esquemas compartidos.
- Exponer tipos inferidos para UI/servicios.

## Estructura del modulo
- `src/db/sql.ts` pool Postgres.
- `src/db/queries/` usuarios/onboarding/admin.
- `src/db/constants/` catalogos (partidos, padron).

## Entregables
- CRUD consistente y resultados tipados.
- Cambios en contratos y riesgos de migracion.

## Skills
- `zod-4`, `typescript`, `neon-postgres` (si aplica).
