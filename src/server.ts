import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from './config/ormConfig'
import userRoute from './routes/user.route'
import productRoute from './routes/product.route'
import cartRoute from './routes/cart.toute'

dotenv.config()

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

try {
    createConnection(config).then(() => {
        console.log('Connected!')
    })
} catch (error) {
    console.log('Error while connecting to the database', error);
}

app.get('/', (request, response) => {
    response.json({ message: 'Welcome to the E-commerce API' })
})

app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})