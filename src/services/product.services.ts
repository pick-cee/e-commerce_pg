import Product from "../models/products";
import cloudinaryUpload from "../helpers/cloudinary";
import { Like, getRepository } from "typeorm";


export default class ProductService {

    async createProduct(
        productName: string,
        price: number,
        description: string,
        image: any
    ): Promise<any> {
        let prodRepo = getRepository(Product)
        if (!productName && !price && !description && !image) {
            throw new Error('Please fill all fields')
        }

        const data = await prodRepo.create({
            productName: productName,
            price: price,
            description: description,
            image: image
        })

        if (image) {
            await cloudinaryUpload(image.path)
                .then((downloadURL: any) => [
                    data.image = downloadURL
                ])
                .catch((err: any) => {
                    throw new Error(`CLOUDINARY ERROR: ${err.message}`)
                })
        }

        return await prodRepo.save(data)
    }

    async getProductsBySearch(productName: string) {
        let prodRepo = getRepository(Product)
        const product = await prodRepo.find({
            where: {
                productName: Like(`%${productName}%`)
            }
        })
        if (product.length === 0) {
            throw new Error('Product not found')
        }
        return product
    }

    async getProductsById(prouctId: any) {
        let prodRepo = getRepository(Product)
        const product = await prodRepo.findOneBy({ id: prouctId })
        if (!product) {
            throw new Error('Product not found')
        }
        return product
    }

    async updateProduct(
        productId: number,
        data: any,
        image: any
    ) {
        let prodRepo = getRepository(Product)
        const prod = await prodRepo.findOneBy({ id: productId }) as any
        if (!prod) {
            throw new Error('Product not found')
        }
        if (image) {
            await cloudinaryUpload(image.path)
                .then((downloadURL: any) => [
                    prod.image = downloadURL
                ])
                .catch((err: any) => {
                    throw new Error(`CLOUDINARY ERROR: ${err.message}`)
                })
        }
        for (const field in data) {
            prod[field] = data[field]
        }
        return await prodRepo.update({ id: productId }, prod)
    }

    async deleteProduct(productId: number) {
        let prodRepo = getRepository(Product)
        const prod = await prodRepo.findOneBy({ id: productId })
        if (!prod) {
            throw new Error('Product not found!')
        }

        return await prodRepo.delete(prod)
    }
}