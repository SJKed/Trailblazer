import React, { useState, useEffect } from 'react';
import { getUserDetails, getAllUsers } from '../utils/api';
import ProfileCardSmall from './components/ProfileCardSmall'
import { Link } from 'react-router-dom';
import '../stylesheets/Trades.scss'
import { Dialog, Button } from '@mui/material';
import { sendTradeRequest } from '../utils/api';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MessageIcon from '@mui/icons-material/Message';


function Trades() {
    const [user, setUser] = useState({ username: 'Temp name', id: 1, discordid: '1231321', email: 'email@email.com', gameLanguage: 'ENG', gameVersion: 'Scarlet', missingPokemon: [1, 2, 3], online: true })
    const [users, setUsers] = useState([]);
    const [filterOnline, setFilterOnline] = useState(false);
    const [filterMissingPokemon, setFilterMissingPokemon] = useState(false);
    const [showMobileDialog, setShowMobileDialog] = useState(false);
    const [dialogUser, setDialogUser] = useState({ username: '', id: 0, discordid: '', email: '', gameLanguage: '', gameVersion: '', missingPokemon: [], online: true });

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

    useEffect(() => {
        if (filterOnline) {
            const filteredUsers = users.filter((user: any) => {
                return user.online === true;
            });
            setUsers(filteredUsers);
        } else {
            getAllUsers().then((res) => {
                setUsers(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [filterOnline]);

    useEffect(() => {
        console.log(user)
    }, [user]);

    const handleShowMobileDialog = (emit: any) => {
        console.log(emit)
        setShowMobileDialog(!showMobileDialog);
        setDialogUser(emit);
    }

    return (
        <div className="TradesWrapper">
            {user.online === false &&
                <Dialog open={true}>
                    <div className="TradesDialog">
                        <button onClick={() => { window.location.href = `${process.env.NX_FRONTEND_URL}/frontpage` }}>X</button>
                        <h1>You're offline on Discord!</h1>
                        <h2>To use Trailblazers' trading function, you need to be a member of the Trailblazer Discord server and appear online. After changing your Discord status, it may take a few moments for the Trailblazers server to recognize the change.</h2>
                        <h2>Click <a target="_blank" href="https://discord.gg/mJutfJUfsD">here</a> to join the Trailblazer Discord server.</h2>
                    </div>
                </Dialog>
            }
            {showMobileDialog &&
                <Dialog open={true}>
                    <div className="SmallProfileCardDialogMobile">
                        {/* display a scrollable list of all missingPokemon */}
                        <div className="SmallProfileCardDialogLeftMobile">
                            <h2>{dialogUser?.username}</h2>
                            <p>This trainer is looking for:</p>
                            {dialogUser?.missingPokemon?.length > 0 ? (
                                <div className="SmallProfileCardDialogMissingListMobile">
                                    {dialogUser?.missingPokemon?.map((p: any) => (
                                        <div className="SmallProfileCardDialogMissingListItemMobile">
                                            <img src={p.sprite} alt="sprite of a pokemon" />
                                            <p>{p.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                                :
                                (
                                    <p>This trainer has completed their pokedex!</p>
                                )
                            }
                        </div>
                        <div className="SmallProfileCardDialogButtonsMobile">
                            <Button
                                variant="contained"
                                size='large'
                                onClick={() => {
                                    setShowMobileDialog(false);
                                }}
                            >
                                <CloseIcon />
                            </Button>

                            <Button
                                variant="contained"
                                size='large'
                                onClick={() => {
                                    sendTradeRequest(dialogUser);
                                }}
                            >
                                <SwapHorizIcon />
                            </Button>

                            <Button
                                variant="contained"
                                size='large'
                            >
                                <MessageIcon />
                            </Button>
                        </div>
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
                </div>
                <div className="TradesRightSide">
                    <div className="TradesRightSideContentHeader">
                        <h1>Available Trainers</h1>
                        <div className="TradesFilter">
                            <div className={filterMissingPokemon ? 'TradesFilterItem FilterToggled' : 'TradesFilterItem'} onClick={() => { setFilterMissingPokemon(!filterMissingPokemon); }}>
                                <p>Only Trainers with Pokemon you need</p>
                            </div>
                        </div>
                    </div>
                    <div className="TradesRightSideContent">
                        {users?.map((user: any) => {
                            return (
                                <div className="TradeProfileCards" key={user.id}>
                                    <ProfileCardSmall user={user} showMobileDialog={handleShowMobileDialog} />
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