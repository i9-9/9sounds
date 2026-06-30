import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { pieces as staticPieces } from '@/app/data/pieces';

// GET /api/pieces - Obtener todas las piezas
export async function GET() {
  try {
    const pieces = await prisma.piece.findMany({
      orderBy: { dateAdded: 'desc' }
    });
    return NextResponse.json(pieces);
  } catch {
    console.log('Database not configured, using static data as fallback');
    // Fallback a datos estáticos si no hay DB configurada
    return NextResponse.json(staticPieces);
  }
}

// POST /api/pieces - Crear una nueva pieza
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const piece = await prisma.piece.create({
      data: {
        title: data.title,
        description: data.description,
        coverArt: data.coverArt,
        audioUrl: data.audioUrl,
        dateAdded: new Date(data.dateAdded),
      },
    });
    return NextResponse.json(piece);
  } catch {
    return NextResponse.json(
      { error: 'Base de datos no configurada. Las funciones de administración requieren una base de datos PostgreSQL.' },
      { status: 503 }
    );
  }
}

// PUT /api/pieces - Actualizar una pieza existente
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const piece = await prisma.piece.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        coverArt: data.coverArt,
        audioUrl: data.audioUrl,
      },
    });
    return NextResponse.json(piece);
  } catch {
    return NextResponse.json(
      { error: 'Base de datos no configurada. Las funciones de administración requieren una base de datos PostgreSQL.' },
      { status: 503 }
    );
  }
}

// DELETE /api/pieces - Eliminar una pieza
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de pieza no proporcionado' },
        { status: 400 }
      );
    }

    await prisma.piece.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Base de datos no configurada. Las funciones de administración requieren una base de datos PostgreSQL.' },
      { status: 503 }
    );
  }
} 