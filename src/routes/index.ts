import {Router} from 'express'
// import fs from 'fs/promises'
import fs from 'fs'
import productRouter from './products';
import ProductApi from '../api/productApi';
import {Product} from '../../types'

const productApi = new ProductApi('products');
const router = Router();


router.use('/products', productRouter)
router.get('/partials/:name', async(req,res)=>{
  try {
    const template = await fs.promises.readFile('public/partials/listProducts.hbs','utf-8');

    const products = (await productApi.all())?.map((product:Product) => {
      return{
        ...product,
        price: product.price.toFixed(2)
      }
    }).reverse()

    const data = {
      table_headers: ['Imagen','Nombre','Precio'],
      products,
      keys: ['thumbnail','name','price']
    }
    
    res.json({template,data})
  } catch (err) {
    console.log(err);
    
  }
})

router.get('/', async (req,res)=>{
  const inputs = [
    {
      label:'Nombre',
      id:'name',
      name:'name',
      placeholder:'Globo terráqueo',
      required:true,
      type:'text'
    },
    {
      label:'Precio',
      id:'price',
      name:'price',
      placeholder:'345.67',
      required:true,
      type:'number',
      step:'0.01'
    },
    {
      label:'Imagen',
      id:'thumbnail',
      name:'thumbnail',
      placeholder:'cdn3.iconfinder.com/icon.png',
      required:true,
      type:'text'
    },
  ]
  const table_headers = ['Imagen','Nombre','Precio'];

  const products = (await productApi.all())?.reverse();
  
  res.render('index',{
    inputs,
    table_headers,
    products
  })
})

export default router;