import knex from "knex";
import configuration from '../config/configuration';
import { CategoryEntity } from '../database/entities/category';

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

class CategoryService{  
   async createCategory(name: string) { 
    const id = await knexreq<CategoryEntity>("category").insert({name: name}).returning("*")
    return knexreq<CategoryEntity>("category").select('*').from('category').where("id", id[0]);
  };

  async findCategoryById(id: number) { 
    return knexreq<CategoryEntity>("category").select('id','name').from('category').where("id", id);
  };
  

  async deleteCategoryById(id: number) { 
    await knexreq<CategoryEntity>("category").delete().where("id", id);
  };
  
  // TODO
  async findGoodsByCategoryId(id: number) { 
    return knexreq<CategoryEntity>("category").select('*').from('category').where("category.id", id).join("goods", "category.id", "=", "goods.category_id");
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateCategoryById(id: number, input: any) { 
    const name = input.name; 
    await knexreq<CategoryEntity>("category").update('name',name).where("id", id);
    return knexreq<CategoryEntity>("category").select('*').from('category').where("id", id);
  };
}

export default new CategoryService()