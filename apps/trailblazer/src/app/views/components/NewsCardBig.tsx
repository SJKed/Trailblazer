import React from 'react';
import './stylesheets/NewsCardBig.scss'

function NewsCardBig() {
    return (
        <a target='_blank' href="https://discord.gg/mJutfJUfsD">
            <div className="NewsCardWrapper">
                <div className="NewsCardGlowLayer" />
                <div className="NewsCardContent">
                    <div className="NewsCardHeading">
                        <h1>POWERED BY DISCORD!</h1>
                    </div>
                    <div className="NewsCardBody">
                        <p>Join our Discord server to seamlessly connect with other userts to complete your Pokédex!</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default NewsCardBig;