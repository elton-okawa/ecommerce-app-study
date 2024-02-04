import { AggregateRoot } from './aggregate-root';
import { IDomainEvent } from './domain-event';

export class DomainEventsManager {
  private static handlersMap = {};
  private static dirtyAggregates: AggregateRoot<any>[] = [];

  public static setAggregateAsDirty(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findDirtyAggregateById(aggregate.id);

    if (!aggregateFound) {
      this.dirtyAggregates.push(aggregate);
    }
  }

  private static unsetAggregateDirty(aggregate: AggregateRoot<any>): void {
    const index = this.dirtyAggregates.findIndex((a) => a.equals(aggregate));

    this.dirtyAggregates.splice(index, 1);
  }

  public static dispatchEventsForAggregate(id: string): void {
    const aggregate = this.findDirtyAggregateById(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.unsetAggregateDirty(aggregate);
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.events.forEach((event: IDomainEvent<any>) =>
      this.dispatchEvent(event),
    );
  }

  private static dispatchEvent(event: IDomainEvent<any>): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }

  private static findDirtyAggregateById(id: string): AggregateRoot<any> {
    let found: AggregateRoot<any> = null;
    for (const aggregate of this.dirtyAggregates) {
      if (aggregate.id === id) {
        found = aggregate;
      }
    }

    return found;
  }

  public static register(
    callback: (event: IDomainEvent<any>) => void,
    eventClassName: string,
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearDirtyAggregates(): void {
    this.dirtyAggregates = [];
  }
}
