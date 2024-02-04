# Domain Events

> Decouple actions from its side-effects

## Components

- `Actor` publishes events, `AggregateRoot`
- `Command` what they can do (e.g. `CreateUser`)
- `Event` - what happened, past tense of `Command` (e.g. `UserCreated`)
- `Responses` - classes interested in this `Event` (e.g. `AfterUserCreated`)

## Idea

`AggregateRoot` creates `Event`, when it's saved, it'll dispatch all events to their listeners

## Implementation

Heavily based on `Khalil` implementation (take a look at references):

```ts
export interface IDomainEvent {
  createdAt: Date;
  getAggregateId(): string;
}

export abstract class AggregateRoot<T> extends Entity<T> {
  private _events: IDomainEvent[] = [];

  get events(): IDomainEvent[] {
    return this._events;
  }

  protected addEvent(event: IDomainEvent): void {
    this._events.push(event);

    DomainEvents.setDirty(this);
  }
}

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
    aggregate.events.forEach((event: IDomainEvent) =>
      this.dispatchEvent(event)
    );
  }

  private static dispatchEvent(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }

  private static findDirtyAggregateById(id: string): AggregateRoot<any> {
    let found: AggregateRoot<any> = null;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static resetDirtyAggregates(): void {
    this.dirtyAggregates = [];
  }
}
```

## References

- [Khalil - Where do Domain Events get created?](https://khalilstemmler.com/blogs/domain-driven-design/where-do-domain-events-get-dispatched/)
- [Khalil - Chain business logic Domain Events](https://khalilstemmler.com/articles/typescript-domain-driven-design/chain-business-logic-domain-events/)
