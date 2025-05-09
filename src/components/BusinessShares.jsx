import React from "react";
import Chart from "react-apexcharts";

const BusinessBreakupChart = () => {
  const data = {
    series: [
      {
        name: "Business Share",
        data: [1213, 967, 564, 57, 35], // Example values for L1, L2, L3, Adhoc
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          barHeight: '60%',
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#fff'],
        },
      },
      xaxis: {
        categories: ["L1", "L2", "L3","L4", "Adhoc"],
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.4,
          gradientToColors: ["#007AFF"], // blue gradient
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 1,
        },
      },
      colors: ["#00C6FF"], // Gradient start color
    //   title: {
    //     text: "Business Breakup",
    //     align: "left",
    //     style: {
    //       fontSize: "20px",
    //       fontWeight: 700,
    //       color: "#333",
    //     },
    //   },
      grid: {
        borderColor: '#e0e0e0',
      },
    },
  };

  return <Chart options={data.options} series={data.series} type="bar" height={350} />;
};

export default BusinessBreakupChart;
