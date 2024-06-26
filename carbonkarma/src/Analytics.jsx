
import React, { useContext, useEffect } from 'react';
import { getEmailObjects, getTotalDistanceByTypeAndDate } from './utils/util'; // Import the function
import DateRangePicker from './Datepicker';
import { withAuthInfo } from '@propelauth/react'
import './Analytics.css';
import AnalyticsContext from './context/AnalyticsContext';
import hero from './assets/analyticshero.svg'; // Import the SVG file
import BarGraph from './Bargraph';
import PieChart from './Piechart';

// import './Analytics.css'; // Assuming you have a CSS file for styling



const Analytics = withAuthInfo((props) => {

    function calculateTotalTravel(data) {
        let totalTravel = 0;
        for (const key in data) {
            totalTravel += data[key].distance;
        }
        return totalTravel;
    }


    function calculateTotalEmissions(data) {
        let totalTravel = 0;
        for (const key in data) {
            totalTravel += data[key].emission;
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


    const addCredits = async (payload) => {
        let jsonpayload = {};
        jsonpayload[props.user?.email] = payload;

        try {
          const response = await fetch('https://server.carbonkarma.tech/api/v1/smartcontract/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
            body: JSON.stringify(jsonpayload),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log('Response:', data);
          window.alert('Credit added successful!');
          // Handle the response data as needed
        } catch (error) {
          console.error('Error:', error.message);
          // Handle errors
        }
      };

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
                    <div className='title-text'>Welcome Back, {props.user?.firstName  }</div>


                    <div className="svg-container">
                        {/* Replace this with your SVG component */}
                        <img src={hero} alt="Logo" />
                    </div>


                    <div className='subtitle-text'>You traveled  {calculateTotalTravel(analyticsData)} miles in the selected time</div>


                    <div className="stat-row">
                        <div className="stat-column">
                            <div>Total Travel</div>
                            <div>{calculateTotalTravel(analyticsData)} miles</div>
                        </div>
                        <div className="stat-column2">
                            <div>Total Green Travel</div>
                            <div>{calculateGreenTravel(analyticsData)} miles</div>
                        </div>
                    </div>


                    <button className="submit-button" onClick={() => addCredits(analyticsData)} >Add credits</button>

                </div>
                <div className="second-column">
                    {/* <div className='graph-title'> Your Total travel </div> */}

                    <div className='graph-subtitle'> {calculateTotalEmissions(analyticsData)} </div>


                    <BarGraph data={analyticsData} />

                    <br></br>
                    <PieChart data={analyticsData} />

                </div>

            </div>




        </div>
    );
})

export default Analytics;