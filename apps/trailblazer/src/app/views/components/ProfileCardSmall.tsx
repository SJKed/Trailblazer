import React, { useEffect, useState } from 'react';
import './stylesheets/ProfileCardSmall.scss';
import MiraidonIcon from '../../../assets/images/Violet-icon.png';
import KoraidonIcon from '../../../assets/images/Scarlet-icon.png';
import TrailblazerIcon from '../../../assets/icons/Trailblazer.png';
import { sendTradeRequest } from '../../utils/api';
import { Dialog } from '@mui/material';

function ProfileCardSmall(props: any) {
    const [user, setUser] = useState(props.user);
    const [dialog, setDialog] = useState(false);


    useEffect(() => {
        setUser(props.user);
        console.log(props.user);
    }, [props.user]);

    // if clicking outside of the dialog, close it
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (e.target.className === 'SmallProfileCardDialog') {
                setDialog(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="SmallProfileCardWrapper">
            <div className="SmallProfileCard" onClick={() => {
                props.showMobileDialog(user)
            }}>
                <div className="SmallProfileCardAvatar">
                    <img
                        src={
                            user.gameVersion === 'Scarlet'
                                ? KoraidonIcon
                                : user.gameVersion === null
                                    ? TrailblazerIcon
                                    : MiraidonIcon
                        }
                        alt="Avatar"
                    />
                </div>
                <div className="SmallProfileCardContent">
                    <div className="SmallProfileCardTop">
                        <h2>{user?.username}</h2>
                        <h3>{user?.gameLanguage}</h3>
                    </div>
                    <div className="SmallProfileCardBottom">
                        <p>
                            {user?.missingPokemon === null || user?.missingPokemon === undefined
                                ? 'Pokedex Incomplete'
                                : user?.missingPokemon.length === 0
                                    ? 'Pokedex Completed'
                                    : `Pokedex Incomplete ${400 - user.missingPokemon.length} / 400`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCardSmall;
