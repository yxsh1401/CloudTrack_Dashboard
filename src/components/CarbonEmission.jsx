import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SustainabilityMetrics = () => {
  const [view, setView] = useState('monthly');

  const sustainabilityData = {
    "Total co2 Emissions": "92,321 kg CO2",
    "Avg Emissions per Trip": "267.42 kg CO2",
    "Lowest Emissions": "52.34 kg CO2",
    "Highest Emissions": "553.96 kg CO2",
  };

  const chartOptions = {
    monthly: {
      series: [
        {
          name: "totalEmission",
          type: "line",
          data: [7000, 9000, 5000, 3000, 15000, 12048],
        },
        {
          name: "avgEmission",
          type: "line",
          data: [300.1, 310.4, 350.2, 370.6, 400.0, 388.64],
        },
        {
          name: "efficiencyIndex",
          type: "line",
          data: [60, 58, 70, 75, 65, 51],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [3, 3, 3],
          curve: "smooth",
        },
        colors: ["#e74c3c", "#3498db", "#2ecc71"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        yaxis: [
          {
            title: {
              text: "Emission",
            },
          },
          {
            opposite: true,
            title: {
              text: "Efficiency Index",
            },
          },
        ],
        tooltip: {
          shared: true,
          intersect: false,
        },
      },
    },
    yearly: {
      series: [
        {
          name: "totalEmission",
          type: "line",
          data: [82000, 94000, 102000],
        },
        {
          name: "avgEmission",
          type: "line",
          data: [320.5, 342.3, 356.8],
        },
        {
          name: "efficiencyIndex",
          type: "line",
          data: [62, 66, 70],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [3, 3, 3],
          curve: "smooth",
        },
        colors: ["#e74c3c", "#3498db", "#2ecc71"],
        xaxis: {
          categories: ["2022", "2023", "2024"],
        },
        yaxis: [
          {
            title: {
              text: "Emission",
            },
          },
          {
            opposite: true,
            title: {
              text: "Efficiency Index",
            },
          },
        ],
        tooltip: {
          shared: true,
          intersect: false,
        },
      },
    },
  };

  const activeChart = chartOptions[view];

  return (
    <div className="bg-white rounded-xl shadow-lg col-span-full">
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          Sustainability Metrics
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setView('monthly')}
            className={`px-4 py-1 rounded-md text-sm font-medium border transition 
              ${view === 'monthly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView('yearly')}
            className={`px-4 py-1 rounded-md text-sm font-medium border transition 
              ${view === 'yearly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(sustainabilityData).map(([key, value]) => (
            <div key={key} className="p-4 border rounded-lg bg-gray-50 hover:shadow-md transition">
              <h4 className="text-sm text-gray-600 capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div>
          <ReactApexChart
            options={activeChart.options}
            series={activeChart.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default SustainabilityMetrics;
