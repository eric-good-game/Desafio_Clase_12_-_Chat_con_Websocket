import app from './src/app'
import {Server as HttpServer} from 'http'
import {Server as IOServer} from 'socket.io'
import ProductApi from './src/api/productApi'
import MessagesApi from './src/api/messagesApi'

const productApi = new ProductApi('products')
const messagesApi = new MessagesApi('messages')


const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
export const getIO = () => io

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT,()=>{
  console.log(`Server is running on port: ${PORT}`);
})

server.on('error', error => console.log(error))

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')
  
  socket.on('message:load', async (data)=>{
    console.log('message:load');
    
    const {email} = data

    if(email){
      socket.emit('message:load',await messagesApi.all())
    }
  })

  socket.on('product:new', async(data) => {
    data.price = parseFloat(data.price)
    try {
      const id = await productApi.create(data)
      io.sockets.emit('product:new', {...data,id})
    } catch (err) {
      console.log(err); 
    }
  })
  
  socket.on('message:new', async(data:{email:string,content:string}) => {
    
    const {email, content} = data;
    const newMessage = {
      email,
      date: new Date(),
      content,
      id:null
    }
    try {
      const id = await messagesApi.add(newMessage)
      io.sockets.emit('message:new', {...newMessage,id})
    } catch (err) {
      console.log(err);
    }

  })
})