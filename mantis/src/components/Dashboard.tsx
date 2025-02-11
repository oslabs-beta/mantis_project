import React, { useState } from 'react';
// import Buttons from '.Buttons';

const Dashboard: React.FC = () => {
  const [viewType, setViewType] = useState('overview');
  const [timeFrame, setTimeFrame] = useState('1h');
  const [queryType, setQueryType] = useState('P50');

  //update view type either overview or single graph
  const handleOverview = (type: string) => {
    setViewType('overview');
    setQueryType('overview');
  };
  // handle time frame either 10m, 1h, 8h, 16h, 1d, 1w
  const handleTimeFrame = (time: string) => {
    setTimeFrame(time);
  };

  const handleMetricClick = (type: string) => {
    // handle query type based on button click
    setQueryType(type);
    // set view to single view after a button clickk
    setViewType('single');
  };
  const grafanaUrl =
    viewType === 'overview'
      ? `"http://localhost:3000/d-solo/fecp0c24oog74b/data-from-database?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo"`
      : ``;
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => handleOverview('overview')}>Overview</button>
      <Buttons onClick={(type: string) => handleMetricClick(type)}></Buttons>
      <div className='grafana-panels'>
        {viewType === 'overview' ? (
          // show 4 panels
          <iframe
            src='http://localhost:3000/d-solo/fecp0c24oog74b/data-from-database?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo'
            width='450'
            height='200'
            frameBorder='0'
            title='overview'
          ></iframe>
        ) : (
          <iframe
            src='http://localhost:3000/d-solo/fecp0c24oog74b/data-from-database?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo'
            width='450'
            height='200'
            frameBorder='0'
            title='single'
          ></iframe>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
