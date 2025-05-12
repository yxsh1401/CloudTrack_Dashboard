import React, { useState } from "react";
import Chart from "react-apexcharts";

const transporterData = {
  "MRC Logistics": [95, 92, 88, 97, 90],
  "CJ Darcl": [92, 89, 85, 90, 88],
  "Welcome Enterprises": [90, 85, 84, 89, 87],
  "EXIM Logistics": [88, 89, 83, 88, 82],
  "Rajprotim Supply Chain": [83, 85, 86, 85, 86],
};

const metricLabels = [
  "Delivery Time",
  "Indent",
  "Penalty Score",
  "Paperwork",
  "Satisfaction",
];

const TopTransporterScorecard = () => {
  const transporterList = Object.keys(transporterData);
  const [selectedTransporter, setSelectedTransporter] = useState(
    transporterList[0]
  );

  const options = {
    chart: {
      type: "radar",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    xaxis: {
      categories: metricLabels,
      labels: {
        style: {
          fontSize: "10px", // Reduced font size for the labels
          colors: "#4a4a4a", // Optional: Adjust label color
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100,
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.5,
      colors: ["#3b82f6"],
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: true, // Enable tooltip
      shared: false, // Set shared to false to show individual tooltips
      intersect: true, // Ensure tooltip appears on individual points
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const transporter = selectedTransporter;
        const metric = metricLabels[dataPointIndex];
        const score = series[seriesIndex][dataPointIndex];
        return `
          <div style="padding: 10px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
            <strong>${transporter}</strong><br />
            <span><strong>${metric}:</strong> ${score}</span>
          </div>
        `;
      },
    },
    grid: {
      show: false,
    },
  };

  const series = [
    {
      name: selectedTransporter,
      data: transporterData[selectedTransporter],
    },
  ];

  return (
    <div className="max-w-sm p-4 rounded-2xl text-center">
      <div className="flex justify-center items-center">
        <select
          className="border border-gray-300 bg-gray-50 rounded-full px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedTransporter}
          onChange={(e) => setSelectedTransporter(e.target.value)}
        >
          {transporterList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Chart options={options} series={series} type="radar" height={320} />

      <div className="">
        <h3 className="text-md font-semibold text-gray-800 mb-4">
          Scores for {selectedTransporter}:{" "}
          {(
            transporterData[selectedTransporter].reduce(
              (sum, val) => sum + val,
              0
            ) /
            transporterData[selectedTransporter].length /
            10
          ).toFixed(2)}
        </h3>

        <div className="grid grid-cols-5 gap-3">
          {metricLabels.map((metric, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl p-2 text-center shadow-sm"
            >
              <div className="text-sm font-semibold text-gray-900">
                {transporterData[selectedTransporter][index]}
              </div>
              <div className="text-[7px] text-gray-600">{metric}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTransporterScorecard;
