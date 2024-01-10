import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Cart from './carts';

@Entity({ name: 'users' })

class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number

    @Column({ type: 'varchar' })
    firstName!: string

    @Column({ type: 'varchar' })
    lastName!: string

    @Column({ type: 'varchar' })
    email!: string

    @Column({ type: 'varchar', nullable: false })
    password?: string

    @OneToMany(() => Cart, (cart) => cart.user)
    carts!: Cart[]
}

export default User