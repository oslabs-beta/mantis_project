import React, { useState } from 'react';
import Tabs from './Tabs';

const Dashboard: React.FC = () => {
  const [viewType, setViewType] = useState('overview');
  const [timeFrame, setTimeFrame] = useState('1h');
  const [queryType, setQueryType] = useState('P50');
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    { label: 'Overview' },
    { label: 'P50' },
    { label: 'P90' },
    { label: 'P99' },
    { label: 'Error Rate' },
  ];

  // handle the tab change
  const handleTabChange = (index: number) => {
    if (tabData[index].label === 'Overview') {
      setViewType('overview');
    } else {
      setViewType(tabData[index].label);
    }
    setActiveTab(index);
    setQueryType(tabData[index].label);
  };
  // handle time frame either 10m, 1h, 8h, 16h, 1d, 1w
  const handleTimeFrame = (time: string) => {
    setTimeFrame(time);
  };

  // const grafanaUrl = `http://localhost:3000/d-solo/${
  //   viewType === 'overview'
  //     ? 'fecp0c24oog74b/data-from-database'
  //     : 'fecp0c24oog74b/data-from-database'
  // }?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo`;
  const grafanaUrl = `http://localhost:3000/d-solo/${
    viewType === 'overview'
      ? 'fecp0c24oog74b/data-from-database'
      : 'fecp0c24oog74b/data-from-database'
  }?orgId=1&timezone=browser&panelId=${
    activeTab + 1
  }&from=${timeFrame}&to=${timeFrame}&queryType=${queryType}&__feature.dashboardSceneSolo`;
  return (
    <div>
      <h1
        className='text-left text-emerald-950] tracking-widest ml-1 mb-1 font-semibold'
        style={{
          fontFamily: '"Faustina", sans-serif',
          textShadow: '2px 2px 5px rgba(255, 255, 255, 0.6)',
          fontSize: '3vw',
        }}
      >
        METRICS
      </h1>
      <Tabs
        tabs={tabData}
        activeTab={activeTab}
        onTabChange={handleTabChange} // Pass the handler to Tabs
      />
      <div className='grafana-panels overflow-auto p-3 border-2 border-neutral-950 bg-[#A3CD9A] shadow-xl rounded-2xl'>
        {viewType === 'overview' ? (
          // Show the 4 panels if the view is overview
          <div className='grid grid-cols-2 gap-3 max-h-[600px]'>
            <iframe
              src={grafanaUrl}
              className='w-full h-auto min-w-[275px] min-h-[275px] max-w-[600px] max-h-[600px] aspect-video'
              title='overview-panel-1'
            ></iframe>
            <iframe
              src={grafanaUrl}
              className='w-full h-auto min-w-[275px] min-h-[275px] max-w-[600px] max-h-[600px] aspect-video'
              title='overview-panel-2'
            ></iframe>
            <iframe
              src={grafanaUrl}
              className='w-full h-auto min-w-[275px] min-h-[275px] max-w-[600px] max-h-[600px] aspect-video'
              title='overview-panel-3'
            ></iframe>
            <iframe
              src={grafanaUrl}
              className='w-full h-auto min-w-[275px] min-h-[275px] max-w-[600px] max-h-[600px] aspect-video'
              title='overview-panel-4'
            ></iframe>
          </div>
        ) : (
          <div className='flex justify-center'>
            <iframe
              src={grafanaUrl}
              className='w-full h-auto min-w-[600px] min-h-[600px] max-w-[1200px] max-h-[1200px] aspect-video'
              title={`${queryType}-panel`}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
