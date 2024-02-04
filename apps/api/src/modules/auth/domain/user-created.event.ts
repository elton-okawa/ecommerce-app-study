import { IDomainEvent } from 'src/core/domain/domain-event';
import { User } from './user.entity';

export class UserCreated extends IDomainEvent<User> {}
