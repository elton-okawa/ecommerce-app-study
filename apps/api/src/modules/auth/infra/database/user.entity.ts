import { DomainEventsManager } from 'src/core/domain/domain-events-manager';
import { Password } from '../../domain/password.vo';
import { Entity, Column, PrimaryColumn, AfterInsert } from 'typeorm';

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

  @AfterInsert()
  dispatchEvents() {
    DomainEventsManager.dispatchEventsForAggregate(this.id);
  }
}
