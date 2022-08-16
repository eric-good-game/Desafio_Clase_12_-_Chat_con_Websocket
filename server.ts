import app from './src/app'
import {Server as HttpServer} from 'http'
import {Server as IOServer} from 'socket.io'
import ProductApi from './src/api/productApi'
import MessagesApi from './src/api/messagesApi'
import options from './src/db/options'

const productApi = new ProductApi('products',options.msql2)
const messagesApi = new MessagesApi('messages',options.sqlite3)
productApi.createTable()
messagesApi.createTable()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
export const getIO = () => io

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT,()=>{
  console.log(`Server is running on port: ${PORT}`);
})

server.on('error', error => console.log(error))

io.on('connection', socket => {

    console.log('Client connected')
    
    socket.on('message:all', async (data) => {
        if(!data.email) return 
        const messages = await messagesApi.getAll()
        if(!messages.length) {
            console.log('No messages');
            return
        }
        console.log(messages);
        
        socket.emit('message:all', messages)
    })
    socket.on('message:new', async (message) => {
        const newMessage = await messagesApi.add(message)
        io.sockets.emit('message:new', newMessage)
    })
    socket.on('product:all', async () => { 
        const products = await productApi.getAll()
        if(!products.length) {
            console.log('No products');
            return
        }
        socket.emit('product:all', products)
    })

    socket.on('product:new', async (product) => {
        const newProduct = await productApi.add(product)
        io.sockets.emit('product:new', JSON.stringify(newProduct))
    })
})