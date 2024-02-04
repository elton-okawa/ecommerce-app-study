import { IDomainEvent } from './domain-event';
import { DomainEventsManager } from './domain-events-manager';
import { Entity } from './entity';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _events: IDomainEvent<T>[] = [];

  get events(): IDomainEvent<T>[] {
    return this._events;
  }

  protected addEvent(event: IDomainEvent<T>): void {
    this._events.push(event);

    DomainEventsManager.setAggregateAsDirty(this);
  }

  public dispatchEvents(): void {
    DomainEventsManager.dispatchEventsForAggregate(this.id);
  }

  public clearEvents(): void {
    this._events.splice(0, this._events.length);
  }
}
