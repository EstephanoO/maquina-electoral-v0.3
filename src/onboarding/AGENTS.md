# ONBOARDING AGENTS

## Alcance
- Flujo inicial, pasos y validaciones.
- Persistencia del progreso y post-onboarding.

## Responsabilidades
- Pasos claros, progresivos y medibles.
- Integrar datos con capa DB.
- Coordinar UI con estilo war room.

## Reglas de implementacion
- Onboarding es prioridad funcional.
- Validar payloads con Zod.
- Guardar estado del flujo en capa de datos.
- Redirigir a dashboard al completar.

## Flujo actual
- rol -> nivel politico -> rol politico -> partido -> datos candidato -> estrategia principal -> combinacion si MIXTO -> dashboard.

## Estructura del modulo
- `src/onboarding/types.ts` esquemas y tipos.
- `src/onboarding/steps.ts` definicion del flujo.
- `src/onboarding/storage.ts` persistencia local.
- `src/onboarding/transformer.ts` mapeo a plan.

## Entregables
- Cambios en pasos, validaciones y progreso.
- Riesgos para conversion o claridad del flujo.

## Skills
- `react-19`, `nextjs-16`, `zod-4`.
