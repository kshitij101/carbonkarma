import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/analytics">Analytics</Link>
        </div>
    );
}

export default Navigation;
