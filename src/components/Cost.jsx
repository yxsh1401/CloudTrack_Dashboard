import React from 'react';
import Chart from 'react-apexcharts';
import InvoiceTab from './Invoice';

const costMetricsData = {
  costPerTonKm: 12.5,
  costPerUnit: 8.3,
  costPerTrip: 1211.51,
  costPerShipment: 984.57,
  costPerKm: 32.5,
  fuelCostPerKm: 18.4,
  freightCostPercent: 7.5,
  emptyKmPercent: 14.2,
  freightBillAccuracy: 98.5,
};

const donutSeries = [costMetricsData.freightCostPercent, costMetricsData.emptyKmPercent, 100 - costMetricsData.freightBillAccuracy];

const donutOptions = {
  labels: ['Freight Cost %', 'Empty Km %', 'Billing Error %'],
  colors: ['#3b82f6', '#f59e0b', '#ef4444'],
  legend: {
    position: 'bottom',
  },
  tooltip: {
    y: {
      formatter: (val) => `${val}%`,
    },
  },
};

const barOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false },
  },
  xaxis: {
    categories: ['Per Ton-Km', 'Per Unit', 'Per Km', 'Fuel/Km'],
  },
  colors: ['#10b981'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '40%',
    },
  },
};

const barSeries = [{
  name: 'Cost (₹)',
  data: [
    costMetricsData.costPerTonKm,
    costMetricsData.costPerUnit,
    costMetricsData.costPerKm,
    costMetricsData.fuelCostPerKm,
  ],
}];

const CostAnalysis = () => {
  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Metric Cards */}
      {Object.entries(costMetricsData).map(([key, value]) => (
        <div key={key} className="p-4 rounded-xl bg-white shadow-md border">
          <h4 className="text-xs text-gray-500 capitalize mb-1">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </h4>
          <p className="text-xl font-bold text-blue-600">
            {key.includes('Percent') || key.includes('Accuracy') ? `${value}%` : `₹${value}`}
          </p>
        </div>
      ))}

      {/* Donut Chart */}
      <div className="col-span-full lg:col-span-1 bg-white p-4 rounded-xl shadow-md border">
        <h3 className="font-semibold text-gray-700 mb-4">Cost Efficiency Breakdown</h3>
        <Chart options={donutOptions} series={donutSeries} type="donut" height={300} />
      </div>

      {/* Bar Chart */}
      <div className="col-span-full lg:col-span-2 bg-white p-4 rounded-xl shadow-md border">
        <h3 className="font-semibold text-gray-700 mb-4">Cost Metrics Comparison</h3>
        <Chart options={barOptions} series={barSeries} type="bar" height={300} />
      </div>
      <div className='col-span-full'>
        <InvoiceTab/>
      </div>
    </div>
    </>
  );
};

export default CostAnalysis;
