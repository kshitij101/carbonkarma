import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarbonFootprintCalculator from './components/CarbonFootprintCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Carbon Footprint Calculator</h1>
      </header>
      <CarbonFootprintCalculator />
    </div>
  );
}

export default App;
