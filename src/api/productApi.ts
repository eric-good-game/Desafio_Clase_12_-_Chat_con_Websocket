import knex, { Knex } from 'knex'
import { Product } from '../../types'

class ProductsApi {
    tableName:string
    db:Knex
    constructor(tableName:string,options:Knex.Config){
        this.tableName = tableName
        this.db = knex(options)
    }

    async createTable(){
        try {
            const exists = await this.db.schema.hasTable(this.tableName)
            if(!exists){
                await this.db.schema.createTable(this.tableName,table=>{
                    table.increments('id').primary()
                    table.string('name').notNullable()
                    table.string('thumbnail').notNullable()
                    table.integer('price').notNullable()
                    table.timestamp('timestamp').defaultTo(this.db.fn.now())
                    // table.string('description').notNullable()
                    // table.string('code').notNullable()
                    // table.integer('stock').notNullable()
                })
                console.log(`Table ${this.tableName} created!`);
            }

        } catch (err) {
            console.log(err);
        }
    }
    async add(product:Product){
        try {
            const id = await this.db(this.tableName).insert(product)
            return {...product,id}
        } catch (err) {
            console.log(err);
        }
    }
    async getAll(){
        try {
            return await this.db(this.tableName).select('*')
        } catch (err) {
            console.log(err);
            return []
        }
    }
}

export default ProductsApi