# UI AGENTS

## Alcance
- Sistema visual, componentes y estilos.
- Definicion de tokens y temas.
- Layouts y consistencia de UX.

## Responsabilidades
- Diseñar componentes reutilizables y escalables.
- Mantener lenguaje visual war room (negro base, zinc).
- Coordinar interaccion con onboarding y dashboard.

## Reglas de implementacion
- Definir colores y tipografia en `src/app/globals.css`.
- Mantener contraste y legibilidad en negro base.
- Usar azul y dorado como acento, sin sobrecargar.
- Evitar patrones genericos; interfaces deliberadas.
- Verificar UI en desktop y mobile con `chrome-devtools`.

## Tipos y validacion
- Consumir tipos compartidos; no duplicar modelos.

## Entregables
- Tokens CSS y componentes base.
- Documentar decisiones de estilo no obvias.
- UI del onboarding y dashboard coherentes.
- Ajustes de accesibilidad (focus/ARIA) y estados vacíos.

## Estructura del modulo
- `src/ui/onboarding/` componentes del flujo.
- `src/ui/shadcn/` primitives UI.
- `src/ui/auth/` guardias y wrappers para rutas.

## Skills
- `react-19`
- `nextjs-16`
- `tailwind-4` (si aplica)

## Resumen esperado
- Cambios visuales y justificacion.
- Impacto en consistencia del sistema.
