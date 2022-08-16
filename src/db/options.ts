const options = {
    sqlite3:{
        client:'sqlite3',
        connection:{
            filename:'./src/db/ecommerce.db3'
        },
        useNullAsDefault:true
    },
    msql2:{
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    }
}

export default options