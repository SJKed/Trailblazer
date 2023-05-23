import { DataTypes } from 'sequelize';
import { DiscordUserInterface } from '../interfaces/DiscordUserInterface';
import { DiscordUser } from '../classes/DiscordUser';
import db from '../database/connection';

DiscordUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    discordId: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: true,
    },
    missingPokemon: {
        type: new DataTypes.JSON,
        allowNull: true,
    },
    gameVersion: {
        type: new DataTypes.STRING,
        allowNull: true,
    },
    gameLanguage: {
        type: new DataTypes.STRING,
        allowNull: true,
    },
    online: {
        type: new DataTypes.BOOLEAN,
        allowNull: true,
    },
    tradeRequest: {
        type: new DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db,
    tableName: 'discord_users',
});

export default DiscordUser;
