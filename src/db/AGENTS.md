# DB AGENTS

## Alcance
- Capa de datos y persistencia local.
- Modelos y repositorios agnosticos a DB.
- Migraciones futuras desde localStorage a DB real.

## Responsabilidades
- Definir interfaz de acceso a datos y contratos de repositorio.
- Implementar adaptadores de persistencia (localStorage ahora, DB despues).
- Garantizar serializacion/deserializacion consistente.
- Integrar datasets locales (ej. partidos) de forma estable.

## Reglas de implementacion
- No leer/escribir localStorage fuera de esta capa.
- Exportar funciones puras para CRUD con dependencias inyectables.
- Evitar acoplar la capa de datos con UI o rutas.
- Manejar errores con resultados tipados (no throw en UI).
- Preferir constantes/versionadas para catálogos (ej. `src/db/constants/partidos2.ts`).

## Tipos y validacion
- Usar Zod para esquemas de datos compartidos.
- Exponer tipos inferidos y reutilizarlos en UI/servicios.

## Entregables
- Estructura de carpeta: `src/db/`.
- Interfaces de repositorios y adaptadores.
- Adaptadores que reflejen exportaciones de onboarding.
- Tests unitarios si aplica.

## Estructura del modulo
- `src/db/auth.ts` auth basico con localStorage.
- `src/db/sql.ts` pool Postgres para Neon.
- `src/db/queries/` queries para usuarios y onboarding.
- `src/db/constants/partidos2.ts` catalogo de partidos.
- `src/db/constants/padron.ts` dataset padron nacional.

## Skills
- `zod-4`
- `typescript`

## Resumen esperado
- Cambios en contratos, adaptadores y validaciones.
- Riesgos de migracion y puntos de acoplamiento.
