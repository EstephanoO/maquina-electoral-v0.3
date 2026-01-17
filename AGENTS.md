# AGENTS

Este archivo define el marco de trabajo para agentes y desarrollo en este repositorio.

## Principios
- Mantener una arquitectura modular y agnostica: la app no debe depender de una DB especifica.
- La primera prioridad funcional es el onboarding; cualquier flujo nuevo debe integrarse con esto.
- Tipos y validaciones se definen con Zod y se comparten en toda la app.
- UI coherente: lenguaje visual moderno, profesional, estilo war room (negro base, azul y dorado como contraste).
- Evitar deuda tecnica innecesaria: documentar decisiones no obvias en contexto del codigo.

## Subagentes disponibles
Usa los AGENTS definidos en `src/` para delegar tareas sin solaparse:
- `src/db/AGENTS.md` para almacenamiento, datos y persistencia local.
- `src/ui/AGENTS.md` para diseno visual, componentes y reglas de estilo.
- `src/onboarding/AGENTS.md` para flujos de onboarding y experiencia inicial.

Regla: cada tarea debe indicar que subagente la atiende. Si no aplica, usa este AGENTS general.

## Reglas de datos
- Persistencia actual: `localStorage` con adaptador en `src/onboarding/storage.ts`.
- Capa de acceso agnostica para facilitar migracion a una DB real.
- No acceder a `localStorage` directamente fuera de la capa de datos.
- Validar lecturas con Zod antes de consumir en UI (ej. dashboard).

## Tipos y validacion
- Todas las estructuras compartidas se definen con Zod.
- Exportar tipos inferidos de Zod y reutilizarlos en componentes, rutas y servicios.
- Evitar duplicar tipos en frontend/backend.

## UI y estilos
- Definir variables de color y tipografia en `globals.css`.
- Mantener consistencia en layouts, espaciado y contraste.
- Estilo war room: negro dominante con acentos azul/dorado.

## Flujo de desarrollo con feedback
- Usar `chrome-devtools` MCP para validar flujos de UI en navegador.
- Cada iteracion de UI debe incluir verificacion visual rapida en desktop y mobile.
- Guardar hallazgos en notas breves dentro del PR/commit o en la tarea correspondiente.

## Onboarding (primer objetivo)
- Todas las decisiones de informacion, UI y flujos deben priorizar el onboarding.
- Definir pasos claros, progresivos y medibles.
- Flujo actual: rol -> nivel politico -> rol politico -> partido -> datos candidato -> estrategia principal -> combinacion si MIXTO -> dashboard.
- Debe persistir en `localStorage` y redirigir a `src/app/dashboard/page.tsx`.

## Estructura del proyecto
- `src/app/onboarding/` pagina del flujo principal.
- `src/app/dashboard/` dashboard cliente.
- `src/app/dashboard/admin/` dashboard admin.
- `src/app/login/` login basico.
- `src/onboarding/` orquestacion, tipos y pasos.
- `src/ui/onboarding/` componentes UI del flujo.
- `src/ui/auth/` guardias y helpers de autenticacion.
- `src/db/` adaptadores de datos y catalogos.

## Archivos clave
- `src/onboarding/steps.ts` definicion del flujo.
- `src/onboarding/types.ts` esquemas Zod compartidos.
- `src/onboarding/storage.ts` persistencia en localStorage.
- `src/db/constants/partidos2.ts` catalogo partidos con logos.
- `src/db/constants/padron.ts` padron para contexto del dashboard.
- `src/db/auth.ts` auth basico con localStorage.

## Skills
- `nextjs-16` para App Router y Server/Client Components.
- `react-19` para patrones actuales de React.
- `zod-4` para validacion y tipos compartidos.
- `tailwind-4` si se usa Tailwind; si no, mantener CSS escalable.
