import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';


const BarChart = ({ chartData, value }) => {
  let Xtext;
  let Ytext;
  if (value === "Items") {
    Xtext = "Item Name";
    Ytext = "Quantity";
  } else if (value === "Client") {
    Xtext = "Client Name";
    Ytext = "Number of Items";
  } else if (value === "Supplier") {
    Xtext = "Supplier Name";
    Ytext = "Number of Items";
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this line to control the aspect ratio
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: Xtext,
          font: {
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: Ytext,
          font: {
            weight: "bold",
          },
        },
        beginAtZero: true,
        min: 0,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
