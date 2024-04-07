import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling
import hero from './assets/homehero.svg'; // Import the SVG file
import { withAuthInfo,  useRedirectFunctions, useLogoutFunction } from '@propelauth/react'

const HomePage = withAuthInfo((props) => {

    const logoutFunction = useLogoutFunction();

    const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();


    return (
        <div className='all-home'>
            {props.isLoggedIn ? (
                <button className="logout-button" onClick={() => logoutFunction(true)}>Logout</button>
                // <div className='nav-text'>{props.user.email} | Logout</div>
            ) : (
                <button className="logout-button"  onClick={() => redirectToLoginPage()}>Login</button>
            )}

            <div className="home-container">


                <div className="left-column">

                    <div className="circle"></div>
                    <div className="home-title">Sustainance <br></br> for our Earth</div>
                    <div className="home-subtitle">By Team 23</div>
                    <button className="login-button" onClick={() => redirectToLoginPage()}>Login</button>
                </div>
                <div className="right-column">
                    <div className="svg-container">
                        {/* Replace this with your SVG component */}
                        <img src={hero} alt="Logo" />
                    </div>
                </div>
            </div>
        </div>

    );
})

export default HomePage;