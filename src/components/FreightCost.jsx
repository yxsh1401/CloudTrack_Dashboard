import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const monthlyData = [2.3e6, 2.6e6, 2.2e6, 5e6, 7e6, 1e7, 1.3e7, 1.6e7, 1.7e7, 1e5, 5e4, 1e5];
const yearlyData = [1.5e7, 2.1e7, 1.8e7, 2.4e7]; // Sample yearly freight cost

const categories = {
  Monthly: ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"],
  Yearly: ["2021", "2022", "2023", "2024"]
};

export default function FreightCostChart() {
  const [view, setView] = useState("Monthly");

  const chartData = view === "Monthly" ? monthlyData : yearlyData;

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#00b894"]
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: categories[view],
      labels: {
        style: {
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      labels: {
        formatter: value => value.toLocaleString("en-IN", { maximumFractionDigits: 2 }),
        style: { fontSize: "12px" }
      }
    },
    tooltip: {
      y: {
        formatter: value => `₹ ${value.toLocaleString("en-IN")}`
      }
    },
    markers: {
      size: 5,
      colors: ["#0984e3"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    title: {
      text: "Freight Cost",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold"
      }
    }
  };

  const series = [
    {
      name: "Freight Cost",
      data: chartData
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Freight Cost</h2>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={view}
          onChange={e => setView(e.target.value)}
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={400} />
    </div>
  );
}
