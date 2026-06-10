import React from 'react';
import { useForm } from 'react-hook-form';

interface FormProps {
  onSubmit: (description: string) => void;
  disabled?: boolean;
}

type Inputs = {
  description: string;
};

export default function Form({ onSubmit, disabled }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const submit = (data: Inputs) => {
    onSubmit(data.description);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <textarea
        {...register('description', { required: true })}
        placeholder="Describe your product idea..."
        className="w-full p-3 border border-slate-600 rounded-lg bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        rows={5}
        disabled={disabled}
      />
      {errors.description && (
        <p className="text-sm text-red-600">Description is required.</p>
      )}
      <button
        type="submit"
        disabled={disabled}
        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-colors duration-300 disabled:opacity-50 shadow-md"
      >
        Generate Spec
      </button>
    </form>
  );
}
