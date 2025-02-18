import React from 'react';
import Tab from './Tab';

interface TabsProps {
  tabs: { label: string }[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-2">
      {/* Dark, semi-transparent tabs container */}
      <div className="flex flex-row flex-wrap p-2 rounded-lg bg-black/30 backdrop-blur-sm">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            onClick={() => onTabChange(index)}
            isActive={activeTab === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Tabs;
