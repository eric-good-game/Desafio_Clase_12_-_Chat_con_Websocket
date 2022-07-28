import {Router} from 'express'
import productController from '../controllers/productController';
import formatData from '../middleware/formatData';

const router = Router();

router.post('/create', formatData ,productController.create)

export default router