"use client";
import React, { useState } from 'react';
import Form from '../components/Form';
import SpecDisplay from '../components/SpecDisplay';

export default function HomePage() {
  const [spec, setSpec] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (description: string) => {
    setLoading(true);
    setSpec('');
    try {
      const res = await fetch('/api/generate-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader!.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          setSpec((prev) => prev + chunk);
        }
      }
    } catch (e) {
      console.error(e);
      setSpec('Error generating specification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full space-y-6 bg-slate-900 text-slate-100 p-8 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center">AI Spec Builder</h1>
      <Form onSubmit={handleSubmit} disabled={loading} />
      <SpecDisplay spec={spec} loading={loading} />
    </div>
  );
}
