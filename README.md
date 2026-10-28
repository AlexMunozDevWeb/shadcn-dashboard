# Shadcn Dashboard

Dashboard de ejemplo construido con Next.js App Router, React, TypeScript, Tailwind CSS y componentes shadcn/ui. Incluye una página principal de dashboard, ejemplos de componentes, temas visuales y pantallas de autenticación.

## Requisitos

- Node.js compatible con Next.js 16.
- npm.
- PostgreSQL con una cadena de conexión disponible para la aplicación.

## Instalación

Instala las dependencias:

```bash
npm install
```

Crea tu archivo local de variables de entorno a partir de la plantilla:

```powershell
Copy-Item .env.template .env
```

Completa en `.env` las credenciales necesarias:

- `DATABASE_URL`: conexión PostgreSQL usada por Better Auth. La configuración actual habilita SSL.
- `BETTER_AUTH_SECRET`: secreto para firmar sesiones. Puedes generar uno con `openssl rand -base64 32`.
- `BETTER_AUTH_URL`: URL base de la aplicación; en local, `http://localhost:3000`.
- `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET`, y/o `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`, para habilitar los proveedores OAuth correspondientes.

La plantilla también incluye variables alternativas de PostgreSQL y `STITCH_API_KEY`. La configuración de la aplicación lee `DATABASE_URL`; configura las demás solo si la herramienta o el entorno que utilizas las requiere. No subas el archivo `.env` ni secretos al repositorio.

## Desarrollo

Inicia el servidor local:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas principales

- `/`: página inicial.
- `/dashboard`: dashboard principal.
- `/dashboard/*`: páginas de demostración de componentes y patrones de interfaz.
- `/auth/login`: inicio de sesión.
- `/auth/register`: registro.
- `/api/auth/*`: endpoint de Better Auth.

Las pantallas de inicio de sesión y registro incluyen acciones de demostración; su interfaz no está conectada todavía al cliente de autenticación.

## Better Auth y PostgreSQL

La configuración del servidor está en `src/modules/auth/lib/auth.ts`, el cliente en `src/modules/lib/auth-client.ts` y las rutas HTTP en `src/app/api/auth/[...all]/routes.ts`.

Ejecuta estos comandos desde la raíz del proyecto. La opción `--config` apunta al archivo de configuración, que no está en la raíz:

```bash
npx @better-auth/cli generate --config ./src/modules/auth/lib/auth.ts
npx @better-auth/cli migrate --config ./src/modules/auth/lib/auth.ts
```

## Comprobaciones

```bash
npm run lint
npm run build
```

## Estructura del proyecto

```text
src/
  app/       Rutas, layouts y páginas del App Router
  modules/   Módulos de autenticación, componentes, utilidades y tipos
public/      Recursos estáticos
```
