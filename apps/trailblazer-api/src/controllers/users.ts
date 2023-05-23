import { DiscordUser } from "../classes/DiscordUser";


export default {
    async getAllUsers(req, res) {
        const users = await DiscordUser.findAll({
            attributes: {
                include: ['username', 'missingPokemon', 'gameVersion', 'gameLanguage', 'discordId'],
                exclude: ['id', 'email', 'createdAt', 'updatedAt']
            }
        });
        res.json(users);
    },

    async getUserWithPokemonYouNeed(req, res) {
        res.send('ok');
    },

    async getAllOnlineUsers(req, res) {
        const users = await DiscordUser.findAll({
            where: {
                online: true
            },
            attributes: {
                include: ['username', 'missingPokemon', 'gameVersion', 'gameLanguage'],
                exclude: ['discordId', 'id', 'email', 'createdAt', 'updatedAt']
            }
        });
        res.json(users);
    },

    async updateMe(req, res) {
        const user = await DiscordUser.findOne({ where: { email: req.user.email } });
        if (!user) { res.status(404).send('User not found'); }
        const { missingPokemon, gameVersion, gameLanguage } = req.body;
        user.update({
            missingPokemon,
            gameVersion,
            gameLanguage
        });
        res.json(user);
    },

    async getMe(req, res) {
        const user = await DiscordUser.findOne({ where: { email: req.user.email } });
        if (!user) { res.status(404).send('User not found'); }
        res.json(user);
    },

    async sendTradeRequest(req, res) {
        const requestTarget = await DiscordUser.findOne({ where: { discordId: req.body.discordId } });
        if (!requestTarget) { res.status(404).send('User not found'); }
        requestTarget.update({ tradeRequest: req.user.discordId });
        res.send('ok');
    },

}

