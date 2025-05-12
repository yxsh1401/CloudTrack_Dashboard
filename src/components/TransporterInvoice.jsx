import React from "react";
import ReactApexChart from "react-apexcharts";

const transporterData = [
  { _id: "EXPRESS ROADWAYS PVT LTD", count: 144 },
  { _id: "KOOL-EX COLD CHAIN LIMITED", count: 1 },
  { _id: "CJ DARCL LOGISTICS LIMITED", count: 1 },
  { _id: "TRUCKERS INDIA", count: 16 },
  { _id: "MEHTA TRANSPORT CORPORATION OF INDIA", count: 1 },
];

const series = [
  {
    name: "Count",
    data: transporterData.map(item => item.count),
  },
];

const options = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: transporterData.map(item => item._id),
  },
  colors: ["#1e88e5"],
  title: {
    text: "Transporter-wise Count",
    align: "left",
  },
};

export default function TransporterBarChart() {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
