# UI AGENTS

## Alcance
- Sistema visual, componentes y dashboards.
- Estilo war room y consistencia visual.

## Responsabilidades
- Componentes reutilizables y layout consistente.
- Dashboards cliente/admin en `src/app/dashboard/`.
- Estados vacios, errores y loading claros.

## Reglas de implementacion
- Tokens en `src/app/globals.css`.
- Negro dominante con acentos azul/dorado, sin sobrecargar.
- Evitar patrones genericos; UI deliberada y legible.
- Verificar desktop y mobile con `chrome-devtools`.

## Tipos y validacion
- Consumir tipos compartidos; no duplicar modelos.

## Entregables
- Ajustes de UI y accesibilidad.
- Componentes del onboarding y dashboards coherentes.
- Justificacion de decisiones visuales no obvias.

## Estructura del modulo
- `src/ui/onboarding/` componentes del flujo.
- `src/ui/auth/` wrappers/guardias.

## Skills
- `react-19`, `nextjs-16`, `tailwind-4` (si aplica).

## Resumen esperado
- Cambios visuales, impacto en consistencia y UX.
