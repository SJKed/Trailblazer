import { useState, useEffect } from 'react';
import { getUserDetails } from '../utils/api'
import { Header, Footer } from './components';
import { Profile, Trades } from './subviews';
import '../stylesheets/Dashboard.scss';
import Cookies from 'js-cookie';

function Dashboard() {
    const [user, setUser] = useState({ username: 'Temp name', id: 1, discordid: '1231321', email: 'email@email.com', gameLanguage: 'ENG', gameVersion: 'Scarlet', missingPokemon: [1, 2, 3] })
    const [view, setView] = useState('profile');

    async function checkAuth() {
        const response = await getUserDetails();
        if (response) { return response }
    }

    function logOut() {
        Cookies.remove('api-auth');
        window.location.href = `${process.env.NX_FRONTEND_URL}`;
        return false;
    }

    useEffect(() => {
        checkAuth().then((res) => {
            setUser(res.user);
        }).catch((err) => {
            window.location.href = `${process.env.NX_FRONTEND_URL}`;
        });
    }, []);

    return (
        <div className="Dashboard">
            <div className="Nav-bar">
                <button onClick={() => setView('home')}>Home</button>
                <button onClick={() => setView('news')}>News</button>
                <button onClick={() => setView('trades')}>Trades</button>
                <div className="Account-options">
                    <button onClick={() => setView('profile')}>{user.username}</button>
                    <button onClick={() => logOut()}>Log out</button>
                </div>
            </div>
            <Header />
            <main>

                <div className="View">
                    {/* {view === 'news' && <News />} */}
                    {view === 'trades' && <Trades />}
                    {view === 'profile' && <Profile user={user} />}
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;