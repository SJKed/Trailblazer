import React, { useEffect, useState } from 'react';
import '../stylesheets/Trades.scss';
import '../stylesheets/Shared-view-main.scss';
import { getAllUsers } from '../utils/api';
import Trainercard from './components/Trainercard';


function Trades() {
    const [users, setUsers] = useState([{
        username: 'SJK',
        gameLanguage: 'ENG',
        gameVersion: 'Scarlet',
        missingPokemon: [1, 2, 3]
    },
    {
        username: 'SJK',
        gameLanguage: 'ENG',
        gameVersion: 'Scarlet',
        missingPokemon: [1, 2, 3]
    },
    {
        username: 'SJK',
        gameLanguage: 'ENG',
        gameVersion: 'Scarlet',
        missingPokemon: [1, 2, 3]
    },
    {
        username: 'SJK',
        gameLanguage: 'ENG',
        gameVersion: 'Scarlet',
        missingPokemon: [1, 2, 3]
    },
    {
        username: 'xXxSasukeUchiha420xXx',
        gameLanguage: 'JP',
        gameVersion: 'Violet',
        missingPokemon: [1001, 937, 938]
    }])

    async function getUsers() {
        await getAllUsers().then((res) => {
            console.log(res)
            setUsers(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        // getUsers()
    }, [])


    return (
        <div className="View-main-component">
            <h1>Available Trainers</h1>
            <div className="Trades-wrapper">
                <div className="Filter-container">
                    <div className="Filter"></div>
                </div>
                <div className="Trainer-cards-container">
                    {users?.map((user: any) => {
                        return (
                            <Trainercard user={user} key={user.username} className="Trainer-card" />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Trades