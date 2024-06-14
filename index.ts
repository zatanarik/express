import express from "express";
import * as dotenv from 'dotenv'
dotenv.config();
import configuration from './src/config/configuration';

import routerApp from "./src/routes";

const PORT = configuration().APP_PORT;

const app = express();

app.use(express.json()) 
app.use("/", routerApp);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});