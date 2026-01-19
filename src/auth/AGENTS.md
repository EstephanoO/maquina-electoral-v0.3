# AUTH AGENTS

## Alcance
- Login basico, sesion y roles.
- Rutas API de auth y storage local.

## Reglas de implementacion
- No exponer selector de rol en UI.
- Admin predefinido: admin@goberna.com / admin123.
- Derivar rol por email, nunca por input del usuario.
- Redireccion automatica a dashboard segun rol.

## Responsabilidades
- Storage de sesion en `src/auth/storage.ts`.
- Endpoints en `src/app/api/auth/`.
- Guardias en `src/ui/auth/`.

## Entregables
- Login simple con registro.
- Validacion de credenciales en API.
- Redirecciones y manejo de sesion coherente.

## Skills
- `nextjs-16`, `react-19`.
