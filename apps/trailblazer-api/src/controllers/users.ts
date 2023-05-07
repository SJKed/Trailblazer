import { DiscordUser } from "../classes/DiscordUser";


export default {
    async getAllUsers(req, res) {
        console.log('called')
        const users = await DiscordUser.findAll({
            attributes: {
                include: ['username', 'missingPokemon', 'gameVersion', 'gameLanguage'],
                exclude: ['discordId', 'id', 'email', 'createdAt', 'updatedAt']
            }
        });
        res.json(users);
    },

    async getUserWithPokemonYouNeed(req, res) {
        console.log(req);
        res.send('ok');
    }
}
