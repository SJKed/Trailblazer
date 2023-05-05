import { useState, useEffect } from 'react';
import { getUserDetails } from '../utils/api'
import Header from './components/Header';
import Cookies from 'js-cookie';

function Dashboard() {
    const [user, setUser] = useState({username: 'Unknown'});

    useEffect(() => {
        async function get() {
            try {
                const res = await getUserDetails();
                setUser(res.user);
            } catch (err) {
                window.location.href = `${process.env.FRONTEND_URL}}`;
            }
        }
        get();
    }, []);

    return (
        <div className="Dashboard">
            <Header user={user} />
            <main>
                <h1>{user.username}</h1>
            </main>
        </div>
    );
}

export default Dashboard;