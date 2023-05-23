import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../utils/api';
import '../stylesheets/Profile.scss'
import { redirect, Link } from 'react-router-dom';
import ProfileCardBig from './components/ProfileCardBig';
import ProfileCardSmall from './components/ProfileCardSmall';

function Profile() {
    const [user, setUser] = useState({ username: 'Temp name', gameLanguage: 'ENG', gameVersion: 'Scarlet'})
    function moveBackgroundImage(e: MouseEvent) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const backgroundImage = document.querySelector('.ProfileBackground') as HTMLElement;
        if (!backgroundImage) return console.log('No background image');
        backgroundImage.style.backgroundPosition = `calc(20% + ${x * -50}px) calc(70% + ${y * -50}px)`;
    }

    // const somethingChanged = () => { When a user attribute changes to something new, this function will be called. }
    const somethingChanged = (newUser: any) => {
        if (newUser !== user) {
            setUser(newUser);
        }
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
            window.location.href = `${process.env.NX_FRONTEND_URL}`;
        });
    }, []);

    return (
        <div className="ProfileWrapper">
            <div className='ProfileBackground' />
            <div className="ProfileLeftSideFade" />
            <div className="ProfileRightSideFade" />
            <div className="ProfileContentWrapper">
                <div className="LeftSide">
                    <div className="HotLinks">
                        <Link to="/frontpage">
                            <h2 className='ProfileLink'>
                                HOME
                            </h2>
                        </Link>
                        <Link to="/trades">
                            <h2 className='ProfileLink'>
                                TRADES
                            </h2>
                        </Link>
                    </div>
                    <div className="ProfileCardSmallProfile">
                        {user.gameLanguage && user.gameVersion &&
                            <ProfileCardSmall user={user} className="ProfileCardSmall ProfileVariant" />
                        }
                    </div>
                </div>
                <div className="RightSide">
                    <ProfileCardBig user={user} somethingChanged={somethingChanged}/>
                </div>
            </div>
        </div>
    )
}

export default Profile