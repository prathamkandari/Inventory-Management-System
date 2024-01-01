import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this line to control the aspect ratio
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          usePointStyle: true,
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
