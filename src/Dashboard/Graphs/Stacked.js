import React from "react";
import { Bar } from "react-chartjs-2";

const StackedBarChart = ({ chartData, value }) => {
  let Xtext;
  let Ytext;
  if (value === "Items") {
    Xtext = "Item Name";
    Ytext = "Quantity";
  } else if (value === "Client") {
    Xtext = "Items";
    Ytext = "Client Name";
  } else if (value === "Supplier") {
    Xtext = "Items";
    Ytext = "Supplier Name";
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this line to control the aspect ratio
    indexAxis: "y",
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: Xtext,
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: Ytext,
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StackedBarChart;
