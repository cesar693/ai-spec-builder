import React from 'react';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface SpecDisplayProps {
  spec: string;
  loading: boolean;
}

export default function SpecDisplay({ spec, loading }: SpecDisplayProps) {
  const copyToClipboard = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(spec);
        alert('Spec copied to clipboard');
      } catch (e) {
        // fallback if clipboard write fails
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }
  };
  function fallbackCopy() {
    const textarea = document.createElement('textarea');
    textarea.value = spec;
    textarea.style.position = 'fixed'; // avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('Spec copied to clipboard');
    } catch (e) {
      alert('Unable to copy spec');
    }
    document.body.removeChild(textarea);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([spec], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spec.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-slate-600 rounded-lg bg-slate-800 p-4">
      <h2 className="text-xl font-semibold mb-2">Generated Specification</h2>
      {loading && <p className="text-gray-500">Generating...</p>}
      <pre className="whitespace-pre-wrap overflow-x-auto mb-4 max-h-96" style={{ maxHeight: '400px' }}>{spec}</pre>
      <div className="flex space-x-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <ClipboardIcon className="h-5 w-5" />
          <span>Copy</span>
        </button>
        <button
          onClick={downloadMarkdown}
          className="flex items-center space-x-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          <span>Download MD</span>
        </button>
      </div>
    </div>
  );
}
