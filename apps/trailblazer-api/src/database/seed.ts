import { DiscordUser } from "../models";
import { DiscordUserInterface } from "../interfaces/DiscordUserInterface";

export async function seed() {
    await DiscordUser.create({
        id: 1,
        discordId: '1234567890',
        username: 'testuser',
        email: 'text@email.com',
        missingPokemon: [
            1, 
            2, 
            3
        ],
        gameVersion: 'Sword',
        gameLanguage: 'English',
    });
}