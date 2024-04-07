import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
    // Initialize counts for different transport types
    let walkingCount = 0;
    let vehicleCount = 0;
    let cyclingCount = 0;
    let flightCount = 0;
    let publicCount  = 0;

    // Loop through the data object to calculate totals
    Object.values(data).forEach((item) => {
        switch (item.type) {
            case 'walking':
                walkingCount += item.distance;
                break;
            case 'vehicle':
                vehicleCount += item.distance * 0.5;
                break;
            case 'cycling':
                cyclingCount += item.distance;
                break;
            case 'public_transport':
                publicCount += item.distance * 0.8;
                break;
            case 'flight':
                flightCount += item.distance * 0.03;
                break;
            default:
                break;
        }
    });

    // Define data for the pie chart
    const pieData = {
        labels: ['Walking', 'Vehicle', 'Cycling', 'Flights', 'Public Transport'],
        datasets: [
            {
                data: [walkingCount, vehicleCount, cyclingCount, flightCount, publicCount] ,
                backgroundColor: ['#FB388A', '#FFB6C1', '#DA70D6', '#FF00FF', '#800080' ],
                hoverBackgroundColor: ['#FB388A', '#FFB6C1', '#DA70D6', '#FF00FF', '#800080'],
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
