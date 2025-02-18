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
    { label: 'Error Rate 500' },
    { label: 'Error Rate 400' },
    { label: 'Requests per second' },
    { label: 'Traffic per endpoint' },
  ];

  // Handle the tab change
  const handleTabChange = (index: number) => {
    if (tabData[index].label === 'Overview') {
      setViewType('overview');
    } else {
      setViewType(tabData[index].label);
    }
    setActiveTab(index);
    setQueryType(tabData[index].label);
  };

  // Handle time frame (e.g. 10m, 1h, 8h, 16h, 1d, 1w)
  const handleTimeFrame = (time: string) => {
    setTimeFrame(time);
  };

  // Construct your Grafana URL dynamically
  const grafanaUrl = `http://localhost:3000/d-solo/${
    viewType === 'overview'
      ? 'fecp0c24oog74b/data-from-database'
      : 'fecp0c24oog74b/data-from-database'
  }?orgId=1&timezone=browser&panelId=${activeTab + 1}&from=${timeFrame}&to=${timeFrame}&queryType=${queryType}&__feature.dashboardSceneSolo`;

  return (
    // Use a gentle gradient or a lighter background
    <div className="min-h-screen bg-gradient-to-b from-[#A3CD9A] to-[#F0F7EE] p-4">
      {/* Page Title Section */}
      <div className="mb-4 text-center">
        <p className="text-emerald-900 text-sm sm:text-base mt-2 tracking-wide">
          Real-time observability for your microservices
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabData} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Optional: A Timeframe Selector */}
      <div className="flex justify-center my-4">
        {['10m', '1h', '8h', '16h', '1d', '1w'].map((t) => (
          <button
            key={t}
            onClick={() => handleTimeFrame(t)}
            className={`mx-1 px-3 py-1 rounded-full transition-colors duration-200 
              ${
                timeFrame === t
                  ? 'bg-emerald-800 text-white'
                  : 'bg-neutral-50 hover:bg-emerald-100 text-emerald-900'
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panels Area */}
      <div className="grafana-panels mx-auto max-w-7xl p-3">
        {viewType === 'overview' ? (
          // Show the 4 panels if the view is "overview"
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((panel) => (
              <div
                key={panel}
                className="bg-white rounded-xl shadow-lg p-3 flex justify-center"
              >
                <iframe
                  src={grafanaUrl}
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg"
                  title={`overview-panel-${panel}`}
                />
              </div>
            ))}
          </div>
        ) : (
          // Show a single iframe for the selected tab
          <div className="bg-white rounded-xl shadow-lg p-3 max-w-4xl mx-auto">
            <iframe
              src={grafanaUrl}
              className="w-full h-[400px] md:h-[550px] rounded-lg"
              title={`${queryType}-panel`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
