import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @OneToMany(() => CartEntity, (cart) => cart.items)
  items: CartItemEntity[];
}
