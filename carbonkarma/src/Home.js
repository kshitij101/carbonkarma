import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling
import hero from './assets/homehero.svg'; // Import the SVG file

const HomePage = () => {
    return (
        <div className="container">
            <div className="left-column">
              
                <div className="circle"></div>
                <div className="home-title">Sustainance <br></br> for our Earth</div>
                <div className="home-subtitle">By Team 23</div>
                <button class="login-button">Login</button>
            </div>
            <div className="right-column">
                <div className="svg-container">
                    {/* Replace this with your SVG component */}
                    <img src={hero} alt="Logo" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;