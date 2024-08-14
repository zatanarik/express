import bcrypt from 'bcrypt';
import knex from 'knex';
import { UserEntity } from '../database/entities/users';
import configuration from '../config/configuration';
import ApiError from '../error/apiError';
import tokenService from './token.service';

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

class userService {
  async createUser(email: string, password: string): Promise<UserEntity> {
    const hashPassword = await bcrypt.hash(password, 4);
    const id = await knexreq<UserEntity>('users')
      .insert({ email: email, password: hashPassword })
      .returning('*');
    const user = await knexreq<UserEntity>('users')
      .select('id', 'email')
      .from('users')
      .where('id', id[0])
      .first();
    return user;
  }

  async login(email: string, password: string) {
    const userReq = await knexreq('users')
      .select('id', 'email', 'password')
      .from('users')
      .where('email', email);
    const user = userReq[0];

    if (!user) {
      throw ApiError.BadRequest('Нет такого пользователя');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный email или пароль');
    }

    delete user.password;
    const token = await tokenService.generateToken(user);
    return { ...token, user };
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await knexreq<UserEntity>('users')
      .select('id', 'email')
      .from('users')
      .where('email', email)
      .first();
    return user;
  }
}
export default new userService();
