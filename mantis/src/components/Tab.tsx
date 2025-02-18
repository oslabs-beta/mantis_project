import React from 'react';

interface TabProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = ({ label, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer m-1 px-3 py-1 rounded-md transition-colors duration-200 text-sm 
        ${
          isActive
            ? 'bg-emerald-600 text-white font-semibold'
            : 'bg-black/30 text-gray-200 hover:bg-black/50'
        }`}
    >
      {label}
    </div>
  );
};

export default Tab;
