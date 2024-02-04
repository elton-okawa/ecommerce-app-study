import { Password } from '../../domain/password.vo';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({
    type: String,
    transformer: {
      from: (password) => Password.from(password),
      to: (password) => password.toString(),
    },
  })
  password: Password;
}
