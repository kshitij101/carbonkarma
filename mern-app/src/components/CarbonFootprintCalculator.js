import React, { useState } from 'react';
import axios from 'axios';

const CarbonFootprintCalculator = () => {
  const [modeOfTransport, setModeOfTransport] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [distance, setDistance] = useState('');

  const handleTransportChange = (e) => {
    setModeOfTransport(e.target.value);
    setFromLocation('');
    setToLocation('');
    setDistance('');
  };

  const calculateExpense = (response) => {
    let emissionValue = response.data.attributes.carbon_lb
    // let allEmissions = [0.28,3.7,0.03,1.2,0.11,0.89];
    let allEmissions = [1200, 800, 1500, 900];
    let baseline_emission = 1000

    // Calculate the average emission value across all users
    const avgEmission = allEmissions.reduce((total, currentValue) => total + currentValue, 0) / allEmissions.length;

    // Adjust the baseline emission value based on the average emission
    const adjustedBaseline = baseline_emission * (avgEmission / baseline_emission);

    // Calculate the deviation from the baseline emission
    const deviation = emissionValue - adjustedBaseline;

    // Map the deviation to a score using an exponential decay function
    const score = 1000 * Math.exp(-0.1 * deviation);

    console.log("SCORE",score);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let requestBody;
    if (modeOfTransport === 'flight') {
      requestBody = {
        type: 'flight',
        legs: [
          { departure_airport: fromLocation, destination_airport: toLocation }
        ]
      };
    } else {
      requestBody = {
        type: 'vehicle',
        distance_unit: 'mi',
        distance_value: parseFloat(distance),
        vehicle_model_id: '7268a9b7-17e8-4c8d-acca-57059252afe9'
      };
    }
    try {
      const response = await axios.post(
        'https://www.carboninterface.com/api/v1/estimates',
        requestBody,
        {
          headers: {
            Authorization: 'Bearer 3Nv9SU206leKYrVS3vcIA',
            'Content-Type': 'application/json'
          }
        }
      );
      calculateExpense(response.data); // You can handle the response accordingly
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="modeOfTransport">Select Mode of Transport</label>
          <select
            className="form-control"
            id="modeOfTransport"
            onChange={handleTransportChange}
            value={modeOfTransport}
          >
            <option value="">Select</option>
            <option value="vehicle">Vehicle</option>
            <option value="flight">Flight</option>
            <option value="cycle">Cycle</option>
            <option value="walk">Walk</option>
            <option value="public transport">Public Transport</option>
          </select>
        </div>
        {modeOfTransport === 'flight' ? (
          <>
            <div className="form-group">
              <label htmlFor="fromLocation">From</label>
              <select
                className="form-control"
                id="fromLocation"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              >
                <option value="">Select</option>
                <option value="sfo">SFO</option>
                <option value="yyz">YYZ</option>
                <option value="bom">BOM</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="toLocation">To</label>
              <select
                className="form-control"
                id="toLocation"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              >
                <option value="">Select</option>
                <option value="sfo">SFO</option>
                <option value="yyz">YYZ</option>
                <option value="bom">BOM</option>
              </select>
            </div>
          </>
        ) : (
          <div className="form-group">
            <label htmlFor="distance">Enter Distance (in miles)</label>
            <input
              type="number"
              className="form-control"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CarbonFootprintCalculator;
