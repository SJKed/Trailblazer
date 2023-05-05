import db from './connection';

export const setup = async () => {
    await db.sync({ force: true });
};
