import React, { useState, useEffect, useReducer } from 'react';
import './stylesheets/ProfileCardBig.scss'
import pen from '../../../assets/icons/pen.png'
import MiraidonIcon from '../../../assets/images/Violet-icon.png'
import KoraidonIcon from '../../../assets/images/Scarlet-icon.png'
import TrailblazerIcon from '../../../assets/icons/Trailblazer.png'
import { updateMe } from '../../utils/api';
import PokedexJSON from '../../../assets/Pokedex.json'
import axios from 'axios';
import { handleLanguageAbbreviation } from '../../utils/helpers';

// somethingChanged is a function that is passed down from the parent component
function ProfileCardBig(props: any) {
    const [user, setUser] = useState(props.user)
    const [versionPrevious, setVersionPrevious] = useState('')
    const [pokedex, setPokedex] = useState(PokedexJSON.pokemon_entries)
    const [selectedPokedexResults, setSelectedPokedexResults] = useState('')

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    useEffect(() => {
        if (user.gameVersion) {
            setVersionPrevious(user.gameVersion)
        }
    }, [user.gameVersion])

    useEffect(() => {
        updateMe(user).then((res) => {
            console.log(res)
            props.somethingChanged(user)
        }).catch((err) => {
            console.log(err)
        })
    }, [user])


    const handleAddMissingPokemon = (e: any) => {
        if (selectedPokedexResults != '') {
            const pokemon = selectedPokedexResults.split(' ')[0].toLowerCase();
            if (user.missingPokemon?.find((p: { name: string, id: number, sprite: string }) => p.name == pokemon)) { setSelectedPokedexResults(''); console.log('Already added'); return }
            const api = 'https://pokeapi.co/api/v2/pokemon/'
            axios.get(`${api}${pokemon}`).then((res) => {
                const name = res.data.name;
                const id = res.data.id;
                const sprite = res.data.sprites.front_default;

                const newPokemon = {
                    name: name,
                    id: id,
                    sprite: sprite
                }

                if (!user.missingPokemon) { user.missingPokemon = [newPokemon] }
                else { user.missingPokemon.unshift(newPokemon) }

                setUser({ ...user, missingPokemon: user.missingPokemon })
                setSelectedPokedexResults('')
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const handleRemoveMissingPokemon = (e: any) => {
        console.log(e.id)
        const pokemon = e.id;
        const newMissingPokemon = user.missingPokemon.filter((p: { name: string, id: number, sprite: string }) => p.id != pokemon)
        setUser({ ...user, missingPokemon: newMissingPokemon })
    }

    const handleSetLanguage = (language: string) => {
        const AbbreviatedLanguage = handleLanguageAbbreviation(language)
        setUser({ ...user, gameLanguage: AbbreviatedLanguage })
    }


    return (
        <div className="ProfileCardWrapper">
            <div className="ProfileCardAvatar">
                <img src={user.gameVersion == 'Scarlet' ? KoraidonIcon : user.gameVersion == null ? TrailblazerIcon : MiraidonIcon} alt="Avatar" />
            </div>
            <div className="ProfileCard">
                <div className="ProfileCardInfo">
                    <div className="ProfileCardName">
                        <h1>{user.username}</h1>
                    </div>
                    <div className="GameVersion">
                        <h2>Game Version:</h2>
                        <div className="Actions">
                            {user.gameVersion ? <h3>{user.gameVersion}</h3> :
                                <select name="version" id="version"
                                    onChange={(e) => {
                                        setUser({ ...user, gameVersion: e.target.value })
                                    }}
                                    defaultValue={'Select Version'}
                                >
                                    <option value="Select Version" disabled>Select Version</option>
                                    <option value="Scarlet">Scarlet</option>
                                    <option value="Violet">Violet</option>
                                </select>
                            }
                            {user.gameVersion ? <img src={pen} onClick={() => { setVersionPrevious(user.gameVersion); setUser({ ...user, gameVersion: null }) }} /> : null}
                        </div>
                    </div>
                    <div className="GameLanguage">
                        <h2>Game Language:</h2>
                        <div className="Actions">
                            {user.gameLanguage ? <h3>{user.gameLanguage}</h3> :
                                <select name="language" id="language"
                                    onChange={(e) => {
                                        if (e.target.value == 'Select Language') { return }
                                        handleSetLanguage(e.target.value)
                                    }}
                                    defaultValue="Select Language"
                                >
                                    <option value="Select Language" disabled>Select Language</option>
                                    <option value="English">English</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Korean">Korean</option>
                                    <option value="Chinese">Chinese</option>
                                </select>
                            }
                            {user.gameLanguage ? <img src={pen} onClick={() => { setUser({ ...user, gameLanguage: null }) }} /> : null}
                        </div>
                    </div>
                    <div className="MissingPokemon">
                        <h2>Missing Pokemon: {user.missingPokemon?.length ? user.missingPokemon.lenght : ''}</h2>
                        <div className="addPokemon">
                            <input type="text" placeholder="Add Pokemon" list="pokedex" onChange={(e) => { setSelectedPokedexResults(e.target.value) }} value={selectedPokedexResults} />
                            <datalist id="pokedex">
                                {pokedex.map((pokemon: any) => {
                                    return <option value={pokemon.pokemon_species.name} />
                                })}
                            </datalist>
                            <button onClick={() => {
                                handleAddMissingPokemon(selectedPokedexResults)
                            }}>Add</button>
                        </div>
                        <div className="MissingPokemonList">
                            {user.missingPokemon?.reverse().map((pokemon: any) => {
                                return (
                                    <div className="MissingPokemonListItem">
                                        <img src={pokemon.sprite} />
                                        <h3>{pokemon.name}</h3>
                                        <button onClick={() => {
                                            handleRemoveMissingPokemon(pokemon)
                                        }}>Remove</button>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileCardBig