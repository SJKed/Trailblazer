import React, { useState, useEffect } from 'react';
import { getUserDetails, getAllUsers } from '../utils/api';
import ProfileCardSmall from './components/ProfileCardSmall'
import { Link } from 'react-router-dom';
import '../stylesheets/Trades.scss'
import { Modal } from '@mui/base';
import { Dialog } from '@mui/material';

function Trades() {
    const [user, setUser] = useState({ username: 'Temp name', id: 1, discordid: '1231321', email: 'email@email.com', gameLanguage: 'ENG', gameVersion: 'Scarlet', missingPokemon: [1, 2, 3], online: true })
    const [users, setUsers] = useState([]);

    async function checkAuth() {
        const response = await getUserDetails();
        if (response) { return response }
    }

    useEffect(() => {
        checkAuth().then((res) => {
            setUser(res.user);
        }).catch((err) => {
            window.location.href = `${process.env.NX_FRONTEND_URL}`;
        });

        getAllUsers().then((res) => {
            setUsers(res);
        }).catch((err) => {
            console.log(err);
        });
    }, []);



    return (
        <div className="TradesWrapper">
            {user.online === false &&
                <Dialog open={true}>
                    <div className="TradesDialog">
                        {/* add close button  */}
                        <button onClick={() => { window.location.href = `${process.env.NX_FRONTEND_URL}/frontpage` }}>X</button>
                        <h1>You're offline on Discord!</h1>
                        <h2>To use Trailblazers' trading function, you need to be a member of the Trailblazer Discord server and appear online. After changing your Discord status, it may take a few moments for the Trailblazers server to recognize the change.</h2>
                        <h2>Click <a target="_blank" href="https://discord.gg/mJutfJUfsD">here</a> to join the Trailblazer Discord server.</h2>
                    </div>
                </Dialog>
            }
            <div className="TradesBackground" />
            <div className="TradesLeftSideFade" />
            <div className="TradesRightSideFade" />
            <div className="TradesContentWrapper">
                <div className="TradesLeftSide">
                    <div className="HotLinks">
                        <Link to={`/frontpage`}>
                            <h2>HOME</h2>
                        </Link>
                    </div>
                    <div className="TradesFilter">
                        <div className="Filter"></div>
                    </div>
                </div>
                <div className="TradesRightSide">
                    <div className="TradesRightSideContentHeader">
                        <h1>Available Trainers</h1>
                    </div>
                    <div className="TradesRightSideContent">
                        {users?.map((user: any) => {
                            return (
                                <div className="TradeProfileCards" key={user.id}>
                                    <ProfileCardSmall user={user} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trades;