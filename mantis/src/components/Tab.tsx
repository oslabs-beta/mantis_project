import React, { useState } from 'react';

interface TabProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = ({ label, onClick, isActive }) => {
  return (
    <div
      className={`tab cursor-pointer p-1 px-2 rounded-lg transition-all hover:text-[#A3CD9A] transition-colors duration-200 ease-in-out bg-neutral-50 h-8 flex items-center justify-center mr-2 box-border text-xs sm:text-sm md:text-base truncate
       ${
         isActive
           ? 'border-[3px] border-[#A3CD9A] text-[#193B2D] font-bold'
           : 'bg-neutral-50 text-black'
       }
      `}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Tab;
