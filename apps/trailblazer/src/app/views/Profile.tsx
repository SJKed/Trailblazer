import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../utils/api';
import '../stylesheets/Profile.scss';
import { Link } from 'react-router-dom';
import ProfileCardBig from './components/ProfileCardBig';
import PokedexJSON from '../../assets/Pokedex.json';
import { DiscordUserInterface, MissingPokemonInterface, PokedexInterface, PokemonInterface } from '../Interfaces/Interfaces';

function Profile() {
    const [user, setUser] = useState({} as DiscordUserInterface);
    const [pokedex, setPokedex] = useState(PokedexJSON.pokemon_entries);
    const [searchQuery, setSearchQuery] = useState('');

    function moveBackgroundImage(e: MouseEvent) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const backgroundImage = document.querySelector('.ProfileBackground') as HTMLElement;
        if (!backgroundImage) return console.log('No background image');
        backgroundImage.style.backgroundPosition = `calc(20% + ${x * -50}px) calc(70% + ${y * -50}px)`;
    }

    const somethingChanged = (newUser: DiscordUserInterface) => {
        if (newUser !== user) {
            setUser(newUser);
        }
    };

    async function addSpriteAndIdsToPokedex(pokedex: any) {
        const api = 'https://pokeapi.co/api/v2/pokemon/';
        const promises = pokedex.map(async (pokemon: any) => {
            const response = await fetch(`${api}${pokemon.pokemon_species.url.split('/')[6]}`);
            const data = await response.json();

            const newPokemon = {
                name: data.name,
                id: data.id,
                sprite: data.sprites.front_default
            };
            return newPokemon;
        });

        const results = await Promise.all(promises);
        return results;

    }

    async function checkAuth() {
        const response = await getUserDetails();
        if (response) {
            return response;
        }
    }

    const handleAddMissingPokemon = (pokemon: MissingPokemonInterface) => {
        console.log(pokemon)
        console.log(user.missingPokemon)
        if (user.missingPokemon?.find((p: { name: string; id: number; sprite: string }) => p.name === pokemon.name)) {
            return;
        }
        const newMissingPokemon = [...user.missingPokemon, pokemon];
        setUser({ ...user, missingPokemon: newMissingPokemon });
    };

    useEffect(() => {
        document.addEventListener('mousemove', moveBackgroundImage);
        checkAuth()
            .then((res) => {
                setUser(res.user);
            })
            .catch((err) => {
                window.location.href = `${process.env.NX_FRONTEND_URL}`;
            });
        addSpriteAndIdsToPokedex(pokedex)
            .then((res) => {
                setPokedex(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filteredPokedex = pokedex.filter((pokemon: any) => {
        if (searchQuery === '') return true;
        return pokemon.name.toLowerCase().includes(searchQuery?.toLowerCase())
    });

    return (
        <div className="ProfileWrapper">
            <div className="ProfileBackground" />
            <div className="ProfileContentWrapper">
                <div className="ProfileLeftSide">
                    <div className="HotLinks">
                        <Link to="/frontpage">
                            <h2 className="ProfileLink">HOME</h2>
                        </Link>
                        <Link to="/trades">
                            <h2 className="ProfileLink">TRADES</h2>
                        </Link>
                    </div>
                </div>
                <div className="ProfileMiddle">
                    <div className="MissingPokemonSelection">
                        <h1>Select missing Pokémon</h1>
                        <div className="SearchBar">
                            <input
                                type="text"
                                placeholder="Search Pokémon"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="MissingPokemonSelectionWrapper">
                            {filteredPokedex.map((pokemon: any) => (
                                <div
                                    className="PokemonSelectionCard"
                                    onClick={() => {
                                        handleAddMissingPokemon(pokemon);
                                    }}
                                >
                                    <div className="PokemonSelectionCardImage">
                                        <img src={pokemon.sprite} alt={pokemon.name} />
                                        <p>{pokemon.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ProfileRightSide">
                    <ProfileCardBig user={user} somethingChanged={somethingChanged} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
