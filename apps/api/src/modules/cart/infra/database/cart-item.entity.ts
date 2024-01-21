import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../domain';

@Entity('cart_item')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => CartItemEntity, (item) => item.cart)
  cart: Cart;

  @Column()
  amount: number;

  @Column()
  productId: string;
}
