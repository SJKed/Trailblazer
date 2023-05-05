import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './apps/trailblazer-api/src/database/database.sqlite',
    logging: true,
});

export default sequelize;