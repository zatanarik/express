import { Knex } from 'knex';
import { CategoryEntity } from '../entities/category';
import { GoodsEntity } from '../entities/goods';

export async function up(knex: Knex): Promise<void> {
  await knex.raw("CREATE TABLE IF NOT EXISTS `public`.`category` ( `id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`))");
  await knex.raw("CREATE TABLE IF NOT EXISTS `public`.`goods` ( `id` INT NOT NULL, `category_id` INT NULL, `name` VARCHAR(45) NULL, `discription` VARCHAR(45) NULL, PRIMARY KEY (`id`), INDEX `category_id_foreign_id` (`category_id` ASC) VISIBLE, CONSTRAINT `category_id_foreign` FOREIGN KEY (`category_id`)  REFERENCES `public`.`goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)");
}

export async function down(knex: Knex): Promise<void> {
  const userTableExists = await knex.schema.hasTable("user");
  // Обратная совместимость, когда в этой миграции создавалась таблица users
  if (userTableExists) {
    await knex.schema
      .dropTable("user");
  }

  const categoryTableExists = await knex.schema.hasTable("category");
  // Обратная совместимость, когда в этой миграции создавалась таблица users
  if (userTableExists) {
    await knex.schema
      .dropTable("category");
  }
}
