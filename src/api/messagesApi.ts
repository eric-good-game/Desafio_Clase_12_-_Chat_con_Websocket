import knex, { Knex } from 'knex'

class MessagesApi {
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
                    table.string('email').notNullable()
                    table.string('message').notNullable()
                    table.string('date').notNullable()
                })
                console.log(`Table ${this.tableName} created!`);
            }   
        } catch (err) {
            console.log(err);
        }
    }
    getAll(){
        return this.db(this.tableName).select('*')
    }
    async add(message:{email:string,message:string,date:string}){
        try {
            message.date = new Date().toString()
            const id = await this.db(this.tableName).insert(message)
            return  (await this.db.select('*').from(this.tableName).where('id',id))[0]
        } catch (err) {
            console.log(err);
        }
        return
    }
}

export default MessagesApi