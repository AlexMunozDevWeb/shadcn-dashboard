# Shadcn Dashboard

Dashboard de ejemplo construido con Next.js App Router, React, TypeScript, Tailwind CSS y componentes shadcn/ui. Incluye una página principal de dashboard, ejemplos de componentes, temas visuales y pantallas de autenticación.

## Demo

- [Dashboard](https://dashboard-admin-five-delta.vercel.app/dashboard)
- [Iniciar sesión](https://dashboard-admin-five-delta.vercel.app/auth/login)
- [Crear cuenta](https://dashboard-admin-five-delta.vercel.app/auth/register)

## Requisitos

- Node.js compatible con Next.js 16.
- npm.
- PostgreSQL para la configuración de Better Auth.

## Instalación

Instala las dependencias:

```bash
npm install
```

Crea tu archivo local de variables de entorno:

```powershell
Copy-Item .env.template .env
```

Completa en `.env` las credenciales necesarias:

| Variable                                    | Uso                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| `DATABASE_URL`                              | Conexión PostgreSQL usada por Better Auth. La configuración actual habilita SSL. |
| `BETTER_AUTH_SECRET`                        | Secreto para firmar sesiones. Puedes generarlo con `openssl rand -base64 32`.    |
| `BETTER_AUTH_URL`                           | URL base de la aplicación; en local, `http://localhost:3000`.                    |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Credenciales OAuth de GitHub, si habilitas ese proveedor.                        |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Credenciales OAuth de Google, si habilitas ese proveedor.                        |
| `RESEND_API_KEY`                            | Clave API de Resend para enviar correos de verificación.                         |

La plantilla también incluye variables alternativas de PostgreSQL y `STITCH_API_KEY`. La configuración de Better Auth utiliza `DATABASE_URL`; las demás variables solo son necesarias si las usa otra herramienta o el entorno de despliegue. No compartas ni subas `.env` al repositorio.

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

## Autenticación

La configuración del servidor está en `src/modules/auth/lib/auth.ts`, el cliente en `src/modules/lib/auth-client.ts` y las rutas HTTP en `src/app/api/auth/[...all]/route.ts`.

Better Auth está configurado con PostgreSQL, correo y contraseña, verificación de correo y proveedores OAuth de GitHub y Google. Los correos de verificación se envían mediante Resend usando el remitente de prueba `onboarding@resend.dev`. No hay ningún dominio propio configurado: en este modo de prueba, Resend solo permite enviar al correo asociado a tu propia cuenta de Resend (por ejemplo, tu cuenta de Google/Gmail). Para enviar a otras direcciones, verifica un dominio propio en Resend y configura un remitente de ese dominio.

Las pantallas `/auth/login` y `/auth/register` utilizan el cliente de Better Auth. Las rutas `/dashboard/*` validan la sesión en el layout del servidor y redirigen a `/auth/login` cuando no existe una sesión activa.

Si `NEXT_PUBLIC_APP_URL` no está definida, el cliente usa el mismo origen que la aplicación. En despliegues con dominios separados, configura esta variable con la URL pública del servidor de autenticación.

Para generar o aplicar el esquema de Better Auth, ejecuta desde la raíz del proyecto:

```bash
npx @better-auth/cli generate --config ./src/modules/auth/lib/auth.ts
npx @better-auth/cli migrate --config ./src/modules/auth/lib/auth.ts
```

La opción `--config` apunta al archivo de configuración, ubicado en `src/modules/auth/lib/` y no en la raíz.

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
