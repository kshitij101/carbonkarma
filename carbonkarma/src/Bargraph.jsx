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
                label: 'Distance',
                backgroundColor: 'rgba(75,192,192,1)',
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
                    title: {
                        display: true,
                        text: 'Distance Travelled Over 7 Days',
                        fontSize: 20,
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                }}
            />
        </div>
    );
};

export default BarGraph;
