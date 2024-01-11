import { Request, Response, NextFunction } from "express";
import Product from "../models/products";
import { getRepository } from "typeorm";
import ProductService from "../services/product.services";

const prodService = new ProductService()

export const createProduct = async (request: Request, response: Response) => {

    let data;
    if (request.fields) {
        data = JSON.parse(request.fields.data as unknown as string)
    }

    const { productName, price, description } = data
    const image = request.files?.file

    try {
        await prodService.createProduct(productName, price, description, image)
        return response.status(201).json({
            message: 'Product created...',
            data,
            image
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }
}

export const getProductsById = async (request: Request, response: Response) => {
    try {
        const productId = request.query.productId
        const prod = await prodService.getProductsById(productId)
        return response.status(200).json({
            message: 'Retrieved.....',
            product: prod
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }
}

export const getProductsBySearch = async (request: Request, response: Response) => {
    try {
        const search = request.body.search
        const prod = await prodService.getProductsBySearch(search)
        return response.status(200).json({
            message: 'Retrieved successfully...',
            product: prod
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }
}

export const updateProduct = async (request: Request, response: Response) => {
    try {
        const productId = request.query.productId as any

        let data
        if (request.fields && request.fields.data) {
            data = JSON.parse(request.fields.data as unknown as string);
        }

        const image = request.files?.image
        await prodService.updateProduct(productId, data, image)
        return response.status(200).json({
            message: 'Update successful'
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }
}

export const deleteProduct = async (request: Request, response: Response) => {
    const productId = request.query.productId as any
    await prodService.deleteProduct(productId).then(() => {
        return response.status(200).json({
            message: 'Deleted successfully...'
        })
    })
        .catch((err: any) => {
            return response.status(500).json({
                message: 'server error',
                error: err.message
            })
        })
}