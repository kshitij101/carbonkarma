
import React, { useContext, useEffect } from 'react';
import { getEmailObjects, getTotalDistanceByTypeAndDate } from './utils/util'; // Import the function
import DateRangePicker from './Datepicker';
import { withAuthInfo } from '@propelauth/react'
import AnalyticsContext from './context/AnalyticsContext';

// import './Analytics.css'; // Assuming you have a CSS file for styling



const Analytics = withAuthInfo((props) => {

    function calculateTotalTravel(travelData) {
        if (travelData != null)
            return Object.values(travelData).reduce((sum, value) => sum + value, 0);
        return 0;
    
        }

    const { analyticsData, updateAnalyticsData } = useContext(AnalyticsContext);


    return (
        <div>
            <DateRangePicker></DateRangePicker>
            <h2>Analytics Page</h2>
            <p>analytics:  {calculateTotalTravel(analyticsData)} </p>
            {/* Add your analytics page content here */}
        </div>
    );
})

export default Analytics;