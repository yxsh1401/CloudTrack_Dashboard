import React from 'react';
import Chart from 'react-apexcharts';

const OnTimePerformance = () => {
  const options = {
    chart: {
      type: 'donut',
    },
    labels: ['On Time', 'Late'],
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    colors: ['#00E396', '#FF4560'],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
    },
  };

  const series = [52, 48]; // 85% on-time, 15% late

  return (
    <div>
      <Chart options={options} series={series} type="donut" width="380" />
       {/* Average Order to Delivery */}
       <div className='flex items-center justify-between mt-4'>
  <div className="flex items-center p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm">
    <div className="bg-indigo-200 text-indigo-700 p-2 rounded-full mr-4">
      {/* <Clock size={20} /> */}
    </div>
    <div>
      <p className="text-sm text-indigo-700">Total Deliveries</p>
      <p className="text-lg font-semibold text-indigo-900">2170</p>
    </div>
  </div>
  <div className="flex items-center p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm">
    <div className="bg-indigo-200 text-indigo-700 p-2 rounded-full mr-4">
      {/* <Clock size={20} /> */}
    </div>
    <div>
      <p className="text-sm text-indigo-700">Deliveries on Time</p>
      <p className="text-lg font-semibold text-indigo-900">1120</p>
    </div>
  </div>
  </div>
    </div>
  );
};

export default OnTimePerformance;