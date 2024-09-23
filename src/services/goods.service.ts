import knex from 'knex';
import configuration from '../config/configuration';
import { GoodsEntity } from '../database/entities/goods';
import { CreateGoodDTO } from '../types/createGood.dto';

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
  async creategGood(input: CreateGoodDTO): Promise<GoodsEntity> {
    const id = await knexreq<GoodsEntity>('goods').insert({
      category_id: input.category_id,
      name: input.name,
      description: input.description,
    });
    return knexreq<GoodsEntity>('goods').select('*').from('goods').where('id', id[0]).first();
  }

  async findGoodById(id: number): Promise<GoodsEntity> {
    return knexreq<GoodsEntity>('goods').select('*').from('goods').where('id', id).first();
  }

  async deleteGoodById(id: number): Promise<number> {
    return knexreq<GoodsEntity>('goods').delete().where('id', id);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateGoodById(id: number, input: CreateGoodDTO): Promise<GoodsEntity> {
    await knexreq<GoodsEntity>('goods').where('id', id).update({
      category_id: input.category_id,
      name: input.name,
      description: input.description,
    });
    return knexreq<GoodsEntity>('goods').select('*').from('goods').where('id', id).first();
  }
}

export default new GoodsService();
