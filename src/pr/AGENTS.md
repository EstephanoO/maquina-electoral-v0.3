# PR AGENTS

## Alcance
- Flujo de ramas, integraciones y despliegue.
- Convenciones de commits y verificacion de calidad.

## Reglas del flujo
- `main` es produccion (deploy al subir codigo).
- `develop` es integracion y capa de seguridad.
- Trabajar en ramas feature desde `develop`.
- Merge a `main` solo cuando el build y lint pasan.

## Convenciones
- Ramas: `feature/<tema>`, `fix/<tema>`, `chore/<tema>`.
- Commits en presente, describiendo proposito.
- Evitar merges directos a `main` sin validaciones.

## Verificacion antes de merge a main
- `npm run build` debe pasar.
- `npm run lint` sin errores (warnings aceptables con justificacion).

## Vercel
- Produccion apunta a `main`.
- Preview deployments desde `develop` y ramas feature.

## Entregables
- Cambios en reglas del flujo.
- Ajustes en integraciones de despliegue.
- Checklists de build/lint cuando aplique.
