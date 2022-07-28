import express from 'express'
import router from './routes';

const app = express();
console.log(__dirname);

app.set('view engine','pug')
app.set('views','views')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/', router)

export default app;