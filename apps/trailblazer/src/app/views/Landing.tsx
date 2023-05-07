import React, { useEffect } from 'react';
import '../stylesheets/Landing.scss';
import Cookies from 'js-cookie';
import { getUserDetails } from '../utils/api';

function LandingPage() {
    async function checkAuth() {
        const response = await getUserDetails();
        if (response && response.user) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        checkAuth().then((res) => {
            if (res) {
                window.location.href = `${process.env.NX_FRONTEND_URL}/dashboard`;
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

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