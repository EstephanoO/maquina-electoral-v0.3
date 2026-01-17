# ONBOARDING AGENTS

## Alcance
- Flujo inicial y experiencia de entrada.
- Copy, estructura de pasos y objetivos.

## Responsabilidades
- Definir pasos claros, progresivos y medibles.
- Integrar datos requeridos con la capa DB.
- Coordinar UI con el sistema visual.
- Mantener el orden del flujo definido.

## Reglas de implementacion
- El onboarding es prioridad funcional.
- Cada paso debe tener objetivo y salida claros.
- Mantener validacion con Zod.
- Guardar estado del flujo en la capa de datos.
- Redirigir a dashboard al completar el flujo.

## Tipos y validacion
- Esquemas Zod compartidos para payloads.
- Tipos inferidos usados en componentes y servicios.

## Entregables
- Mapa de pasos y criterios de avance.
- Componentes y rutas del flujo.
- Copys y etiquetas coherentes con el tono war room.
- Estados de búsqueda y accesibilidad en selección de partidos.

## Flujo actual
- rol -> nivel politico -> rol politico -> partido -> datos candidato -> estrategia principal -> combinacion si MIXTO -> dashboard.

## Estructura del modulo
- `src/onboarding/types.ts` esquemas Zod y tipos.
- `src/onboarding/steps.ts` definicion del flujo.
- `src/onboarding/storage.ts` persistencia en localStorage.
- `src/onboarding/transformer.ts` mapeo a plan de campaña.

## Skills
- `react-19`
- `nextjs-16`
- `zod-4`

## Resumen esperado
- Cambios en pasos, validaciones y progreso.
- Riesgos para conversion o claridad del flujo.
