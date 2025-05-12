'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in a real app, this should be handled server-side
    if (password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <main className="min-h-screen w-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 ibm-plex-mono-bold">Admin Panel</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-2 border rounded ibm-plex-mono-regular"
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm ibm-plex-mono-regular">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded ibm-plex-mono-medium hover:bg-gray-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
} 