import React from 'react';
import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarGraph = ({ data }) => {
    // Extract dates and distances from the data object
    const walkingData = Object.entries(data).reduce((acc, [date, entry]) => {
        if (entry.type === 'walking') {
            console.log(entry)
            acc[date] = entry.distance;
        }
        else {
            acc[date] = 0;
        }
        return acc;
    }, {});

    // Extract dates and distances for walking data
    const dates = Object.keys(walkingData);
    const distances = Object.values(walkingData);

    // Define the dataset for the bar graph
    const barData = {
        labels: dates,
        datasets: [
          {
            label: 'Walking Distance',
            backgroundColor: '#FB388A', // Pink color
            // borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: distances,
          },
          {
            label: 'Reduced Walking Distance',
            backgroundColor: 'rgba(251, 56, 138, 0.1)', // Light pink color
            // borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: distances.map(distance => distance * 0.8), // 0.8 times the original distance
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
                  text: 'Walking Distance Travelled Over Time',
                  font: {
                    size: 20,
                  },
                },
                legend: {
                  display: true,
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
    // const barData = {
    //     labels: dates,
    //     datasets: [
    //         {
    //             label: 'Distance',
    //             backgroundColor: '#FB388A', // Pink color
    //             borderColor: 'rgba(0,0,0,1)',
    //             borderWidth: 1,
    //             data: distances,
    //         },
    //     ],
    // };

    // return (
    //     <div>
    //       <Bar
    //         data={barData}
    //         options={{
    //           plugins: {
    //             title: {
    //               display: true,
    //               text: 'Walking Distance Travelled Over Time',
    //               font: {
    //                 size: 20,
    //               },
    //             },
    //             legend: {
    //               display: false,
    //             },
    //           },
    //           scales: {
    //             y: {
    //               beginAtZero: true,
    //             },
    //           },
    //         }}
    //       />
    //     </div>
    //   );
    
};

export default BarGraph;
