import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// GET /api/pieces - Obtener todas las piezas
export async function GET() {
  try {
    const pieces = await prisma.piece.findMany({
      orderBy: { dateAdded: 'desc' }
    });
    return NextResponse.json(pieces);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las piezas' },
      { status: 500 }
    );
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la pieza' },
      { status: 500 }
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la pieza' },
      { status: 500 }
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la pieza' },
      { status: 500 }
    );
  }
} 