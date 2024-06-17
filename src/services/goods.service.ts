import knex from 'knex';
import configuration from '../config/configuration';
import { GoodsEntity } from '../database/entities/goods';

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

class GoodsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async creategGood(input: any) {
    const id = await knexreq<GoodsEntity>('goods').insert({
      category_id: input.category_id,
      name: input.name,
      description: input.description,
    });
    return knexreq<GoodsEntity>('goods').select('*').from('goods').where('id', id[0]);
  }

  async findGoodById(id: number) {
    return knexreq<GoodsEntity>('goods').select('*').from('goods').where('id', id);
  }

  async deleteGoodById(id: number) {
    return knexreq<GoodsEntity>('goods').delete().where('id', id);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateGoodById(id: number, input: any) {
    await knexreq<GoodsEntity>('goods').where('id', id).update({
      category_id: input.category_id,
      name: input.name,
      description: input.description,
    });
    return knexreq<GoodsEntity>('goods').select('*').from('goods').where('id', id);
  }
}

export default new GoodsService();
