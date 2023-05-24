import React from 'react';
import './stylesheets/NewsCardSmall.scss'

function NewsCardSmall() {
    return (
        <a target='_blank' href="https://discord.gg/mJutfJUfsD">
            <div className="NewsCardSmallWrapper">
                <div className="NewsCardSmallGlowLayer" />
                <div className="NewsCardSmallContent">
                    <div className="NewsCardSmallHeading">
                        <h1>CLICK HERE!</h1>
                    </div>
                    <div className="NewsCardSmallBody">
                        <p>To join our Discord Server</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default NewsCardSmall;