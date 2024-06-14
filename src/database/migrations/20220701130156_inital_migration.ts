import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const MYSQL_DB = process.env.MYSQL_DB
  await knex.raw("CREATE TABLE IF NOT EXISTS `" + MYSQL_DB +"`.`category` ( `id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`))");
  await knex.raw("CREATE TABLE IF NOT EXISTS `" + MYSQL_DB +"`.`goods` ( `id` INT NOT NULL AUTO_INCREMENT, `category_id` INT NOT NULL, `name` VARCHAR(45) NOT NULL, `description` VARCHAR(45) NULL, PRIMARY KEY (`id`), INDEX `category_id_foreign_id` (`category_id` ASC) VISIBLE, CONSTRAINT `category_id_foreign` FOREIGN KEY (`category_id`)  REFERENCES `" + MYSQL_DB +"`.`category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)");
}

export async function down(knex: Knex): Promise<void> {
  const goodsTableExists = await knex.schema.hasTable("goods");
  // Обратная совместимость, когда в этой миграции создавалась таблица goods
  if (goodsTableExists) {
    await knex.schema
      .dropTable("goods");
  }

  const categoryTableExists = await knex.schema.hasTable("category");
  // Обратная совместимость, когда в этой миграции создавалась таблица category
  if (categoryTableExists) {
    await knex.schema
      .dropTable("category");
  }
}
