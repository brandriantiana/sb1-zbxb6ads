import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ajouter une tâche..."
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-blue-500 hover:text-blue-600 transition-colors"
          disabled={!text.trim()}
        >
          <PlusCircle size={24} />
        </button>
      </div>
    </form>
  );
}