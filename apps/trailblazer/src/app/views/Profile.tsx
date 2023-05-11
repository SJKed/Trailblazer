import React, { useEffect, useState } from 'react';
import { DiscordUserInterface } from '../Interfaces/DiscordUserInterface';
import '../stylesheets/Profile.scss'

function Profile(props: any) {
    const user = props.user as DiscordUserInterface;

    const POKEAPIURL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

    return (
        <div>
            <h1>Profile</h1>
            <form action="">
                <label htmlFor="gameVersion">Game Version</label>
                <select name="gameVersion" id="gameVersion">
                    <option value="Scarlet">Scarlet</option>
                    <option value="Violet">Violet</option>
                </select>
                <label htmlFor="gameLanguage">Game Language</label>
                <select name="gameLanguage" id="gameLanguage">
                    <option value="ENG">ENG</option>
                    <option value="GER">GER</option>
                    <option value="SPA">SPA</option>
                    <option value="FRE">FRE</option>
                    <option value="ITA">ITA</option>
                    <option value="JP">JP</option>
                    <option value="KR">KR</option>
                    <option value="CH">CH</option>
                </select>
                <label htmlFor="missingPokemon">Missing Pokemon</label>
                <input type="text" name="missingPokemon" id="missingPokemon" />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default Profile