
import React, { useContext, useEffect } from 'react';
import { getEmailObjects, getTotalDistanceByTypeAndDate } from './utils/util'; // Import the function
import DateRangePicker from './Datepicker';
import { withAuthInfo } from '@propelauth/react'
import './Analytics.css';
import AnalyticsContext from './context/AnalyticsContext';
import hero from './assets/analyticshero.svg'; // Import the SVG file

// import './Analytics.css'; // Assuming you have a CSS file for styling



const Analytics = withAuthInfo((props) => {

    function calculateTotalTravel(travelData) {
        if (travelData != null)
            return Object.values(travelData).reduce((sum, value) => sum + value, 0);
        return 0;

    }

    function calculateTotalGreenTravel(travelData) {
        if (travelData != null)
            return Object.values(travelData).reduce((sum, value) => sum + value, 0);
        return 0;

    }



    const { analyticsData, updateAnalyticsData } = useContext(AnalyticsContext);


    return (
        <div>
            <DateRangePicker></DateRangePicker>
            <div className='analytics-parent'>
                <div className="first-column">
                    <div className='title-text'>Welcome Back, {props.user.firstName}</div>

                    calculateTotalGreenTravel
                    <div className="svg-container">
                        {/* Replace this with your SVG component */}
                        <img src={hero} alt="Logo" />
                    </div>


                    <div className='subtitle-text'>You traveled  {calculateTotalTravel(analyticsData)} km in the selected time</div>


                    <div className="stat-row">
                        <div className="stat-column">
                            <div>Total Travel</div>
                            <div>{calculateTotalTravel(analyticsData)}</div>
                        </div>
                        <div className="stat-column2">
                            <div>Total Green Travel</div>
                            <div>{calculateTotalGreenTravel(analyticsData)}</div>
                        </div>
                    </div>

                </div>
                <div className="second-column">
                    <div className='graph-title'> Your Total travel </div>

                    <div className='graph-subtitle'> Your Total travel </div>

                </div>

            </div>




        </div>
    );
})

export default Analytics;