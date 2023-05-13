export interface DiscordUserInterface {
    id: number;
    discordId: string;
    username: string;
    email: string;
    missingPokemon: string[];
    gameVersion: string;
    gameLanguage: string;
}