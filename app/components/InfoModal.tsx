'use client';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl ibm-plex-mono-bold">Iván Nevares</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="ibm-plex-mono-regular text-sm">
            1994. Buenos Aires, Argentina.
          </p>
          <p className="ibm-plex-mono-regular text-sm">
            Músico y diseñador sonoro.
          </p>
          <p className="ibm-plex-mono-regular text-sm">
            Esta web es un experimento para permitirme crear y lanzar sin el contexto de un EP, Álbum, o sello. La música aquí presente quiere ser sin limitaciones de formato o género.
          </p>
          <a 
            href="mailto:ivannevares9@gmail.com"
            className="block ibm-plex-mono-regular text-sm text-gray-600 hover:text-gray-900"
          >
            ivannevares9@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
} 