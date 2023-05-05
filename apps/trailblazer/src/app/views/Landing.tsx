import React from 'react';
import '../stylesheets/Landing.scss';
import Cookies from 'js-cookie';

function LandingPage() {
    // if a valid discord-auth cookie already exists, redirect to the dashboard
    if (Cookies.get('api-auth')) {
        window.location.href = '/dashboard';
    }

    return (
        <div className="landing">
            <header className='Landing-header'>
                <h1>Trailblazer</h1>
                <h2>Pokémon Scarlet & Violet trade finder</h2>
            </header>
            <main>
                <button
                    className='Landing-button'
                    onClick={() => window.location.href = `${process.env.NX_API_URL}/auth/discord`}
                >
                    Login with Discord
                </button>
            </main>
        </div>
    );
}

export default LandingPage;