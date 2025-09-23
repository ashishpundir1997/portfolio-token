import React, { useRef, useEffect } from 'react';

interface EditHoldingsProps {
  value: number;
  onChange: (value: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditHoldings: React.FC<EditHoldingsProps> = ({ value, onChange, onSave, onCancel }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onCancel]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div ref={containerRef} className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="number"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-24 px-2 py-1 bg-[#27272A] border border-[#FFFFFF14] rounded text-[#f4f4f5]"
        placeholder="0.00"
        min="0"
        step="any"
      />
      <button 
        onClick={onSave}
        className="text-[#22C55E] hover:text-[#16A34A] px-2 py-1"
      >
        Save
      </button>
    </div>
  );
};

export default EditHoldings;