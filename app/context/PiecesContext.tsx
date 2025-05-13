'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MusicPiece } from '../types';

interface PiecesContextType {
  pieces: MusicPiece[];
  addPiece: (piece: MusicPiece) => Promise<void>;
  updatePiece: (piece: MusicPiece) => Promise<void>;
  deletePiece: (pieceId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const PiecesContext = createContext<PiecesContextType | undefined>(undefined);

export function PiecesProvider({ children }: { children: ReactNode }) {
  const [pieces, setPieces] = useState<MusicPiece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar piezas al iniciar
  useEffect(() => {
    fetchPieces();
  }, []);

  const fetchPieces = async () => {
    try {
      const response = await fetch('/api/pieces');
      if (!response.ok) throw new Error('Error al cargar las piezas');
      const data = await response.json();
      setPieces(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const addPiece = async (piece: MusicPiece) => {
    try {
      const response = await fetch('/api/pieces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(piece),
      });
      if (!response.ok) throw new Error('Error al crear la pieza');
      const newPiece = await response.json();
      setPieces(prev => [...prev, newPiece]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  const updatePiece = async (piece: MusicPiece) => {
    try {
      const response = await fetch('/api/pieces', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(piece),
      });
      if (!response.ok) throw new Error('Error al actualizar la pieza');
      const updatedPiece = await response.json();
      setPieces(prev => prev.map(p => p.id === piece.id ? updatedPiece : p));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  const deletePiece = async (pieceId: string) => {
    try {
      const response = await fetch(`/api/pieces?id=${pieceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la pieza');
      setPieces(prev => prev.filter(p => p.id !== pieceId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  return (
    <PiecesContext.Provider value={{ pieces, addPiece, updatePiece, deletePiece, isLoading, error }}>
      {children}
    </PiecesContext.Provider>
  );
}

export function usePieces() {
  const context = useContext(PiecesContext);
  if (context === undefined) {
    throw new Error('usePieces must be used within a PiecesProvider');
  }
  return context;
} 