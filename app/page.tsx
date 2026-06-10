"use client";
import React, { useState } from 'react';
import Form from '../components/Form';
import SpecDisplay from '../components/SpecDisplay';

export default function HomePage() {
  const [spec, setSpec] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (description: string) => {
    setLoading(true);
    setSpec('');
    setError(null);

    try {
      const res = await fetch('/api/generate-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      // Manejo de errores controlado (429 Rate Limit, 500 Error de Inyección/Estructura, etc.)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        
        // Si falta alguna sección por intento de inyección, el backend envía 'missingSections'
        const errorMessage = errorData.error 
          ? `${errorData.error}${errorData.missingSections ? ` Faltó: ${errorData.missingSections.join(', ')}` : ''}`
          : 'Ocurrió un error inesperado al procesar la solicitud.';
        
        setError(errorMessage);
        return; 
      }

      // SOLUCIÓN: Al remover el stream, leemos la respuesta completa como texto directo
      const textData = await res.text();
      setSpec(textData);

    } catch (e) {
      console.error(e);
      setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full space-y-6 bg-slate-900 text-slate-100 p-8 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center">AI Spec Builder</h1>
      
      <Form onSubmit={handleSubmit} disabled={loading} />

      {/* Alerta de control de seguridad o rate limit */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-sm">
          <p className="font-semibold">⚠️ Control de seguridad y solicitudes:</p>
          <p className="mt-1 text-slate-300">{error}</p>
        </div>
      )}

      <SpecDisplay spec={spec} loading={loading} />
    </div>
  );
}