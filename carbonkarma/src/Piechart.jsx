import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  // Initialize counts for different transport types
  let walkingCount = 0;
  let vehicleCount = 0;
  let cyclingCount = 0;

  // Loop through the data object to calculate totals
  Object.values(data).forEach((item) => {
    switch (item.type) {
      case 'walking':
        walkingCount += item.distance;
        break;
      case 'vehicle':
        vehicleCount += item.distance;
        break;
      case 'cycling':
        cyclingCount += item.distance;
        break;
      default:
        break;
    }
  });

  // Define data for the pie chart
  const pieData = {
    labels: ['Walking', 'Vehicle', 'Cycling'],
    datasets: [
      {
        data: [walkingCount, vehicleCount, cyclingCount],
        backgroundColor: ['#FB388A', '#FFB6C1', '#DA70D6'],
        hoverBackgroundColor: ['#FB388A', '#FFB6C1', '#DA70D6'],
      },
    ],
  };

  return (
    <div>
      <Pie
        data={pieData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Distribution of Modes of Transport Used',
              font: {
                size: 20,
              },
            },
            legend: {
              display: true,
              position: 'right',
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
