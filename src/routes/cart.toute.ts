import express, { Router } from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { AddProductsToCart } from '../controller/cart.controller'

const router: Router = express.Router()

router.post('/add', verifyToken, AddProductsToCart)

export default router