import * as jwt from 'jsonwebtoken'
import express, { NextFunction } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/users'

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

// A middleware function to verify and validate the jwt token passed before
// allowing a user perform a request
export async function verifyToken(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    const userRepo = getRepository(User)
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = request.headers.authorization.split(" ")[1]
            jwt.verify(token, `${process.env.JWT_ACCESS_KEY}`, async (error: any, user: any) => {
                if (error) return response.status(403).json({ message: 'Invalid bearer token' })
                const userExists = await userRepo.findOne({ where: { id: user.id } })
                if (userExists) {
                    request.user = user
                    next()
                }
                else {
                    return response.status(401).json({
                        message: 'Please sign up'
                    })
                }
            })
        }
        catch (err: any) {
            return response.status(500).json({
                message: err.message
            })
        }
    }
    else {
        return response.status(401).json({
            message: 'You are not authenticated'
        })
    }
}