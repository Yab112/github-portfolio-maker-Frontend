// components/PastePathInput.tsx
import React, { useState } from 'react';

interface PastePathInputProps {
  onPathSubmit: (path: string) => void;
}

const PastePathInput: React.FC<PastePathInputProps> = ({ onPathSubmit }) => {
  const [path, setPath] = useState('');

  const handleSubmit = () => {
    if (path.endsWith('package.json')) {
      onPathSubmit(path);
    } else {
      alert('Please enter a valid package.json path');
    }
  };

  return (
    <div className="mt-4 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-lg p-4 shadow-lg border border-white/20 dark:border-gray-700/50">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste package.json path..."
          className="flex-1 px-3 py-2 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500/30 hover:bg-blue-400/80 text-blue-600 dark:text-white rounded-md transition-colors"
        >
          Use Path
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Example: /path/to/project/package.json
      </p>
    </div>
  );
};

export default PastePathInput;
