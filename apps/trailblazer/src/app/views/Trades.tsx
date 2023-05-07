import React from 'react';
import '../stylesheets/Trades.scss';
import '../stylesheets/Shared-view-main.scss';
import { getAllUsers } from '../utils/api';

function Trades() {
    async function getUsers() {
        await getAllUsers().then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="View-main-component">
            <h1>Trades</h1>
            <button onClick={() => getUsers()}>Get users</button>
        </div>
    )
}

export default Trades