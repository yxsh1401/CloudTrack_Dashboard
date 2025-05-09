import React, { useState } from "react";
import Chart from "react-apexcharts";

const CostToRevenueRatioChart = () => {
  const [view, setView] = useState("Monthly");

  const monthlyData = {
    categories: [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUNE", 
      "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"
    ],
    values: [
      5100, 4400, 4750, 4830, 4350, 4440,
      3850, 3700, 3900, 3450, 6100, 5300
    ]
  };

  const yearlyData = {
    categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
    values: [0, 5300, 4000, 3200, 22000, 0]
  };

  const data = view === "Monthly" ? monthlyData : yearlyData;

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false }
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    markers: {
      size: 5,
      colors: "#0000ff",
      strokeColors: "#0000ff",
    },
    xaxis: {
      categories: data.categories,
      labels: {
        style: { fontSize: '14px' }
      }
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val.toFixed(0)} %`,
      },
    },
    colors: ["#0000ff"],
    tooltip: {
      y: {
        formatter: (val) => `${val.toFixed(0)} %`,
      },
    },
  };

  const chartSeries = [
    {
      name: "Cost to Revenue Ratio",
      data: data.values,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cost to Revenue Ratio</h2>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border px-3 py-1 rounded-md text-sm"
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};

export default CostToRevenueRatioChart;
