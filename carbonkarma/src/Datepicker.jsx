
import React, {useState, useContext, useEffect } from 'react';
import { getEmailObjects, processObjectsUnGrouped, getTotalDistanceByTypeAndDate, generateRandomData, getUserData } from './utils/util'; // Import the function
import DatePicker from 'react-datepicker';
import { withAuthInfo } from '@propelauth/react'
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';
import AnalyticsContext from './context/AnalyticsContext';

const DateRangePicker = withAuthInfo((props) => {
    const { analyticsData, updateAnalyticsData } = useContext(AnalyticsContext);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = async (date, isStartDate) => {
        
        if (isStartDate) {
            setStartDate(date);
        } else {
            setEndDate(date);
            setShowPicker(false);
         
            const totalDistance = getUserData(props.user?.email, startDate.toISOString(), date.toISOString());
            console.log(totalDistance)
            // const totalDistance = getTotalDistanceByTypeAndDate('bankerprem3@gmail.com', startDate.toISOString(), date.toISOString());
            // console.log(getUserData('bankerprem3@gmail.com', startDate.toISOString(), date.toISOString()));
            
            console.log(generateRandomData(props.user?.email, startDate.toISOString(), date.toISOString()));
            
            updateAnalyticsData(totalDistance);
        }
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    return (
        <div>
            
            <div className='datepicker-row' onClick={togglePicker}>
                {startDate && endDate ? (
                    `< ${startDate.toDateString()} - ${endDate.toDateString()} >`
                ) : (
                    "Select Date Range"
                )}
            </div>
            {showPicker && (
                <div className='datepicker-row'>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => handleDateChange(date, true)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => handleDateChange(date, false)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End Date"
                    />
                </div>
            )}    
            </div>
            

    );
});

export default DateRangePicker;
