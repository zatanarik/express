import { Knex } from 'knex';
import mongoose from 'mongoose';
import { Category } from '../models/category';
import { Good } from '../models/goods';
import { GoodsEntity } from '../entities/goods';
import { CategoryEntity } from '../entities/category';




// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function seed(knex: Knex): Promise<void> {
    const limit = 10000;
    //await mongoseed(limit);
    //await migrateCycle(knex, limit);
    await migrateBulk(knex, limit);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function migrateCycle(knex: Knex, limit:number): Promise<void> {
    await mongoose
    .connect('mongodb://127.0.0.1:27017/migration')
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in cycle migration");
    });

    const time = performance.now();

    const dataCategories = await Category.find();
    const promises = dataCategories.map(async (category) => {
        const name  = category.name ? category.name : null;
        const result =  await knex('category').insert({ name: name, age: 0 });
        const categoryId = result[0]
        const goods = await Good.find({category_id: category.id});
        if (goods.length !== 0) {
            const goodsPromises = goods.map(async (item) => {
                await knex<GoodsEntity>('goods').insert({
                    category_id: categoryId,
                    name: item.name,
                    description: item.description,
                    price: 0
                });
            })
            await Promise.all(goodsPromises);
        }
    })
    await Promise.all(promises);

    const END = performance.now() - time;
    console.log('Время выполнения = ', END);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function migrateBulk(knex: Knex, limit:number): Promise<void> {
    await mongoose
    .connect('mongodb://127.0.0.1:27017/migration')
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in bulk migration");
    });

    const time = performance.now();

    const chunkSize = 5000;
    const mongoCategories = await Category.find();
    const mongoGoods = await Good.find();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const categories:any[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const goods:any[] = []

    mongoCategories.map(category => {
        const name  = category.name ? category.name : null;
        categories.push({ name: name, age: 0 });
    })
    const resultcat = await knex.batchInsert('category', categories, chunkSize)
    console.log(resultcat);

    const selectedCategories = await knex<CategoryEntity>('category').select('*').from('category');

    const MID = performance.now() - time;
    console.log('Время выполнения insert1 = ', MID);

    mongoCategories.map(category => {
        mongoGoods.map(good => {
            if (category.id === good.category_id){
            const selectedCategory = selectedCategories.find(item => category.name === item.name)
            const name  = good.name ? good.name : null;
            const description  = good.description ? good.description : null;
            goods.push({ category_id: selectedCategory.id, name: name, description: description, price: 0});
            }
        })
    })
    const nearEND = performance.now() - time;
    console.log('Время выполнения compare = ', nearEND);

    const resultgood = await knex.batchInsert('goods', goods, 5000)
    console.log(resultgood);
    
    const END = performance.now() - time;
    console.log('Время выполнения full = ', END);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function mongoseed (limit:number) {
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
    for (let mult = 0; mult < limit; mult+=5000) {
        const categories = []
        const goods = []
        for (let i = 0+mult; i < 10+mult; i++){
            const category =  
                new Category({
                name: `Origin${i}`,
            })
            const good = new Good({
                category_id: category.id,
                name: `good${i}`,
                description: "desc",
            })
            const good2 = new Good({
                category_id: category.id,
                name: `good${i}`,
                description: "desc",
            })
            const good3 = new Good({
                category_id: category.id,
                name: `good${i}`,
                description: "desc",
            })
            const good4 = new Good({
                category_id: category.id,
                name: `good${i}`,
                description: "desc",
            })
            const good5 = new Good({
                category_id: category.id,
                name: `good${i}`,
                description: "desc",
            })
            categories.push(category)
            goods.push(good)
            goods.push(good2)
            goods.push(good3)
            goods.push(good4)
            goods.push(good5)
        }
        for (let i = 10+mult; i < 5000+mult; i++){
            const category =  
                new Category({
                name: `Origin${i}`,
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
    }

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

