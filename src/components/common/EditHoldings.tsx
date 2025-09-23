import React, { useRef, useEffect, useState } from 'react';
import PrimaryButton from '../common/PrimaryButton.tsx';

interface EditHoldingsProps {
  initialValue: number;
  onSave: (value: number) => void;
  onCancel: () => void;
}

const EditHoldings: React.FC<EditHoldingsProps> = ({ initialValue, onSave, onCancel }) => {
  const [tempValue, setTempValue] = useState(initialValue);
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

  const handleSave = () => {
    onSave(tempValue);
  };

  return (
    <div ref={containerRef} className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="number"
        value={tempValue || ''}
        onChange={(e) => setTempValue(parseFloat(e.target.value) || 0)}
        className="w-24 px-2 py-1 bg-[#27272A] border border-[#FFFFFF14] rounded text-[#f4f4f5]"
        placeholder="0.00"
        min="0"
        step="any"
      />
      <PrimaryButton
        onClick={handleSave}
        text='Save'
        radius='rounded-[6px]'
      />
      
    </div>
  );
};

export default EditHoldings;