import { Model } from 'sequelize';

export class DiscordUser extends Model {
    public id!: number;
    public discordId!: string;
    public username!: string;
    public email!: string;
    public missingPokemon!: string[];
    public gameVersion!: string;
    public gameLanguage!: string;
    public online!: boolean;
    public tradeRequest!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}