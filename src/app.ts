import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import configuration from './config/configuration';
import errorMiddleware from './middleware/errorMiddleware';

import routerApp from './routes';
import knex from 'knex';
import { up } from './database/migrations/mirations_for_docker';

const start = async () => {
  try {
    const knexreq = await knex({
      client: 'mysql2',
      useNullAsDefault: true,
      connection: configuration().MYSQL_PATH,
      migrations: {
        directory: './src/database/migrations',
      },
    });
    up(knexreq);
    //knexreq.migrate.latest()
    console.log('DB started');

    const PORT = configuration().APP_PORT;
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use('/', routerApp);
    app.use(errorMiddleware);

    app
      .listen(PORT, () => {
        console.log('Server running at PORT: ', PORT);
      })
      .on('error', (error) => {
        // gracefully handle error
        throw new Error(error.message);
      });
  } catch (err) {
    console.log('err, DB crashed');
  }
};

start();
