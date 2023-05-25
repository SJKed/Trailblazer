import { Client, GatewayIntentBits, Events, SlashCommandBuilder, TextChannel } from 'discord.js';
import { DiscordUser } from '../classes/DiscordUser';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    console.log('interaction');

    if (interaction.commandName === 'ping') {
        await interaction.reply(`Pong! ${interaction.user.username}`);
    } else if (interaction.commandName === 'server') {
        await handleServerCommand(interaction);
    }
});

client.on(Events.ClientReady, async () => {
    setInterval(async () => {
        const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);
        const users = await DiscordUser.findAll();

        for (const user of users) {
            const member = guild.presences.cache.find((p) => p.userId === user.discordId);

            handleUserPresence(user, member, guild);
            handleTradeRequest(user, member, guild);
        }
    }, 10000);

    const commands = await client.application?.commands.set([
        new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
        new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    ]);

    if (commands) {
        console.log('Successfully set application commands');
    }
});

async function handleServerCommand(interaction) {
    const guild = interaction.guild;
    if (!guild) return;

    const memberCount = guild.memberCount;
    const members = guild.members.cache.map((m) => m.user.username).join(', ');

    await interaction.reply(`Server name: ${guild.name}\nTotal members: ${memberCount}\nAll members: ${members}`);

    const users = await DiscordUser.findAll();
    for (const user of users) {
        const member = await guild.members.fetch(user.discordId);
        if (!member) continue;

        user.update({ online: member.presence.status === 'online' });
    }
}

async function handleUserPresence(user, member, guild) {
    if (member) {
        const onlineStatus = member.status === 'online';
        if (onlineStatus !== user.online) {
            await DiscordUser.update({ online: onlineStatus }, { where: { discordId: user.discordId } });
        }
    } else if (user.online) {
        await DiscordUser.update({ online: false }, { where: { discordId: user.discordId } });
    }
}

async function handleTradeRequest(user, member, guild) {
    if (member && member.status === 'online' && user.tradeRequest) {
        const tradeRequester = await DiscordUser.findOne({ where: { discordId: user.tradeRequest } });
        if (!tradeRequester) return;

        const tradeRequesterMember = guild.presences.cache.find((p) => p.userId === tradeRequester.discordId);
        if (tradeRequesterMember && tradeRequesterMember.status === 'online') {
            const requester = await guild.members.fetch(tradeRequester.discordId);
            const target = await guild.members.fetch(user.discordId);
            const tradeChannel = client.channels.cache.get('1110593552683106315') as TextChannel;

            tradeChannel.send(`Hey ${target}, ${requester} is online and would like to trade with you!`);

            const thread = await tradeChannel.threads.create({
                name: `${requester.user.username} and ${target.user.username}`,
                reason: 'Trade Request',
                invitable: false,
                autoArchiveDuration: 60,
            });

            await thread.members.add(requester.user.id);
            await thread.members.add(target.user.id);

            await DiscordUser.update({ tradeRequest: null }, { where: { discordId: user.discordId } });
        }
    }
}

client.login(process.env.DISCORD_BOT_TOKEN);

export default client;
