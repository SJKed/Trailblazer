import { DiscordUser } from "../models";
import { DiscordUserInterface } from "../interfaces/DiscordUserInterface";

export async function seed() {
    await DiscordUser.create({
        id: 1,
        discordId: '123456789',
        username: 'Test User#6372',
        email: 'email@email.com',
        missingPokemon: [{ id: 915, name: "lechonk", sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/915.png" }],
        gameVersion: 'Scarlet',
        gameLanguage: 'JPN',
        online: false,
    });

    await DiscordUser.create({
        id: 2,
        discordId: '987654321',
        username: 'Test User2#6372',
        missingPokemon: [{ name: 'oinkologne', id: 916, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/916.png' }, { name: 'quaxwell', id: 913, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/913.png' }],
        gameVersion: 'Scarlet',
        gameLanguage: 'SPA',
        online: true,
    });

    await DiscordUser.create({
        id: 3,
        discordId: '532532432',
        username: 'Test User3#6372',
        missingPokemon: [{ name: 'crocalor', id: 910, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/910.png' }, { name: 'skeledirge', id: 911, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/911.png' }],
        gameVersion: 'Violet',
        gameLanguage: 'ENG',
        online: true,
    });
}