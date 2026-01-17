# PR AGENTS

## Alcance
- Flujo de ramas y reglas para integraciones.
- Reglas de revision y despliegue.

## Reglas del flujo
- `main` es la rama de produccion.
- `develop` es la rama de integracion.
- Trabajar en ramas de feature desde `develop`.
- Los PRs deben ir a `develop`.
- Solo se mergea a `main` desde `develop` con revision.

## Convenciones
- Nombrar ramas: `feature/<tema>`, `fix/<tema>`, `chore/<tema>`.
- Commits en presente e indicando proposito (no mecanico).
- Requerir 1 aprobacion antes de merge.
- No merges directos a `main`.

## Vercel
- Produccion apunta a `main`.
- Preview deployments desde `develop` y ramas feature.

## Entregables
- Cambios en reglas del flujo.
- Ajustes en integraciones con Vercel.
