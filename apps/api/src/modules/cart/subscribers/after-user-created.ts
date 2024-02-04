import { DomainEventsManager } from 'src/core/domain/domain-events-manager';
import { CreateCart } from '../use-cases';
import { UserCreated } from 'src/modules/auth/domain/user-created.event';
import { IEventHandler } from 'src/core/domain/event-handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AfterUserCreated implements IEventHandler {
  constructor(private createCart: CreateCart) {
    this.setupSubscription();
  }

  setupSubscription() {
    DomainEventsManager.register(
      this.onUserCreated.bind(this),
      UserCreated.name,
    );
  }

  private onUserCreated(event: UserCreated) {
    console.log(`User created! ${event.entity}`);
  }
}
