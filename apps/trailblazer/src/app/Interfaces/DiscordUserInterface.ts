export interface DiscordUserInterface {
    id: number;
    discordId: string;
    username: string;
    email: string;
    missingPokemon: number[];
    gameVersion: string;
    gameLanguage: string;
}