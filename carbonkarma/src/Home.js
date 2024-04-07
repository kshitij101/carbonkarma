import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling

const HomePage = () => {
    return (
        <div className="container">
            <div className="left-column">
                <div className="circle"></div>
            </div>
            <div className="right-column">
                <div className="svg-container">
                    {/* Replace this with your SVG component */}
                    <svg width="100" height="100">
                        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default HomePage;