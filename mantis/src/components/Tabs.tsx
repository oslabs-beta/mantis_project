import React from 'react';
import Tab from './Tab';

interface TabsProps {
  tabs: { label: string }[];
  activeTab: number;
  onTabChange: (index: number) => void;
}
const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='tabs-container '>
      <div className='tabs flex flex-row ml-1 mb-1.5'>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            onClick={() => onTabChange(index)} // Pass the index to the onTabChange handler
            isActive={activeTab === index} // Compare the current tab's index with the activeTab prop
          />
        ))}
      </div>
      <div className='tab-content'></div> {/* Display active tab label */}
    </div>
  );
};

export default Tabs;
