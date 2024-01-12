import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import User from "../models/users";
import Product from "../models/products";
import Cart from "../models/carts";


export const AddProductsToCart = async (request: Request, response: Response) => {
    try {
        const userRepo = getRepository(User)
        const prodRepo = getRepository(Product)
        const cartRepo = getRepository(Cart)
        const userId = request.user.id

        const productId = request.query.productId as any
        const user = await userRepo.findOne({ where: { id: userId } })
        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            })
        }
        const product = await prodRepo.findOne({ where: { id: productId } })
        if (!product) {
            return response.status(404).json({
                message: 'Product not found'
            })
        }
        let cart = await cartRepo.findOne({ where: { user: user } })
        if (!cart) {
            cart = cartRepo.create({
                user: user, products: [{
                    productId: product.id,
                    image: product.image,
                    price: product.price,
                    productName: product.productName,
                }]
            });
            await cartRepo.save(cart)
        }

        cart.products?.push({ price: product.price, productId: product.id, productName: product.productName, image: product.image })
        await cartRepo.save(cart)


        return response.status(200).json({
            message: "Products added successfully",
            cart: cart
        })

    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }
}