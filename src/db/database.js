import SQ from 'sequelize';
import { config } from '../config.js';

const { host, user, database, password, uri } = config.db;
const connect = uri ? [uri] : [database, user, password];
export const sequelize = new SQ.Sequelize(...connect, {
  dialect: 'postgres',
  logging: uri ? false : true,
  dialectOptions: uri
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});
