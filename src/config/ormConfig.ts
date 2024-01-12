import { ConnectionOptions } from "typeorm";
import 'dotenv/config'
import User from "../models/users";
import Product from "../models/products";
import Cart from "../models/carts";

const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.PG_URL,
    entities: [
        User,
        Product,
        Cart
    ],
    synchronize: true,



}
export default config