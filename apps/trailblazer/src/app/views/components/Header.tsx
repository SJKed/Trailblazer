import React, { useEffect } from 'react';
import './stylesheets/Header.scss';
import koraidon from '../../../assets/images/Koraidon.png';
import miraidon from '../../../assets/images/Miraidon.png';


const Header = () => {

    function moveImage(e: any) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const koraidon = document.querySelector('.Half-one img') as HTMLElement;
        const miraidon = document.querySelector('.Half-two img') as HTMLElement;
        if (!koraidon || !miraidon) return console.log('No image found');
        koraidon.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
        miraidon.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    }

    useEffect(() => {
        document.addEventListener('mousemove', moveImage);
    }, []);


    return (
        <header className="Dashboard-header">
            <div className='Half-one'>
                <img src={koraidon} alt="Image of Koraidon" />
            </div>
            <div className='Half-two'>
                <img src={miraidon} alt="Image of Miraidon" />
            </div>
            <div className='Header-text'>
                <h1>TRAILBLAZER</h1>
                <p>FOR A BRIGHTER TOMORROW</p>

            </div>
        </header>
    )
}

export default Header;