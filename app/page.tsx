'use client';

import { useState } from 'react';
import MusicAccordionItem from './components/MusicAccordionItem';
import InfoModal from './components/InfoModal';
import { usePieces } from './context/PiecesContext';

export default function Home() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { pieces, isLoading, error } = usePieces();

  return (
    <main className="min-h-screen w-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-helvetica helvetica-bold">Sonidos 9 - Reservorio</h1>
        <button
          onClick={() => setIsInfoModalOpen(true)}
          className="px-3 py-1 text-sm helvetica-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
        >
          INFO
        </button>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <p className="helvetica-regular text-gray-500">Cargando piezas musicales...</p>
        </div>
      )}

      {error && pieces.length === 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="helvetica-medium text-red-600 mb-2">Error al cargar las piezas</p>
          <p className="helvetica-regular text-sm text-red-500">{error}</p>
        </div>
      )}

      {!isLoading && !error && pieces.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <p className="helvetica-regular text-gray-500">No hay piezas musicales disponibles.</p>
        </div>
      )}
      
      {!isLoading && !error && pieces.length > 0 && (
        <div className="space-y-1">
          {pieces.map((piece) => (
            <MusicAccordionItem key={piece.id} piece={piece} />
          ))}
        </div>
      )}

      <InfoModal 
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </main>
  );
}
