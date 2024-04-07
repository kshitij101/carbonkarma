import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Analytics from './Analytics';
import Navigation from './Navigation'; // Import Navigation component
import './App.css';
import { AnalyticsProvider } from './context/AnalyticsContext';


const App = () => {
  return (
    <Router>
      <div className='gradient-background'>
        <div className='container'>
        <AnalyticsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/analytics" element={<Analytics />} />
            
            
          </Routes>

          </AnalyticsProvider>
        </div>

      </div>
    </Router>
  );
}

export default App;
