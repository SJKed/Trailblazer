import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import routes from './routes';
import { setup } from './database/setup';
import { seed } from './database/seed';
import { DiscordUser } from './models';
// import discordbot ./discordbot/discordbot
import discordbot from './discordbot/discordbot';
require('./strategies/discordstrategy');

const app = express();
const port = process.env.PORT || 3333;

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 6000 * 60 * 10 * 24 }, resave: false, saveUninitialized: false, name: 'api-auth' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.get('/api', (req, res) => { res.send({ message: 'Welcome to trailblazer-api!' }); });
app.use('/api/auth', routes.auth);
app.use('/api/users', routes.users);


async function main() {
  app.listen(port, () => { console.log(`Listening at http://localhost:${port}/api`); });
  await setup();
  await seed();
  discordbot.login(process.env.DISCORD_BOT_TOKEN);
}

main();