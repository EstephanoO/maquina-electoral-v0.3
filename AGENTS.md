# AGENTS

Marco de trabajo para desarrollo con agentes y skills en este repositorio.

## Principios
- Arquitectura modular y agnostica: no depender de DB especifica.
- Prioridad funcional: onboarding completo antes de nuevos flujos.
- Tipos y validaciones con Zod compartidos en toda la app.
- UI coherente, moderna y estilo war room (negro base, azul y dorado).
- Documentar decisiones no obvias en el contexto del codigo.

## Sistema de agentes
Cada tarea debe indicar que AGENT la atiende. Si no aplica, usar este AGENT general.

### Mapa de agentes
- `src/db/AGENTS.md`: datos, persistencia, queries y contratos.
- `src/auth/AGENTS.md`: login, sesion y roles.
- `src/onboarding/AGENTS.md`: flujo de onboarding y validaciones.
- `src/ui/AGENTS.md`: UI, componentes, dashboards y estilo.
- `src/pr/AGENTS.md`: flujo de ramas, commits y despliegue.

### Reglas de uso
- Tareas en `src/app/api/` deben coordinarse con el AGENT del dominio (db/auth/onboarding).
- Cambios en dashboards (`src/app/dashboard/` y `src/app/dashboard/admin/`) siguen UI AGENT y validaciones del dominio correspondiente.
- Evitar solapar responsabilidades: una tarea = un AGENT principal.

## Reglas de datos
- Persistencia actual: `localStorage` con adaptador en `src/onboarding/storage.ts`.
- Capa de acceso agnostica para facilitar migracion a DB real.
- No acceder a `localStorage` fuera de la capa de datos.
- Validar lecturas con Zod antes de consumir en UI.

## Tipos y validacion
- Esquemas Zod como fuente unica de verdad.
- Exportar tipos inferidos para UI, rutas y servicios.
- Evitar duplicar tipos frontend/backend.

## UI y estilos
- Variables de color y tipografia en `src/app/globals.css`.
- Consistencia en layouts, espaciado y contraste.
- Estilo war room: negro dominante con acentos azul/dorado.
- Validacion visual en desktop y mobile usando `chrome-devtools`.

## Onboarding (objetivo principal)
- Pasos claros, progresivos y medibles.
- Flujo actual: rol -> nivel politico -> rol politico -> partido -> datos candidato -> estrategia principal -> combinacion si MIXTO -> dashboard.
- Persistir en `localStorage` y redirigir a `src/app/dashboard/page.tsx`.

## Estructura clave
- `src/app/onboarding/`: pagina del flujo.
- `src/app/dashboard/`: dashboard cliente.
- `src/app/dashboard/admin/`: dashboard admin.
- `src/app/login/`: login basico.
- `src/app/api/`: rutas API por dominio.
- `src/onboarding/`: orquestacion y tipos.
- `src/ui/`: componentes UI y wrappers.
- `src/db/`: adaptadores y datasets.
- `src/auth/`: storage y helpers de sesion.

## Skills disponibles
- `nextjs-16`, `react-19`, `zod-4`, `tailwind-4`, `typescript`, `neon-postgres`, `vercel-deploy`, `playwright`, `zustand-5`, `maplibre`, `apify`, `gemini`.
- Usar el skill correspondiente cuando la tarea lo requiera (schemas, estado, deploy, etc.).
