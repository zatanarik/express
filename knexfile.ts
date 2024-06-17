import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();
import configuration from './src/config/configuration';

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: configuration().MYSQL_PATH,
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
};

module.exports = config;
