# Guía de Deployment en Vercel

## Configuración de la Base de Datos

Esta aplicación requiere una base de datos PostgreSQL en producción. Sigue estos pasos para configurarla:

### 1. Crear una Base de Datos PostgreSQL

Opciones recomendadas:
- **Vercel Postgres**: Integración directa desde el dashboard de Vercel
- **Neon**: Servicio PostgreSQL serverless gratuito
- **Supabase**: PostgreSQL con interfaz amigable
- **Railway**: Servicio de hosting con PostgreSQL

### 2. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Navega a **Settings > Environment Variables**
3. Añade la siguiente variable:

```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
```

Reemplaza con tu connection string real.

### 3. Ejecutar Migraciones

Si usas Vercel Postgres, puedes ejecutar las migraciones desde el terminal local:

```bash
npx prisma migrate deploy
```

O puedes crear las tablas manualmente ejecutando este SQL:

```sql
CREATE TABLE "Piece" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "coverArt" TEXT,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Piece_pkey" PRIMARY KEY ("id")
);
```

### 4. Redeploy

Después de configurar las variables de entorno, haz un redeploy del proyecto para que tome los cambios.

## Problemas Comunes

### Página en Blanco

Si la página aparece en blanco, probablemente la variable `DATABASE_URL` no está configurada. La aplicación ahora mostrará un mensaje de error apropiado en lugar de quedar en blanco.

### Errores de Conexión

Asegúrate de que:
- La connection string es correcta
- La base de datos acepta conexiones desde cualquier IP (0.0.0.0/0) o específicamente desde Vercel
- Las credenciales son válidas

## Desarrollo Local

Para desarrollo local, usa SQLite:

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# El .env debe contener:
DATABASE_URL="file:./prisma/dev.db"

# Ejecuta las migraciones
npx prisma migrate dev

# Llena la base de datos con datos de ejemplo
npm run prisma:generate
node prisma/seed.cjs
```
