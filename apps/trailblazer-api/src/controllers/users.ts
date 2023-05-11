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
    },

    async updateMe(req, res) {
        console.log(req);
        const user = await DiscordUser.findOne({ where: { email: req.user.email } });
        if (!user) { res.status(404).send('User not found'); }
        const { missingPokemon, gameVersion, gameLanguage } = req.body;
        user.update({ missingPokemon, gameVersion, gameLanguage });
        res.json(user);
    },

    async getMe(req, res) {
        console.log(req);
        const user = await DiscordUser.findOne({ where: { email: req.user.email } });
        if (!user) { res.status(404).send('User not found'); }
        res.json(user);
    }
}

