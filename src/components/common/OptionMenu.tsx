import React, { useState, useRef, useEffect } from 'react';
import dots from '../../assets/icons/IconButton.svg';
import pencil from '../../assets/icons/pencil-square.svg';
import trash from '../../assets/icons/trash.svg';

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
        className="p-1 hover:bg-[#FFFFFF14] rounded-md cursor-pointer"
      >
        <img src={dots} alt="options" className="w-6 h-6 " />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-[#27272A] rounded-md border border-[#FFFFFF14] z-10 shadow-[0_8px_16px_0_#00000014,0_4px_8px_0_#00000014,0_0_0_1px_#00000014]">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-[13px] text-[#A1A1AA] hover:bg-[#FFFFFF14] cursor-pointer"
          >
            <img src={pencil} alt="edit" className="w-4 h-4 inline-block mr-2" />
            Edit Holdings
          </button>
          <div className='bg-[var(--borders-border-menu-bot,#FFFFFF14)] h-[1px]'></div>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-[13px] text-red-300 hover:bg-[#FFFFFF14] cursor-pointer"
          >
                    <img src={trash} alt="edit" className="w-4 h-4 inline-block mr-2" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionMenu;