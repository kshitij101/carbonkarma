
import React, { useContext, useEffect } from 'react';
import { getEmailObjects, getTotalDistanceByTypeAndDate } from './utils/util'; // Import the function
import DateRangePicker from './Datepicker';
import { withAuthInfo } from '@propelauth/react'
import './Analytics.css';
import AnalyticsContext from './context/AnalyticsContext';
import hero from './assets/analyticshero.svg'; // Import the SVG file
import BarGraph from './Bargraph';

// import './Analytics.css'; // Assuming you have a CSS file for styling



const Analytics = withAuthInfo((props) => {

    function calculateTotalTravel(data) {
        let totalTravel = 0;
        for (const key in data) {
            totalTravel += data[key].distance;
        }
        return totalTravel;
    }
    
    // Function to calculate total walking distance
    function calculateGreenTravel(data) {
        let walkingTravel = 0;
        for (const key in data) {
            if (data[key].type === 'walking' || data[key].type === 'cycling' ) {
                walkingTravel += data[key].distance;
            }
        }
        return walkingTravel;
    }


    // function calculateTotalTravel(travelData) {
    //     if (travelData != null)
    //         return Object.values(travelData).reduce((sum, value) => sum + value, 0);
    //     return 0;

    // }


    // function calculateTotalTravel(travelData) {
    //     if (travelData != null)
    //         return Object.values(travelData).reduce((sum, value) => sum + value, 0);
    //     return 0;

    // }

    // function calculateTotalGreenTravel(travelData) {
    //     if (travelData != null)
    //         return Object.values(travelData).reduce((sum, value) => sum + value, 0);
    //     return 0;

    // }



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
                            <div>{calculateGreenTravel(analyticsData)}</div>
                        </div>
                    </div>

                </div>
                <div className="second-column">
                    <div className='graph-title'> Your Total travel </div>

                    <div className='graph-subtitle'> {calculateTotalTravel(analyticsData)} </div>


                    <BarGraph data={analyticsData} />

                </div>

            </div>




        </div>
    );
})

export default Analytics;