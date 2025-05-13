'use client';

import { useState } from 'react';
import MusicAccordionItem from './components/MusicAccordionItem';
import InfoModal from './components/InfoModal';
import { usePieces } from './context/PiecesContext';

export default function Home() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { pieces } = usePieces();

  return (
    <main className="min-h-screen w-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold ibm-plex-mono-bold">sonidos 9 - reservorio</h1>
        <button
          onClick={() => setIsInfoModalOpen(true)}
          className="px-3 py-1 text-sm ibm-plex-mono-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
        >
          INFO
        </button>
      </div>
      
      <div className="space-y-1">
        {pieces.map((piece) => (
          <MusicAccordionItem key={piece.id} piece={piece} />
        ))}
      </div>

      <InfoModal 
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </main>
  );
}
