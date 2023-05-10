import React, { useEffect, useState } from 'react';
import './stylesheets/Trainercard.scss'
import scarletIcon from '../../../assets/images/Scarlet-icon.png';
import violetIcon from '../../../assets/images/Violet-icon.png';

function Trainercard(props: any) {

    const [user, setUser] = useState({
        username: '',
        gameLanguage: '',
        gameVersion: '',
        missingPokemon: [],
    })

    interface Trainercard {
        username: string,
        gameLanguage: string,
        gameVersion: string,
        missingPokemon: Array<Number>,
    }


    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    return (
        <div className={user.gameVersion === 'Scarlet' ? "Trainer-card scarlet-card" : "Trainer-card violet-card"} >
            <div className="left">
                <img src={user.gameVersion === 'Scarlet' ? scarletIcon : violetIcon} alt="game version icon" />
            </div>
            <div className="right">
                <div className="top-right">
                    <h2 className='username'>{user.username}</h2>
                    <p className='language'>{user.gameLanguage}</p>
                </div>
                <div className="bottom-right">
                    <p>{user.missingPokemon ? 'Incomplete Pokédex' : 'Pokédex Completed'}</p>
                </div>
            </div>
        </div>
    )
}

export default Trainercard