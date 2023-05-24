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
});

client.on(Events.ClientReady, async () => {
    setInterval(async () => {
        const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);
        const users = await DiscordUser.findAll();

        for (const user of users) {
            const member = guild.presences.cache.find((p) => p.userId === user.discordId);
            console.log(member);

            if (member) {
                if (member.status === 'online' && !user.online) {
                    DiscordUser.update({ online: true }, { where: { discordId: user.discordId } });
                } else if (member.status === 'offline' && user.online) {
                    DiscordUser.update({ online: false }, { where: { discordId: user.discordId } });
                }
            } else if (user.online) {
                DiscordUser.update({ online: false }, { where: { discordId: user.discordId } });
            }

            if (member && member.status === 'online' && user.tradeRequest) {
                const tradeRequester = await DiscordUser.findOne({ where: { discordId: user.tradeRequest } });
                if (!tradeRequester) continue;

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

                    DiscordUser.update({ tradeRequest: null }, { where: { discordId: user.discordId } });
                }
            }
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

client.login(process.env.DISCORD_BOT_TOKEN);

export default client;
