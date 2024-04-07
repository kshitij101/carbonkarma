import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Analytics from './Analytics';
import Navigation from './Navigation'; // Import Navigation component
import './App.css';

const App = () => {
    return (
        <Router>
            <div className='gradient-background'>
              <div className='container'>
              <Navigation /> {/* Render Navigation component */}
                <Routes>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/analytics" component={Analytics} />
                </Routes>
              </div>
                
            </div>
        </Router>
    );
}

export default App;
