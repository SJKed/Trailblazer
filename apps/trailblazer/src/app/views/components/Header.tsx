import React from 'react';
import './stylesheets/Header.scss';
import koraidon from '../../../assets/images/Koraidon.png';
import miraidon from '../../../assets/images/Miraidon.png';


const Header = (props: any ) => {
    console.log(props)
    return (
        <header className="Dashboard-header">
            <div className='Half-one'>
                {/* <img src={koraidon} alt="Image of Koraidon" /> */}
            </div>
            <div className='Half-two'>
                {/* <img src={miraidon} alt="Image of Miraidon" /> */}
            </div>
            <div className='Header-text'>
                <h1>Tradetrail</h1>
            </div>
            <h2>Welcome {props.username}!</h2>
        </header>
    )
}

export default Header;