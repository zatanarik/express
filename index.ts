import express, { Request, Response } from "express";
import * as dotenv from 'dotenv'
dotenv.config();
import configuration from './src/config/configuration';
import knex from "knex";
import { CategoryEntity } from "./src/database/entities/category";
import { config } from './knexfile'
import { GoodsEntity } from "./src/database/entities/goods";
const PORT = configuration().APP_PORT;
const knexreq = knex({
  client: 'mysql2',
  useNullAsDefault: true,
  connection: configuration().MYSQL_PATH,
  migrations: {
      directory: './src/database/migrations',
  },
  seeds:{
      directory: './src/database/seeds',
  }
})

const app = express();
app.use(express.json()) 


//category
app.post("/category", async (request: Request, response: Response) => { 
  const name = request.body.name;
  const id = await knexreq<CategoryEntity>("category").insert({name: name}).returning("*")
  const result = await knexreq<CategoryEntity>("category").select('*').from('category').where("id", id[0]);
  return response.status(201).json(result);
});
app.get("/category/:id", async (request: Request, response: Response) => { 
  const result = await knexreq<CategoryEntity>("category").select('id','name').from('category').where("id", request.params.id);
  return response.status(200).json(result);
}); 
//______________________________________

app.delete("/category/:id", async (request: Request, response: Response) => { 
  await knexreq<CategoryEntity>("category").delete().where("id", request.params.id);
  return response.sendStatus(204);
});
app.get("/category/goods/:id", async (request: Request, response: Response) => { 
  const result = await knexreq<CategoryEntity>("category").select('id','name').from('category').where("id", request.params.id);
  return response.status(200).send(result);
});  
app.put("/category/:id", async (request: Request, response: Response) => {
  const name = request.body.name; 
  const id = request.params.id; 
  await knexreq<CategoryEntity>("category").update('name',name).where("id", id);
  const result = await knexreq<CategoryEntity>("category").select('*').from('category').where("id", id);
  //todo return object
  return response.status(200).send(result);
});


//goods
app.post("/goods", async (request: Request, response: Response) => { 
  const category_id = request.body.category_id;
  const name = request.body.name;
  const desc = request.body.desc;
  const id = await knexreq<GoodsEntity>("goods").insert({category_id:category_id, name: name, description: desc})
  const result = await knexreq<CategoryEntity>("category").select('id','name').from('category').where("id", id);
  return response.status(201).json(result);
}); 
app.get("/goods/:id", async (request: Request, response: Response) => { 
  const result = await knexreq<GoodsEntity>("goods").select('id','name').from('category').where("id", request.params.id);
  return response.send(result);
}); 
app.delete("/goods/:id", async (request: Request, response: Response) => { 
  const result = await knexreq<GoodsEntity>("goods").delete().where("id", request.params.id);
  return response.send(result);
}); 
app.put("/goods/:id", async (request: Request, response: Response) => { 
  const category_id = request.body.category_id;
  const name = request.body.name;
  const desc = request.body.desc;
  await knexreq<GoodsEntity>("goods").where("id", request.params.id).update({
    category_id:category_id,
    name:name,
    description:desc
  });
  const result = await knexreq<CategoryEntity>("category").select('id','name').from('category').where("id", request.params.id);
  return response.status(200).json(result);
}); 


app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});