import '../stylesheets/Shared-view-main.scss'
import '../stylesheets/Home.scss'
import React from 'react'
import { getAllUsers } from '../utils/api'


function Home () {
    async function getUsers() {
        await getAllUsers().then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className="View-main-component">
            <h1>Home</h1>
            <button
                onClick={() => getUsers()}
            >
                gangnam
            </button>
        </div>
    )
}

export default Home