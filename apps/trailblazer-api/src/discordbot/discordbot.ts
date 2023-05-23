import { Client, Events, Collection, GatewayIntentBits, SlashCommandBuilder, IntentsBitField, TextChannel } from 'discord.js'
import { DiscordUser } from '../classes/DiscordUser';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    console.log('interaction')

    if (interaction.commandName === 'ping') {
        await interaction.reply(`Pong! ${interaction.user.username}`);
    }
    if (interaction.commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount} \nAll members: ${interaction.guild?.members.cache.map(m => m.user.username).join(', ')} `);
        const users = await DiscordUser.findAll();
        users.forEach(async user => {
            const member = await interaction.guild?.members.fetch(user.discordId);
            if (member?.presence.status === 'online') {
                user.update({ online: true });
            } else {
                user.update({ online: false });
            }
        });
    }
});

client.on(Events.ClientReady, async () => {
    setInterval(async () => {
        const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);
        const users = await DiscordUser.findAll();
        users.forEach(async (user) => {
            const member = guild.presences.cache.find(p => p.userId === user.discordId)
            if (member && (member.status === 'online') && user.online !== true) { DiscordUser.update({ online: true }, { where: { discordId: user.discordId } }); }
            if (!member && user.online === true) { DiscordUser.update({ online: false }, { where: { discordId: user.discordId } }); }
            if (member && (member.status === 'offline') && user.online === true) { DiscordUser.update({ online: false }, { where: { discordId: user.discordId } }); }

            if (member && (member.status === 'online') && user.tradeRequest) {
                const tradeRequester = await DiscordUser.findOne({ where: { discordId: user.tradeRequest } });
                if (!tradeRequester) { return }
                const tradeRequesterMember = guild.presences.cache.find(p => p.userId === tradeRequester.discordId);
                if (tradeRequesterMember && (tradeRequesterMember.status === 'online')) {
                    const requester = await guild.members.fetch(tradeRequester.discordId);
                    const target = await guild.members.fetch(user.discordId);
                    const tradeChannel = await client.channels.cache.get('1110593552683106315') as TextChannel;
                    tradeChannel.send(`Hey ${target}, ${requester} is online and would like to trade with you!`);


                    DiscordUser.update({ tradeRequest: null }, { where: { discordId: user.discordId } });
                }
            }
        });
    }, 10000);

    const commands = await client.application?.commands.set([
        new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
        new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    ]);
    if (commands) {
        console.log('Successfully set application commands');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);

export default client;