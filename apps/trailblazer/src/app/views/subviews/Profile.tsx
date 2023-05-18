import React, { useEffect, useState } from 'react';
import '../../stylesheets/Profile.scss'
import '../../stylesheets/Shared-view-main.scss'
import { updateMe, getMe } from '../../utils/api';
import axios from 'axios';

import { TextField, Autocomplete, InputLabel, MenuItem, FormControl, Select, Button, SelectChangeEvent } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pokedexjson = require('../../../assets/Pokedex.json');


function Profile(props: any) {
    const [pokedex, setPokedex] = useState<any[]>([]);
    const [missingPokemon, setMissingPokemon] = useState<string[]>(['Bulbasaur', 'Charmander', 'Squirtle']);
    const [inputPokemon, setInputPokemon] = useState<string>('');
    const [gameVersion, setGameVersion] = useState<string>('');
    const [gameLanguage, setGameLanguage] = useState<string>('');

    const handleSubmit = async () => {
        const data = {
            missingPokemon: missingPokemon,
            gameVersion: gameVersion,
            gameLanguage: gameLanguage
        }
        const response = await updateMe(data);
    }

    const getMeData = async () => {
        const response = await getMe();
        if (response.missingPokemon === null || response.missingPokemon === undefined) {
            response.missingPokemon = [];
        }
        return response;
    }

    const deleteMissingPokemon = (pokemon: string) => {
        const newMissingPokemon = missingPokemon.filter((item) => item !== pokemon);
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
            <div className='Profile'>
                <div className='Profile-info'>
                    <div className='Profile-info-item'>
                        <h3>Username</h3>
                        <p>{props.user.username}</p>
                    </div>
                    <div className='Profile-info-item'>
                        <h3>Discord ID</h3>
                        <p>{props.user.discordid}</p>
                    </div>
                    <div className='Profile-info-item'>
                        <h3>Game Version</h3>
                        <p>{gameVersion}</p>
                    </div>
                    <div className='Profile-info-item'>
                        <h3>Game Language</h3>
                        <p>{gameLanguage}</p>
                    </div>
                </div>
                <div className='Profile-missing-pokemon'>
                    <h3>Missing Pokémon</h3>
                    <div className='Profile-missing-pokemon-list'>
                        {missingPokemon.map((pokemon, index) => {
                            return (
                                <div className='Profile-missing-pokemon-list-item' key={index}>
                                    <p>{pokemon}</p>
                                    <button onClick={() => deleteMissingPokemon(pokemon)}>X</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className='Profile-missing-pokemon-add'>
                        <Autocomplete
                            id="pokemon-autocomplete"
                            options={pokedex.map((pokemon) => pokemon.name)}
                            renderInput={(params: any) => (
                                <TextField {...params} label="Add Pokémon" />
                            )}
                            onChange={(event: any, value: any) => {
                                setInputPokemon(value);
                            }}
                        />
                        <button onClick={() => {
                            if (inputPokemon !== '') {
                                setMissingPokemon([...missingPokemon, inputPokemon]);
                                setInputPokemon('');
                            }
                        }}>Add</button>
                    </div>
                </div>
                <div className='Profile-submit'>
                    <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
                </div>
            </div>
        </div>
    )
}


//             <form onSubmit={(event) => {
//                 event.preventDefault();
//                 handleSubmit();
//             }}>
//                 <FormControl sx={{ m: 1, minWidth: 300 }}>
//                     <InputLabel id="game-version-label" className="InputLabel">Game Version</InputLabel>
//                     <Select
//                         className="Select"
//                         labelId="game-version-label"
//                         id="game-version-select"
//                         value={gameVersion}
//                         label="Game Version"
//                         onChange={(event: SelectChangeEvent) => setGameVersion(event.target.value)}
//                     >
//                         <MenuItem value={'Scarlet'}>Scarlet</MenuItem>
//                         <MenuItem value={'Violet'}>Violet</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <FormControl sx={{ m: 1, minWidth: 300 }}>
//                     <InputLabel id="game-language-label" className='InputLabel'  >Game Language</InputLabel>
//                     <Select
//                         className="Select"
//                         labelId="game-language-label"
//                         id="game-language-select"
//                         value={gameLanguage}
//                         label="Game Language"
//                         onChange={(event: SelectChangeEvent) => setGameLanguage(event.target.value)}
//                     >
//                         <MenuItem value={'ENG'}>English</MenuItem>
//                         <MenuItem value={'FRE'}>French</MenuItem>
//                         <MenuItem value={'SPA'}>Spanish</MenuItem>
//                         <MenuItem value={'ITA'}>Italian</MenuItem>
//                         <MenuItem value={'JP'}>Japanese</MenuItem>
//                         <MenuItem value={'CH'}>Chinese</MenuItem>
//                         <MenuItem value={'KR'}>Korean</MenuItem>
//                     </Select>
//                 </FormControl>
//                 {/* add an Autocomplete input where the user can write the name of a pokemon in the pokedex and then press a + button to add it to their missingPokemon array. Then list out their missingPokemon array */}
//                 <div className="pokemonInput">
//                     <div className="pokemonInputTop">
//                         <Autocomplete
//                             id="pokemon-autocomplete"
//                             options={pokedex.map((pokemon) => pokemon.name)}
//                             renderInput={(params: any) => (
//                                 <TextField {...params} label="Pokemon" margin="normal" variant="outlined" sx={{ width: 268, m: 1 }} className="textField" />
//                             )}
//                             onChange={(event: any, value: string | null) => setInputPokemon(value as string)}
//                         />
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 if (inputPokemon !== '') {
//                                     setMissingPokemon([...missingPokemon, inputPokemon]);
//                                     setInputPokemon('');
//                                 }
//                             }}
//                         >+</button>
//                     </div>
//                     <ul>
//                         {missingPokemon?.map((pokemon) => {
//                             return (
//                                 <li key={pokemon}>
//                                     <div className="pokemonListItem">
//                                         <p>{pokemon}</p>
//                                         <button
//                                             type="button"
//                                             onClick={() => deleteMissingPokemon(pokemon)}
//                                         >X</button>
//                                     </div>
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </div>
//                 <Button variant="contained" type="submit" className="submitButton">Submit</Button>
//             </form>
//         </div >
//     )
// }

export default Profile