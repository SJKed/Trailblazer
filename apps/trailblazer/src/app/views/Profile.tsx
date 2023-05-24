import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../utils/api';
import '../stylesheets/Profile.scss'
import { redirect, Link } from 'react-router-dom';
import ProfileCardBig from './components/ProfileCardBig';
import ProfileCardSmall from './components/ProfileCardSmall';
import PokedexJSON from '../../assets/Pokedex.json'

function Profile() {
    const [user, setUser] = useState({ username: 'Temp name', gameLanguage: 'ENG', gameVersion: 'Scarlet' })
    const [pokedex, setPokedex] = useState(PokedexJSON.pokemon_entries)

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

    async function addSpriteAndIdsToPokedex(pokedex: any) {
        const api = 'https://pokeapi.co/api/v2/pokemon/';
        // pokemon id is the number at the end of pokemon.pokemon_species.url (https://pokeapi.co/api/v2/pokemon-species/906/) 
        const promises = pokedex.map(async (pokemon: any) => {
            const response = await fetch(`${api}${pokemon.pokemon_species.url.split('/')[6]}`);
            const data = await response.json();
            pokemon.id = data.id;
            pokemon.sprite = data.sprites.front_default;
            return pokemon;
        });

        const results = await Promise.all(promises);
        return results;
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
        addSpriteAndIdsToPokedex(pokedex).then((res) => {
            console.log(res)
            setPokedex(res);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="ProfileWrapper">
            <div className='ProfileBackground' />
            <div className="ProfileContentWrapper">
                <div className="ProfileLeftSide">
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
                </div>
                <div className="ProfileMiddle">
                    <div className="MissingPokemonSelection">
                        <h1>Select Pokémon you're missing</h1>
                        <div className="MissingPokemonSelectionWrapper">
                            {pokedex.map((pokemon: any) => {
                                return (
                                    <div className="PokemonSelectionCard">
                                        <div className="PokemonSelectionCardImage">
                                            <img src={pokemon.sprite} />
                                            <p>{pokemon.pokemon_species.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="ProfileRightSide">
                    <ProfileCardBig user={user} somethingChanged={somethingChanged} />
                </div>
            </div>
        </div>
    )
}

export default Profile