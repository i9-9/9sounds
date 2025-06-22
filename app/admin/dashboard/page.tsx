'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MusicPiece } from '../../types';
import { usePieces } from '../../context/PiecesContext';

export default function Dashboard() {
  const router = useRouter();
  const { pieces, addPiece, updatePiece, deletePiece, isLoading, error } = usePieces();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverArt, setCoverArt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPiece, setEditingPiece] = useState<MusicPiece | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validar que se haya seleccionado un archivo de audio
      if (!editingPiece && !audioFile) {
        throw new Error('Por favor selecciona un archivo de audio');
      }

      // Construir las rutas locales
      const audioUrl = audioFile 
        ? `/audio/${audioFile.name}` 
        : editingPiece?.audioUrl || '';

      const coverArtUrl = coverArt
        ? `/images/${coverArt.name}`
        : editingPiece?.coverArt;

      const newPiece: MusicPiece = {
        id: editingPiece?.id || Date.now().toString(),
        title,
        dateAdded: editingPiece?.dateAdded || new Date().toISOString(),
        description: description || undefined,
        coverArt: coverArtUrl,
        audioUrl,
      };

      if (editingPiece) {
        await updatePiece(newPiece);
      } else {
        await addPiece(newPiece);
      }

      // Mostrar mensaje de instrucciones
      alert(
        'Pieza guardada con éxito.\n\n' +
        'IMPORTANTE: Para completar el proceso:\n' +
        '1. Coloca el archivo de audio en la carpeta "public/audio"\n' +
        (coverArt ? '2. Coloca la imagen en la carpeta "public/images"\n' : '') +
        '3. Haz commit y push de los cambios a GitHub'
      );

      setTitle('');
      setDescription('');
      setAudioFile(null);
      setCoverArt(null);
      setEditingPiece(null);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (piece: MusicPiece) => {
    setEditingPiece(piece);
    setTitle(piece.title);
    setDescription(piece.description || '');
  };

  const handleDelete = async (pieceId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta pieza?\n\nNOTA: Esto solo eliminará la entrada de la base de datos. Deberás eliminar manualmente los archivos de las carpetas public/audio y public/images.')) {
      try {
        await deletePiece(pieceId);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Error desconocido');
      }
    }
  };

  const handleCancel = () => {
    setEditingPiece(null);
    setTitle('');
    setDescription('');
    setAudioFile(null);
    setCoverArt(null);
  };

  return (
    <main className="min-h-screen w-screen bg-white">
      <div className="w-full px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-2xl helvetica-bold text-gray-900">
            {editingPiece ? 'Editar Pieza' : 'Añadir Pieza'}
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 text-sm helvetica-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
          >
            Volver
          </button>
        </div>

        {(error || submitError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 helvetica-medium">
              {error || submitError}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block helvetica-medium text-sm text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg helvetica-regular text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all"
                  placeholder="Nombre de la pieza"
                />
              </div>

              <div>
                <label className="block helvetica-medium text-sm text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg helvetica-regular text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Descripción opcional"
                />
              </div>

              <div>
                <label className="block helvetica-medium text-sm text-gray-700 mb-2">Archivo de Audio</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg helvetica-regular text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:helvetica-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                <p className="mt-2 text-sm text-gray-500 helvetica-regular">
                  Coloca el archivo en la carpeta public/audio después de guardar
                </p>
              </div>

              <div>
                <label className="block helvetica-medium text-sm text-gray-700 mb-2">Imagen de Portada</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverArt(e.target.files?.[0] || null)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg helvetica-regular text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:helvetica-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                <p className="mt-2 text-sm text-gray-500 helvetica-regular">
                  Coloca la imagen en la carpeta public/images después de guardar
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gray-900 text-white rounded-full helvetica-medium text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Guardando...' : editingPiece ? 'Guardar Cambios' : 'Añadir Pieza'}
              </button>
              {editingPiece && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full helvetica-medium text-sm hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div>
            <h2 className="text-xl helvetica-bold text-gray-900 mb-6">Piezas Existentes</h2>
            {isLoading ? (
              <p className="text-gray-500 helvetica-regular">Cargando piezas...</p>
            ) : (
              <div className="space-y-4">
                {pieces.map((piece) => (
                  <div 
                    key={piece.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      {piece.coverArt && (
                        <div className="w-12 h-12 relative rounded overflow-hidden">
                          <Image
                            src={piece.coverArt}
                            alt={piece.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="helvetica-medium text-gray-900">{piece.title}</h3>
                        <p className="helvetica-regular text-sm text-gray-500">
                          {new Date(piece.dateAdded).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(piece)}
                        className="px-4 py-2 text-sm helvetica-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(piece.id)}
                        className="px-4 py-2 text-sm helvetica-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 