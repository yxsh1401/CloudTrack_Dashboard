import React from "react";
import { Chart } from "react-google-charts";

// Map state codes to full names (for Google Charts)
const stateCodeMap = {
  TS: "Andhra Pradesh",
  GJ: "Gujarat",
  KA: "Karnataka",
  MH: "Maharashtra",
//   AD: "Andhra Pradesh", // Assuming AD is Andhra
  UP: "Uttar Pradesh",
  DL: "Delhi"
};

const rawData = [
  { _id: "TS", count: 140 },
  { _id: "GJ", count: 7 },
  { _id: "KA", count: 6 },
  { _id: "MH", count: 3 },
  { _id: "AD", count: 1 },
  { _id: "UP", count: 2 },
  { _id: "DL", count: 5 }
];

const chartData = [
  ["State", "Count"],
  ...rawData.map(item => [stateCodeMap[item._id] || item._id, item.count])
];

const options = {
  region: "IN", // India
  displayMode: "regions",
  resolution: "provinces",
  colorAxis: { colors: ["#f5d0c5", "#e74c3c"] },
};

export default function StateGeoChart() {
  return (
    <div className="w-full h-[500px]">
      <Chart
        chartType="GeoChart"
        width="100%"
        height="490px"
        data={chartData}
        options={options}
      />
    </div>
  );
}
