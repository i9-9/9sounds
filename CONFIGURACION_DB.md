# Configuración Rápida de Base de Datos para Vercel

## El Problema

Si tu deploy está en blanco, es porque **falta configurar la base de datos en Vercel**.

## Solución Rápida (5 minutos)

### Opción 1: Vercel Postgres (Recomendado - Más Fácil)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en la pestaña **Storage**
3. Click en **Create Database** → **Postgres**
4. Sigue el wizard (nombre: `9sounds-db`)
5. Una vez creada, Vercel **automáticamente** añade las variables de entorno necesarias
6. Ve a **Deployments** y haz click en **Redeploy** (botón con tres puntos → Redeploy)

### Opción 2: Neon (Gratis para siempre)

1. Ve a [Neon.tech](https://neon.tech) y crea una cuenta gratis
2. Crea un nuevo proyecto
3. Copia el **Connection String** (empieza con `postgresql://`)
4. En tu proyecto de Vercel:
   - Ve a **Settings** → **Environment Variables**
   - Añade: `DATABASE_URL` = tu connection string
   - Marca: **Production**, **Preview**, **Development**
5. Ve a **Deployments** y haz **Redeploy**

## Inicializar las Tablas

Después de configurar la variable de entorno, necesitas crear las tablas:

### Método 1: SQL directo (más rápido)

En tu proveedor de base de datos (Vercel Postgres o Neon), ejecuta:

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

### Método 2: Desde tu terminal local

```bash
# Asegúrate de tener la DATABASE_URL en tu .env local apuntando a producción
npx prisma db push
```

## Verificar que Funciona

1. Ve a tu URL de Vercel
2. Deberías ver la página con el título "Sonidos 9 - Reservorio"
3. Si no hay piezas, verás el mensaje "No hay piezas musicales disponibles"
4. Si todavía hay error, verás un mensaje de error descriptivo (no una página en blanco)

## Añadir tu Primera Pieza

1. Ve a `tu-url.vercel.app/admin`
2. Password: `admin123`
3. Añade una pieza de prueba

## ¿Necesitas Ayuda?

Revisa los logs de error en:
- **Vercel Dashboard** → Tu proyecto → **Logs**
- Busca errores relacionados con "database" o "prisma"
