import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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