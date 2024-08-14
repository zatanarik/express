import knex from 'knex';
import configuration from '../config/configuration';
import { CategoryEntity } from '../database/entities/category';
import ApiError from '../error/apiError';

const knexreq = knex({
  client: 'mysql2',
  useNullAsDefault: true,
  connection: configuration().MYSQL_PATH,
  migrations: {
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
});

class CategoryService {
  async createCategory(name: string): Promise<CategoryEntity> {
    const id = await knexreq<CategoryEntity>('category').insert({ name: name }).returning('*');
    const res = await knexreq<CategoryEntity>('category').select('*').from('category').where('id', id[0]);
    return res[0]
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    const res = await knexreq<CategoryEntity>('category')
      .select('id', 'name')
      .from('category')
      .where('id', id);

    if (res.length === 0) {
      throw ApiError.BadRequest('Не найдена категория');
    }

    return res[0];
  }

  async deleteCategoryById(id: number) {
    await knexreq<CategoryEntity>('category').delete().where('id', id);
  }

  // TODO
  async findGoodsByCategoryId(id: number): Promise<CategoryEntity[]> {
    const goods: CategoryEntity[] = await knexreq<CategoryEntity>('category')
      .select('*')
      .from('category')
      .where('category.id', id)
      .join('goods', 'category.id', '=', 'goods.category_id');

    if (goods.length === 0) {
      throw ApiError.BadRequest('Не найденs товары у данной категории');
    }
    return goods;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateCategoryById(id: number, input: any): Promise<CategoryEntity> {
    const name = input.name;
    await knexreq<CategoryEntity>('category').update('name', name).where('id', id);
    const res = await knexreq<CategoryEntity>('category').select('*').from('category').where('id', id);
    return res[0]
  }
}

export default new CategoryService();
