import express, { Router } from 'express'
import formidable from 'express-formidable'
import { verifyToken } from '../middleware/verifyToken'
import { createProduct, deleteProduct, getProductsById, getProductsBySearch, updateProduct } from '../controller/product.controller'

const router: Router = express.Router()

router.post('/create', verifyToken, formidable(), createProduct)
router.get('/id', verifyToken, getProductsById)
router.get('/search', getProductsBySearch)
router.put('/update', verifyToken, formidable(), updateProduct)
router.delete('/delete', verifyToken, deleteProduct)

export default router