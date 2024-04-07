import React, { createContext, useState } from 'react';

// Create the context
const AnalyticsContext = createContext();

// Create the context provider
export const AnalyticsProvider = ({ children }) => {
  // State or functions related to analytics
  const [analyticsData, setAnalyticsData] = useState({
    "4/2/2024": {
      "type": "walking",
      "distance": 0
    },
  });

  // Define functions to update analytics data    
  const updateAnalyticsData = (data) => {

    setAnalyticsData(data);
  };

  // Provide the context value
  return (
    <AnalyticsContext.Provider value={{ analyticsData, updateAnalyticsData }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Export the context and its consumer
export default AnalyticsContext;
