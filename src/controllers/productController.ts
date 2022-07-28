import { Request, Response } from 'express'
import { getIO } from '../../server';
import ProductApi from '../api/productApi'

const productApi = new ProductApi('products');

async function create(req:Request,res:Response){
  try {
    const id = await productApi.create(req.body);
    getIO().sockets.emit('product:new',{
      ...req.body,
      id
    })
    res.json({
      ...req.body,
      id
    })
  } catch (err) {
    console.log(err);
  }

}

export default {
  create
}