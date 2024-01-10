import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Cart from './carts';

@Entity({ name: 'products' })

class Product {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number

    @Column({ type: 'varchar' })
    productName!: string

    @Column({ type: 'int' })
    price!: number

    @Column({ type: 'varchar' })
    description!: string

    @Column({ type: 'varchar' })
    image!: string

}

export default Product