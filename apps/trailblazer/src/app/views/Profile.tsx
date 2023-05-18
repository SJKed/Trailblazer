import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../utils/api';
import '../stylesheets/Profile.scss'
import { redirect } from 'react-router-dom';
import ProfileCardBig from './components/ProfileCardBig';

function Profile() {
    const [user, setUser] = useState({ username: 'Temp name', id: 1, discordid: '1231321', email: 'email@email.com', })
    function moveBackgroundImage(e: MouseEvent) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const backgroundImage = document.querySelector('.ProfileBackground') as HTMLElement;
        if (!backgroundImage) return console.log('No background image');
        backgroundImage.style.backgroundPosition = `calc(20% + ${x * -50}px) calc(70% + ${y * -50}px)`;
    }

    async function checkAuth() {
        const response = await getUserDetails();
        if (response) { return response }
    }   

    useEffect(() => {
        document.addEventListener('mousemove', moveBackgroundImage);
        checkAuth().then((res) => {
            setUser(res.user);
        }).catch((err) => {
            // redirect to login page
            redirect(`${process.env.NX_FRONTEND_URL}`);
        });
    }, []);

    return (
        <div className="Wrapper">
            <div className='ProfileBackground' />
            <div className="ProfileLeftSideFade" />
            <div className="ProfileRightSideFade" />
            <div className="ProfileContentWrapper">
                <div className="LeftSide">
                    <ProfileCardBig user={user} />
                </div>
                <div className="RightSide">
                </div>
            </div>
        </div>
    )
}

export default Profile