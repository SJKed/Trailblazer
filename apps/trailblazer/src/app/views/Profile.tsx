import React, { useEffect, useState } from 'react';
import '../stylesheets/Profile.scss'
import '../stylesheets/Shared-view-main.scss'
import { updateMe, getMe } from '../utils/api';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pokedexjson = require('../../assets/pokedex.json');


function Profile(props: any) {
    const [pokedex, setPokedex] = useState<any[]>([]);
    const [missingPokemon, setMissingPokemon] = useState<string[]>([]);
    const [inputPokemon, setInputPokemon] = useState<string>('');
    const [gameVersion, setGameVersion] = useState<string>('');
    const [gameLanguage, setGameLanguage] = useState<string>('');

    const handleSubmit = async () => {
        const data = {
            missingPokemon: missingPokemon,
            gameVersion: gameVersion,
            gameLanguage: gameLanguage
        }
        console.log(data)
        const response = await updateMe(data);
        console.log(response);
    }
    
    const getMeData = async () => {
        const response = await getMe();
        return response;
    }

    const deleteMissingPokemon = (pokemon: string) => {
        const newMissingPokemon = missingPokemon.filter((poke) => {
            return poke !== pokemon;
        })
        setMissingPokemon(newMissingPokemon);
    }

    useEffect(() => {
        getMeData().then((res) => {
            setMissingPokemon(res.missingPokemon);
            setGameVersion(res.gameVersion);
            setGameLanguage(res.gameLanguage);
        }).catch((err) => {
            console.log(err);
        })
        setPokedex(pokedexjson.results);
    }, []);

    return (
        <div className='View-main-component'>
            <h1>Profile</h1>

            {/* make a form utilizing MUI components, where the user can input their Game Version (scarlet or violet), their Game Language (English, french, spanish, italian, japanese, chinese, korean), and an autocomplete field where the user can input the name of a pokemon in the pokedex and add it to their missingPokemon array */}
            <form onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="game-version-label" className="InputLabel">Game Version</InputLabel>
                    <Select
                        className="Select"
                        labelId="game-version-label"
                        id="game-version-select"
                        value={gameVersion}
                        label="Game Version"
                        onChange={(event: SelectChangeEvent) => setGameVersion(event.target.value)}
                    >
                        <MenuItem value={'Scarlet'}>Scarlet</MenuItem>
                        <MenuItem value={'Violet'}>Violet</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="game-language-label" className='InputLabel'  >Game Language</InputLabel>
                    <Select
                        className="Select"
                        labelId="game-language-label"
                        id="game-language-select"
                        value={gameLanguage}
                        label="Game Language"
                        onChange={(event: SelectChangeEvent) => setGameLanguage(event.target.value)}
                    >
                        <MenuItem value={'ENG'}>English</MenuItem>
                        <MenuItem value={'FRE'}>French</MenuItem>
                        <MenuItem value={'SPA'}>Spanish</MenuItem>
                        <MenuItem value={'ITA'}>Italian</MenuItem>
                        <MenuItem value={'JP'}>Japanese</MenuItem>
                        <MenuItem value={'CH'}>Chinese</MenuItem>
                        <MenuItem value={'KR'}>Korean</MenuItem>
                    </Select>
                </FormControl>
                {/* add an Autocomplete input where the user can write the name of a pokemon in the pokedex and then press a + button to add it to their missingPokemon array. Then list out their missingPokemon array */}
                <div className="pokemonInput">
                    <div className="pokemonInputTop">

                        <Autocomplete
                            id="pokemon-autocomplete"
                            options={pokedex.map((pokemon) => pokemon.name)}
                            renderInput={(params) => (
                                <TextField {...params} label="Pokemon" margin="normal" variant="outlined" sx={{ width: 268, m: 1 }} className="textField" />
                            )}
                            onChange={(event: any, value: string | null) => setInputPokemon(value as string)}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (inputPokemon !== '') {
                                    setMissingPokemon([...missingPokemon, inputPokemon]);
                                    setInputPokemon('');
                                }
                            }}
                        >+</button>
                    </div>
                    <ul>
                        {missingPokemon.map((pokemon) => {
                            return <li key={pokemon}>{pokemon} <button onClick={() => deleteMissingPokemon(pokemon)}>-</button></li>
                        })}
                    </ul>
                </div>
                <Button variant="contained" type="submit" className="submitButton">Submit</Button>
            </form>
        </div >
    )
}

export default Profile