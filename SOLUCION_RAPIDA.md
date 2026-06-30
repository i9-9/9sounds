# 🚀 Solución Rápida - Página en Blanco en Vercel

## ✅ Build Exitoso
Tu deployment se construyó correctamente. El problema es que **falta la configuración de la base de datos**.

## 📋 Pasos para Arreglar (5 minutos)

### 1️⃣ Elige tu Base de Datos

#### **OPCIÓN A: Vercel Postgres** (Recomendado - 2 clicks)

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto **9sounds**
3. Click en **Storage** (en el menú lateral)
4. Click **Create Database** → Selecciona **Postgres**
5. Nombre: `9sounds-db`
6. Click **Create**

✅ **Vercel automáticamente conecta la variable `DATABASE_URL`**

#### **OPCIÓN B: Neon** (Gratis para siempre)

1. Ve a: https://neon.tech
2. Crea cuenta y nuevo proyecto
3. Copia el **Connection String**
4. En Vercel:
   - Settings → Environment Variables
   - Add: Name: `DATABASE_URL`, Value: (tu connection string)
   - Selecciona: Production ✓

---

### 2️⃣ Crear las Tablas

Ve al SQL editor de tu base de datos y ejecuta:

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

**Ubicación del SQL Editor:**
- **Vercel Postgres**: En Vercel Storage → tu database → Query tab
- **Neon**: En el dashboard de Neon → SQL Editor

---

### 3️⃣ Redeploy

1. Ve a: https://vercel.com/dashboard
2. Tu proyecto **9sounds**
3. **Deployments** tab
4. Click en el deployment más reciente → botón **︙** → **Redeploy**

⏱️ Espera ~1 minuto

---

### 4️⃣ Verificar

Ve a tu URL de Vercel. Deberías ver:
- ✅ Título: "Sonidos 9 - Reservorio"
- ✅ Mensaje: "No hay piezas musicales disponibles" (normal, DB vacía)
- ✅ Botón "INFO" funcional

---

## 🎵 Añadir tu Primera Pieza

1. Ve a: `tu-url.vercel.app/admin`
2. Password: `admin123`
3. Rellena el formulario
4. **IMPORTANTE**: Después de guardar, debes:
   - Subir el archivo de audio a `public/audio/` en tu repo
   - Subir la imagen a `public/images/` en tu repo
   - Hacer commit y push

---

## 🐛 Si Todavía no Funciona

1. Verifica los logs: Vercel → tu proyecto → **Logs** (Runtime Logs)
2. Busca errores con "Prisma" o "database"
3. Verifica que `DATABASE_URL` esté en Environment Variables

---

## 📝 Notas

- El build ya tiene manejo de errores, nunca quedará en blanco
- Si ves un error, será descriptivo y te dirá qué falta
- Next.js 15.3.2 tiene vulnerabilidades conocidas, considera actualizar después
