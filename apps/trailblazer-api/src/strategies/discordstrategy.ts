import passport from 'passport';
import discordStrategy from 'passport-discord';
import DiscordUser from '../models/DiscordUser';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    const user = await DiscordUser.findOne({ where: { id: id } });
    if (user) { done(null, user); }
    else { done(null, null); }
});

passport.use(new discordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ where: { discordId: profile.id } });
        if (user) { done(null, user); }
        else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                email: profile.email,
            });
            done(null, newUser);
        }
    } catch (err) {
        done(err, null as any);
    }
}));

export default passport;