import React from 'react';
import './stylesheets/Header.scss';

const Header = (props: any) => {
    return (
        <header className="Dashboard-header">
            <div className='Half-one'></div>
            <div className='Half-two'></div>
            <div className='Header-text'>
                <h1>Tradetrail Dashboard</h1>
            </div>
            <h2>Welcome</h2>
        </header>
    )
}

export default Header;