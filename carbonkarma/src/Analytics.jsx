
import React, { useEffect } from 'react';
import { getEmailObjects, getTotalDistanceByTypeAndDate } from './utils/util'; // Import the function
// import './Analytics.css'; // Assuming you have a CSS file for styling



const Analytics = () => {
    useEffect(() => {
        // Get date 7 days ago
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 45);
        const toDate = new Date();

        // Call getTotalDistanceByTypeAndDate with start date as 7 days ago and end day as today
        const totalDistance = getTotalDistanceByTypeAndDate('bankerprem3@gmail.com', fromDate.toISOString(), toDate.toISOString());
        // const emailobjects = getEmailObjects('bankerprem3@gmail.com')
        
        console.log(totalDistance);
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div>
            <h2>Analytics Page</h2>
            {/* Add your analytics page content here */}
        </div>
    );
}

export default Analytics;