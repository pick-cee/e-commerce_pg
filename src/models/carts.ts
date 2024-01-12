import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './users';
import Product from './products';


@Entity({ name: 'carts' })
class Cart {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number

    @ManyToOne(() => User, (user) => user.carts)
    @JoinColumn({ name: 'user_id' })
    user!: User

    @ManyToOne(() => Product, (product) => product)
    @JoinTable({ name: 'products_cart' })
    products!: [
        {
            productId: number
        },
        {
            productName: string
        },
        {
            image: string
        },
        { price: number }

    ]

}

export default Cart