import React, { useEffect, useState } from 'react';
import '../stylesheets/Trades.scss';
import '../stylesheets/Shared-view-main.scss';
import { getAllUsers } from '../utils/api';
import Trainercard from './components/Trainercard';


function Trades() {
    const [users, setUsers] = useState([])

    async function getUsers() {
        await getAllUsers().then((res) => {
            setUsers(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUsers()
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