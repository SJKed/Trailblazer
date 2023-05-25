export interface DiscordUserInterface {
    id: number;
    discordId: string;
    username: string;
    email: string;
    missingPokemon: MissingPokemonInterface[];
    gameVersion: string;
    gameLanguage: string;
}

export interface MissingPokemonInterface {
    id: number;
    name: string;
    sprite: string;
}

export interface PokedexInterface {
    entry_number: number;
    pokemon_species: {
        name: string;
        url: string;
    };
}

export interface PokemonInterface {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
}