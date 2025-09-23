import React, { useState, useRef, useEffect } from 'react';
import dotsVertical from '../../assets/icons/dots-vertical.svg';

interface OptionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const OptionMenu: React.FC<OptionMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-[#FFFFFF14] rounded-md"
      >
        <img src={dotsVertical} alt="options" className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-[#18181B] rounded-md shadow-lg border border-[#FFFFFF14] z-10">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-[#f4f4f5] hover:bg-[#FFFFFF14]"
          >
            Edit Holdings
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#FFFFFF14]"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionMenu;