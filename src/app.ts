import express from "express";
import * as dotenv from 'dotenv'
dotenv.config();
import configuration from './config/configuration';
import { up } from "./database/migrations/20220701130156_inital_migration";
import errorMiddleware from "./middleware/errorMiddleware";

import routerApp from "./routes";
import knex from "knex";

const start = async() => {
    try {
        const knexreq = await knex({
            client: 'mysql2',
            useNullAsDefault: true,
            connection: configuration().MYSQL_PATH,
            migrations: {
                directory: './src/database/migrations',
            },
        })
        up(knexreq);
        console.log("DB started");
    } catch(err){
        console.log("err, DB crashed");
    }

    const PORT = configuration().APP_PORT;
    const app = express();

    app.use(express.json()) 
    //app.use(errorMiddleware);
    app.use("/", routerApp);

    app.listen(PORT, () => { 
    console.log("Server running at PORT: ", PORT); 
    }).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
    });
}

start();