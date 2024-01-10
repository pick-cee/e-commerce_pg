import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/users";
import { hash, verify } from 'argon2';
import { jwtSign } from "../helpers/auth";


export const registerUser = async (request: Request, response: Response) => {
    const userRepo = getRepository(User)
    try {
        const userData = request.body
        const userExists = await userRepo.findOne({ where: { email: userData.email } })
        if (userExists) {
            return response.status(403).json({
                message: 'User already exists'
            })
        }

        const hashPassword = await hash(userData.password)
        const newUser = userRepo.create({ ...userData, password: hashPassword })
        await userRepo.save(newUser)
        return response.status(201).json({
            message: 'User created successfully',
            newUser
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }
}


export const login = async (request: Request, response: Response) => {
    try {
        const userRepo = getRepository(User)
        const { email, password } = request.body

        const user = await userRepo.findOne({ where: { email: email } })
        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            })
        }
        const pwMatches = await verify(user.password!, password)
        if (!pwMatches) {
            return response.status(401).json({
                message: 'Incorrect password'
            })
        }

        const token = await jwtSign({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })
        return response.status(200).json({
            message: "Log in success",
            token
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }

}

export const getProfile = async (request: Request, response: Response) => {
    const userRepo = getRepository(User)
    const userId = request.user.userId

    const user = await userRepo.find({ where: { id: userId } })

    if (!user) {
        return response.status(404).json({
            message: 'User not found'
        })
    }

    return response.status(200).json({
        message: 'User profile.....',
        user
    })
}

export const updateProfile = async (request: Request, response: Response) => {
    try {
        const userRepo = getRepository(User)
        const userId = request.user.userId

        const user = await userRepo.findOne({ where: { id: userId } })

        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            })
        }

        user.email = request.body.email
        user.firstName = request.body.firstName
        user.lastName = request.body.lastName

        delete user.password
        await userRepo.save(user)

        return response.status(200).json({
            message: 'Updates successful',
            user
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }

}

export const deleteProfile = async (request: Request, response: Response) => {
    try {
        const userRepo = getRepository(User)
        const userId = request.user.userId

        const user = await userRepo.findOne({ where: { id: userId } })

        if (!user) {
            return response.status(404).json({
                message: 'User not found'
            })
        }

        await userRepo.remove(user)
        return response.status(200).json({
            message: 'User deleted.....'
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: 'server error',
            error: err.message
        })
    }
}