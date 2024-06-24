import { Knex } from 'knex';
import mongoose from 'mongoose';
import { Category } from '../models/category';
import { Good } from '../models/goods';
import { GoodsEntity } from '../entities/goods';




// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function seed(knex: Knex): Promise<void> {
    await mongoseed();
    await migrateCycle(knex);
    await migrateBulk(knex);
}
async function migrateCycle(knex: Knex): Promise<void> {
    await mongoose
    .connect('mongodb://127.0.0.1:27017/migration')
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in cycle migration");
    });

    const dataCategories = await Category.find();

    const time = performance.now();

    const promises = dataCategories.map(async (item) => {
        const name  = item.name ? item.name : null;
        const result =  await knex('category').insert({ name: name, age: 0 });
        const categoryId = result[0]
        const good = await Good.findOne({category_id: item._id});
        if (good) {
            await knex<GoodsEntity>('goods').insert({
                category_id: categoryId,
                name: good.name,
                description: good.description,
                price: 0
            });
        }
    })
    await Promise.all(promises);

    const END = performance.now() - time;
    console.log('Время выполнения = ', END);
}

async function migrateBulk(knex: Knex): Promise<void> {
    await mongoose
    .connect('mongodb://127.0.0.1:27017/migration')
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in bulk migration");
    });

    const dataCategories = await Category.find();

    const time = performance.now();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cats:any[] = []
    //const gs = []

    dataCategories.map(async (item) => {
        const name  = item.name ? item.name : null;
        cats.push({ name: name, age: 0 });
        //const categoryId = result[0]
        // const good = await Good.findOne({category_id: item._id});
        // if (good) {
        //     await knex<GoodsEntity>('goods').insert({
        //         category_id: categoryId,
        //         name: good.name,
        //         description: good.description,
        //         price: 0
        //     });
        // }
    })
    const chunkSize = 1000;
    const result = await knex.batchInsert('category', cats, chunkSize)
    console.log(result);
    
    const END = performance.now() - time;
    console.log('Время выполнения = ', END);
}

async function mongoseed () {
    await mongoose
    .connect('mongodb://127.0.0.1:27017/migration')
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in seeds");
    });

    const time = performance.now();

    const categories = []
    const goods = []
    for (let i = 0; i < 10; i++){
        const category =  
            new Category({
            name: `Origin${i}`,
        })
        const good = new Good({
            category_id: category.id,
            name: `good${i}`,
            description: "desc",
        })
        categories.push(category)
        goods.push(good)
    }
    for (let i = 10; i < 5000; i++){
        const category =  
            new Category({
            //name: `Origin${i}`,
        })
        categories.push(category)
    }
    const promisecategories = categories.map(async (item) => {
        await item.save();
    })
    const promisegoods = goods.map(async (item) => {
        await item.save();
    })

    await Promise.all(promisecategories);
    await Promise.all(promisegoods);

    const END = performance.now() - time;
    console.log('Время выполнения = ', END);


    // for (let i = 0; i < 10; i++){
    //     const category =  
    //         new Category({
    //         name: `Origin${i}`,
    //         age: 12
    //     })
    //     const goods = new Good({
    //         category_id: category.id,
    //         name: `good${i}`,
    //         description: "desc",
    //     })
    //     await category.save();
    //     await goods.save();
    // }
    // for (let i = 10; i < 5000; i++){
    //     const category =  
    //         new Category({
    //         name: `Origin${i}`,
    //         age: 12
    //     })
    //     await category.save();
    // }
}

