import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const MYSQL_DB = process.env.MYSQL_DB;
  await knex.raw(
    'CREATE TABLE IF NOT EXISTS `' +
      MYSQL_DB +
      '`.`users` ( `id` INT NOT NULL AUTO_INCREMENT, `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`))',
  );
}

export async function down(knex: Knex): Promise<void> {
  const usersTableExists = await knex.schema.hasTable('users');
  // Обратная совместимость, когда в этой миграции создавалась таблица users
  if (usersTableExists) {
    await knex.schema.dropTable('users');
  }
}
