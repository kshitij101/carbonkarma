import React from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarGraph = ({ data }) => {
    // Extract dates and distances from the data object
    const walkingData = Object.entries(data).reduce((acc, [date, entry]) => {
      acc[date] = entry.emission;
        return acc;
    }, {});

    // Extract dates and distances for walking data
    const dates = Object.keys(walkingData);
    const distances = Object.values(walkingData);

    const barData = {
        labels: dates,
        datasets: [
            {
                label: 'Distance',
                backgroundColor: '#FB388A', // Pink color
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: distances,
            },
        ],
    };

    return (
        <div>
          <Bar
            data={barData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Carbon credits saved',
                  font: {
                    size: 12,
                  },
                  color: '#FFFFFF'
                },
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      );
    
};

export default BarGraph;
